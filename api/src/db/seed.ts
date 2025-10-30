import { db } from '@/db'
import { webhooks } from '@/db/schema'
import { faker } from '@faker-js/faker'

// Tipos comuns de eventos do Stripe
const stripeEvents = [
  'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.created',
  'customer.created',
  'customer.updated',
  'customer.deleted',
  'invoice.created',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.finalized',
  'subscription.created',
  'subscription.updated',
  'subscription.deleted',
  'checkout.session.completed',
  'payment_method.attached',
  'payout.paid',
  'payout.failed',
]

// Métodos HTTP mais comuns para webhooks
const methods = ['POST', 'GET', 'PUT']

// Gera um corpo de webhook do Stripe baseado no tipo de evento
function generateStripeWebhookBody(eventType: string) {
  const baseEvent = {
    id: `evt_${faker.string.alphanumeric(24)}`,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    type: eventType,
    livemode: faker.datatype.boolean(),
  }

  // Dados específicos baseados no tipo de evento
  let data = {}

  if (eventType.startsWith('charge.')) {
    data = {
      object: {
        id: `ch_${faker.string.alphanumeric(24)}`,
        object: 'charge',
        amount: faker.number.int({ min: 1000, max: 50000 }),
        currency: 'usd',
        customer: `cus_${faker.string.alphanumeric(14)}`,
        description: faker.commerce.productDescription(),
        status: eventType.includes('succeeded') ? 'succeeded' : 'failed',
        receipt_email: faker.internet.email(),
      },
    }
  } else if (eventType.startsWith('payment_intent.')) {
    data = {
      object: {
        id: `pi_${faker.string.alphanumeric(24)}`,
        object: 'payment_intent',
        amount: faker.number.int({ min: 1000, max: 50000 }),
        currency: 'usd',
        customer: `cus_${faker.string.alphanumeric(14)}`,
        status: eventType.includes('succeeded')
          ? 'succeeded'
          : eventType.includes('failed')
            ? 'requires_payment_method'
            : 'requires_confirmation',
        description: faker.commerce.productDescription(),
      },
    }
  } else if (eventType.startsWith('customer.')) {
    data = {
      object: {
        id: `cus_${faker.string.alphanumeric(14)}`,
        object: 'customer',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        address: {
          city: faker.location.city(),
          country: faker.location.countryCode(),
          line1: faker.location.streetAddress(),
          postal_code: faker.location.zipCode(),
          state: faker.location.state(),
        },
      },
    }
  } else if (eventType.startsWith('invoice.')) {
    data = {
      object: {
        id: `in_${faker.string.alphanumeric(24)}`,
        object: 'invoice',
        amount_due: faker.number.int({ min: 1000, max: 50000 }),
        amount_paid: eventType.includes('paid')
          ? faker.number.int({ min: 1000, max: 50000 })
          : 0,
        currency: 'usd',
        customer: `cus_${faker.string.alphanumeric(14)}`,
        status: eventType.includes('paid')
          ? 'paid'
          : eventType.includes('failed')
            ? 'open'
            : 'draft',
        subscription: `sub_${faker.string.alphanumeric(14)}`,
      },
    }
  } else if (eventType.startsWith('subscription.')) {
    data = {
      object: {
        id: `sub_${faker.string.alphanumeric(14)}`,
        object: 'subscription',
        customer: `cus_${faker.string.alphanumeric(14)}`,
        status: eventType.includes('deleted')
          ? 'canceled'
          : faker.helpers.arrayElement(['active', 'trialing', 'past_due']),
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 2592000,
        plan: {
          id: `plan_${faker.string.alphanumeric(14)}`,
          amount: faker.number.int({ min: 999, max: 9999 }),
          currency: 'usd',
          interval: faker.helpers.arrayElement(['month', 'year']),
        },
      },
    }
  } else if (eventType.startsWith('checkout.session.')) {
    data = {
      object: {
        id: `cs_${faker.string.alphanumeric(24)}`,
        object: 'checkout.session',
        amount_total: faker.number.int({ min: 1000, max: 50000 }),
        currency: 'usd',
        customer: `cus_${faker.string.alphanumeric(14)}`,
        customer_email: faker.internet.email(),
        mode: faker.helpers.arrayElement(['payment', 'subscription']),
        payment_status: 'paid',
        status: 'complete',
      },
    }
  } else if (eventType.startsWith('payment_method.')) {
    data = {
      object: {
        id: `pm_${faker.string.alphanumeric(24)}`,
        object: 'payment_method',
        type: 'card',
        card: {
          brand: faker.helpers.arrayElement(['visa', 'mastercard', 'amex']),
          last4: faker.string.numeric(4),
          exp_month: faker.number.int({ min: 1, max: 12 }),
          exp_year: faker.number.int({ min: 2024, max: 2030 }),
        },
        customer: `cus_${faker.string.alphanumeric(14)}`,
      },
    }
  } else if (eventType.startsWith('payout.')) {
    data = {
      object: {
        id: `po_${faker.string.alphanumeric(24)}`,
        object: 'payout',
        amount: faker.number.int({ min: 10000, max: 100000 }),
        currency: 'usd',
        status: eventType.includes('paid') ? 'paid' : 'failed',
        arrival_date: Math.floor(Date.now() / 1000) + 86400,
        method: 'standard',
      },
    }
  }

  return {
    ...baseEvent,
    data,
  }
}

// Gera headers realistas do Stripe
function generateStripeHeaders(body: string) {
  return {
    'content-type': 'application/json',
    'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=${faker.string.alphanumeric(64)}`,
    'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    accept: '*/*',
    'accept-encoding': 'gzip, deflate',
    connection: 'keep-alive',
    'content-length': body.length.toString(),
    host: 'localhost:3333',
  }
}

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')
  await db.delete(webhooks)
  const webhookData = []

  for (let i = 0; i < 60; i++) {
    const eventType = faker.helpers.arrayElement(stripeEvents)
    const method = faker.helpers.arrayElement(methods)
    const body = generateStripeWebhookBody(eventType)
    const bodyString = JSON.stringify(body, null, 2)
    const headers = generateStripeHeaders(bodyString)

    // Simula alguns webhooks com query params
    const queryParams = faker.datatype.boolean({ probability: 0.3 })
      ? {
          test: faker.datatype.boolean().toString(),
          env: faker.helpers.arrayElement(['production', 'test']),
        }
      : null

    webhookData.push({
      method,
      pathname: '/webhook/stripe',
      ip: faker.internet.ipv4(),
      statusCode: faker.helpers.weightedArrayElement([
        { weight: 90, value: 200 },
        { weight: 5, value: 400 },
        { weight: 3, value: 500 },
        { weight: 2, value: 201 },
      ]),
      contentType: 'application/json',
      contentLength: bodyString.length,
      queryParams,
      headers,
      body: bodyString,
      createdAt: faker.date.recent({ days: 30 }),
    })
  }

  // Ordena por data de criação (mais antigo primeiro)
  webhookData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  await db.insert(webhooks).values(webhookData)

  console.log('✅ Seed concluído! 60 webhooks do Stripe foram criados.')
  console.log('\nDistribuição de eventos:')

  // Conta a distribuição de eventos
  const eventCounts: Record<string, number> = {}
  for (const webhook of webhookData) {
    const body = JSON.parse(webhook.body)
    const eventType = body.type
    eventCounts[eventType] = (eventCounts[eventType] || 0) + 1
  }

  // Mostra a distribuição
  for (const [event, count] of Object.entries(eventCounts).sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`  ${event}: ${count}`)
  }

  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Erro ao executar seed:', error)
  process.exit(1)
})
