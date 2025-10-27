import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/api/webhooks',
    {
      schema: {
        summary: 'List all webhooks',
        tags: ['Webhooks'],
        querystring: z.object({
          limit: z.coerce.number().min(1).max(100).optional().default(20),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              method: z.string(),
            }),
          ), // Define the webhook object schema here
        },
      },
    },
    async (request, reply) => {
      // Your logic to list webhooks goes here
      const { limit } = request.query

      return [
        {
          id: '1',
          method: 'POST',
        },
      ]
    },
  )
}
