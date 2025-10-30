# Webhook Inspector

> A full-stack application for inspecting and debugging webhooks in real-time

A modern, type-safe webhook inspection tool with a beautiful dark UI. Capture, store, and analyze incoming webhook requests with detailed information about headers, body, query parameters, and metadata.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Fastify](https://img.shields.io/badge/Fastify-5.6-000000?logo=fastify)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?logo=postgresql)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)
![pnpm](https://img.shields.io/badge/pnpm-10.15-f69220?logo=pnpm)
![License](https://img.shields.io/badge/license-ISC-green)

## ⚡ Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd webhookinspector
pnpm install

# 2. Start PostgreSQL
cd api
docker compose up -d

# 3. Setup environment and database
cp .env.example .env  # Create .env with DATABASE_URL
pnpm db:generate
pnpm db:migrate

# 4. Start backend (in api/ directory)
pnpm dev

# 5. Start frontend (in new terminal, in web/ directory)
cd ../web
pnpm dev

# 6. Open browser
# Web UI: http://localhost:5173
# API Docs: http://localhost:3333/docs

# 7. Test webhook capture
curl -X POST http://localhost:3333/capture/test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Webhook!"}'
```

## 📑 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#️-project-structure)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Usage Examples](#-usage-examples)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#️-database-schema)
- [Development Scripts](#-development-scripts)
- [UI Components](#-ui-components)
- [Docker](#-docker)
- [Environment Variables](#-environment-variables)
- [Production Deployment](#-production-deployment)
- [Architecture](#️-architecture)
- [Project Structure Details](#-project-structure-details)
- [Code Conventions](#-code-conventions)
- [Key Implementation Details](#-key-implementation-details)
- [CORS Configuration](#-cors-configuration)
- [Security Considerations](#-security-considerations)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq-frequently-asked-questions)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Useful Links](#-useful-links)
- [Project Stats](#-project-stats)
- [Performance Considerations](#-performance-considerations)
- [Acknowledgments](#-acknowledgments)

## 🏗️ Project Structure

This is a monorepo managed with **pnpm workspaces** containing two main packages:

```
webhookinspector/
├── api/          # Backend API (Fastify + PostgreSQL)
└── web/          # Frontend UI (React + TanStack Router + Tailwind CSS)
```

## ✨ Features

- **Real-time Webhook Capture**: Capture incoming webhook requests with full details
- **Wildcard Path Support**: Capture webhooks at any custom path under `/capture/*`
- **Interactive UI**: Modern, responsive interface with resizable panels
- **Request Inspection**: View method, path, headers, body, query parameters, and IP address
- **Syntax Highlighting**: Beautiful code display with Shiki syntax highlighter
- **Cursor-based Pagination**: Efficient pagination using UUIDv7 for large datasets
- **Database Storage**: Persist webhook data using PostgreSQL with Drizzle ORM
- **API Documentation**: Interactive API docs powered by Scalar and Swagger
- **Type Safety**: Full TypeScript support across the stack with Zod validation
- **Dark Theme**: Eye-friendly dark UI with Zinc color palette
- **Copy to Clipboard**: Quick copy of webhook URLs
- **Delete Webhooks**: Remove individual webhook records
- **Modern Stack**: Built with latest technologies and best practices
- **Data Seeding**: Generate realistic test data with Faker.js

## 🛠️ Tech Stack

### Backend (API)
- **Runtime**: Node.js with TypeScript 5.9
- **Framework**: [Fastify](https://fastify.dev/) 5.6 - Fast and low overhead web framework
- **Database**: PostgreSQL 17
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) 0.44 - TypeScript-first ORM
- **Schema Management**: Drizzle Kit 0.31 - Migrations and database tools
- **Validation**: Zod 4.1 - TypeScript-first schema validation
- **Type Provider**: fastify-type-provider-zod 6.1 - Zod integration for Fastify
- **API Docs**: @fastify/swagger 9.5 + Scalar 1.38 - OpenAPI documentation
- **CORS**: @fastify/cors 11.1 - Cross-origin resource sharing
- **UUID Generation**: uuidv7 1.0 - Time-sortable unique identifiers
- **Database Driver**: pg 8.16 - PostgreSQL client for Node.js
- **Code Quality**: Biome 2.3 - Fast formatter and linter
- **Dev Tools**: tsx 4.20 - TypeScript execution with hot reload
- **Test Data**: @faker-js/faker 10.1 - Generate realistic test data

### Frontend (Web)
- **Framework**: React 19.1 - Latest React with concurrent features
- **Build Tool**: Vite 7.1 - Next generation frontend tooling
- **Routing**: TanStack Router 1.133 - Type-safe routing with file-based routing
- **Router Plugin**: @tanstack/router-plugin 1.133 - Auto code-splitting and route generation
- **Router Devtools**: @tanstack/react-router-devtools 1.133 - Visual routing inspector
- **State Management**: TanStack Query 5.90 - Server state management
- **Styling**: Tailwind CSS 4.1 - Utility-first CSS framework with Vite integration
- **UI Components**: Radix UI - Accessible, unstyled component primitives
  - @radix-ui/react-checkbox 1.3 - Accessible checkbox component
- **Icons**: Lucide React 0.548 - Beautiful, consistent icon library
- **Syntax Highlighting**: Shiki 3.14 - High-quality code highlighting
- **Layout**: React Resizable Panels 3.0 - Flexible, resizable layouts
- **Utilities**: 
  - tailwind-merge 3.3 - Merge Tailwind classes intelligently
  - tailwind-variants 3.1 - Component variants with Tailwind
  - date-fns 4.1 - Modern date utility library
- **Validation**: Zod 4.1 - Schema validation and type inference
- **Code Quality**: Biome 2.3 - Fast formatter and linter
- **Language**: TypeScript 5.9

### Development Tools
- **Package Manager**: pnpm 10.15 - Fast, disk space efficient package manager
- **Workspace Management**: pnpm workspaces - Monorepo support
- **TypeScript**: 5.9 across both projects
- **Code Quality**: Biome 2.3 for both formatting and linting

## 📋 Prerequisites

- Node.js (v22 or higher recommended)
- pnpm 10.15.1 or higher
- Docker and Docker Compose (for PostgreSQL)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd webhookinspector
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the database

Start the PostgreSQL database using Docker:

```bash
cd api
docker compose up -d
```

### 4. Configure environment variables

Create a `.env` file in the `api` directory:

```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks
```

**Tip**: You can create a `.env.example` file with these values for reference.

### 5. Run database migrations

```bash
cd api
pnpm db:generate
pnpm db:migrate
```

### 6. Start the development servers

**Backend (API):**
```bash
cd api
pnpm dev
```
The API will be available at `http://localhost:3333`
API documentation at `http://localhost:3333/docs`

**Frontend (Web):**
```bash
cd web
pnpm dev
```
The web app will be available at `http://localhost:5173` (default Vite port)

##  Usage Examples

### Capturing Webhooks

Once the application is running, you can send webhook requests to capture them:

**Using curl:**
```bash
# Simple POST request
curl -X POST http://localhost:3333/capture/my-webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "user.created", "userId": 123}'

# GET request with query parameters
curl -X GET "http://localhost:3333/capture/github/push?branch=main&repo=myapp"

# Custom headers
curl -X POST http://localhost:3333/capture/stripe/payment \
  -H "Content-Type: application/json" \
  -H "X-Stripe-Signature: t=123456,v1=abc123" \
  -d '{"amount": 1000, "currency": "usd"}'
```

**Using JavaScript/TypeScript:**
```javascript
// Send a webhook
const response = await fetch('http://localhost:3333/capture/payment/success', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'my-value'
  },
  body: JSON.stringify({
    orderId: '12345',
    status: 'completed'
  })
});

const { id } = await response.json();
console.log('Webhook captured with ID:', id);
```

### Viewing Captured Webhooks

1. Open the web interface at `http://localhost:5173`
2. Browse the list of captured webhooks in the sidebar
3. Click on any webhook to view full details including:
   - HTTP method and pathname
   - Request headers
   - Request body with syntax highlighting
   - Query parameters
   - Client IP address
   - Timestamps

### Managing Webhooks via API

**List webhooks with pagination:**
```bash
# Get first 20 webhooks
curl http://localhost:3333/api/webhooks

# Get next page using cursor
curl "http://localhost:3333/api/webhooks?cursor=01933e7f-8a2e-7b5c-a8d3-4f9c8e7b6a5d"

# Limit results
curl "http://localhost:3333/api/webhooks?limit=50"
```

**Get specific webhook:**
```bash
curl http://localhost:3333/api/webhooks/01933e7f-8a2e-7b5c-a8d3-4f9c8e7b6a5d
```

**Delete a webhook:**
```bash
curl -X DELETE http://localhost:3333/api/webhooks/01933e7f-8a2e-7b5c-a8d3-4f9c8e7b6a5d
```

## �📚 API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - Check API health status

### Webhooks Management
- `GET /api/webhooks` - List all captured webhooks
  - Query params: 
    - `limit` (optional, default: 20, max: 100) - Number of webhooks to return
    - `cursor` (optional) - UUIDv7 cursor for pagination
  - Response includes `nextCursor` for pagination support
- `GET /api/webhooks/:id` - Get a specific webhook by ID
  - Returns full webhook details including headers, body, query params
- `DELETE /api/webhooks/:id` - Delete a specific webhook by ID
  - Returns 204 on success, 404 if not found

### Webhook Capture (External)
- `ALL /capture/*` - Capture incoming webhook requests
  - Accepts any HTTP method (GET, POST, PUT, PATCH, DELETE, etc.)
  - Captures full request details: method, path, headers, body, IP, query parameters
  - Returns `201` with webhook ID
  - Example: `POST http://localhost:3333/capture/my-custom-path`
  - The path after `/capture` is stored as the webhook pathname

## 🗄️ Database Schema

The `webhooks` table stores the following information:

| Field | Type | Description |
|-------|------|-------------|
| id | text (UUID v7) | Primary key |
| method | text | HTTP method (GET, POST, etc.) |
| pathname | text | Request path |
| ip | text | Client IP address |
| statusCode | integer | Response status code (default: 200) |
| contentType | text | Content-Type header |
| contentLength | integer | Content length in bytes |
| queryParams | jsonb | URL query parameters |
| headers | jsonb | Request headers |
| body | text | Request body |
| createdAt | timestamp | Creation timestamp |

## 🔧 Development Scripts

### Root (Workspace Commands)
```bash
pnpm install          # Install all dependencies for all workspaces
pnpm -r format        # Format all workspaces
pnpm -r lint          # Lint all workspaces
pnpm --filter api dev # Run dev in api workspace
pnpm --filter web dev # Run dev in web workspace
```

### API
```bash
pnpm dev             # Start development server with hot reload
pnpm start           # Start production server
pnpm format          # Format code with Biome
pnpm lint            # Lint code with Biome
pnpm db:generate     # Generate database migrations
pnpm db:migrate      # Run database migrations
pnpm db:studio       # Open Drizzle Studio (database GUI)
pnpm db:seed         # Seed database with sample data (uses Faker.js)
```

### Web
```bash
pnpm dev             # Start Vite development server
pnpm build           # Build for production
pnpm preview         # Preview production build
pnpm format          # Format code with Biome
```

## 🎨 UI Components

The web application includes several custom components:

### Layout Components
- **Sidebar**: Navigation panel with webhook list and URL display
- **WebhooksDetailHeader**: Header for the webhook detail view
- **WebhooksList**: Scrollable list of captured webhooks
- **WebhooksListItem**: Individual webhook item in the list

### Utility Components
- **SectionTitle**: Styled section headers
- **SectionDataTable**: Key-value data table display
- **CodeBlock**: Syntax-highlighted code viewer (powered by Shiki)
- **IconButton**: Reusable icon button component
- **Badge**: Status and category badges
- **Checkbox**: Custom checkbox component (Radix UI)

### UI Features
- **Resizable Panels**: Drag to resize sidebar and main content area
- **Dark Theme**: Professional dark color scheme using Zinc palette
- **Responsive Layout**: Adapts to different screen sizes
- **TanStack Router Devtools**: Integrated routing inspector (development mode)

## 🐳 Docker

The project includes a Docker Compose configuration for running PostgreSQL:

**Location**: `api/docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:17
    container_name: webhook_db
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: webhooks
    ports:
      - "5432:5432"
```

**Commands**:
```bash
# Start PostgreSQL
cd api
docker compose up -d

# Stop PostgreSQL
docker compose down

# Stop and remove volumes (deletes all data)
docker compose down -v

# View logs
docker compose logs postgres

# Follow logs
docker compose logs -f postgres
```

**Database Credentials** (for development):
- Host: `localhost`
- Port: `5432`
- Database: `webhooks`
- User: `docker`
- Password: `docker`
- Connection String: `postgresql://docker:docker@localhost:5432/webhooks`

**Note**: These credentials are for local development only. Always use secure credentials in production.

## 📝 Environment Variables

### API Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Environment mode (development, production, test) | development | No |
| PORT | API server port | 3333 | No |
| DATABASE_URL | PostgreSQL connection URL | - | Yes |

**Example `.env` file:**
```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks
```

### Frontend Configuration

The frontend is configured to connect to the API at `http://localhost:3333` by default. This is hardcoded in the `Sidebar` component.

For production deployments, you'll need to update the API URL in:
- `web/src/components/sidebar.tsx` (webhook capture URL display)
- Any HTTP client configuration files

## 🚢 Production Deployment

### Backend Deployment

1. **Build the TypeScript code:**
```bash
cd api
pnpm build  # You may need to add a build script
```

2. **Set production environment variables:**
```env
NODE_ENV=production
PORT=3333
DATABASE_URL=postgresql://user:password@host:5432/database
```

3. **Run migrations:**
```bash
pnpm db:migrate
```

4. **Start the server:**
```bash
pnpm start
```

### Frontend Deployment

1. **Build for production:**
```bash
cd web
pnpm build
```

2. **Preview the build:**
```bash
pnpm preview
```

3. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, AWS S3, etc.)

### Docker Deployment (Coming Soon)

A complete Docker setup for production deployment could include:
- Dockerfile for API
- Dockerfile for Web (with Nginx)
- docker-compose.yml for orchestration
- Environment variable management

### Frontend Configuration

The frontend is configured to connect to the API at `http://localhost:3333` by default. This is hardcoded in the `Sidebar` component.

For production deployments, you'll need to update the API URL in:
- `web/src/components/sidebar.tsx` (webhook capture URL display)
- Any HTTP client configuration files

## 🚢 Production Deployment

### Backend Deployment

1. **Build the TypeScript code:**
```bash
cd api
pnpm build  # You may need to add a build script
```

2. **Set production environment variables:**
```env
NODE_ENV=production
PORT=3333
DATABASE_URL=postgresql://user:password@host:5432/database
```

3. **Run migrations:**
```bash
pnpm db:migrate
```

4. **Start the server:**
```bash
pnpm start
```

### Frontend Deployment

1. **Build for production:**
```bash
cd web
pnpm build
```

2. **Preview the build:**
```bash
pnpm preview
```

3. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, AWS S3, etc.)

### Docker Deployment (Coming Soon)

A complete Docker setup for production deployment could include:
- Dockerfile for API
- Dockerfile for Web (with Nginx)
- docker-compose.yml for orchestration
- Environment variable management

## 📝 Environment Variables

### API Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | API server port | 3333 |
| DATABASE_URL | PostgreSQL connection URL | Required |

## 🏛️ Architecture

### Backend Architecture
- **Fastify** with TypeScript for type-safe routing and high performance
- **Zod** for runtime validation, type inference, and schema-based routing
- **fastify-type-provider-zod** for seamless Zod integration with Fastify
- **Drizzle ORM** for type-safe database operations with snake_case mapping
- **UUIDv7** for unique, time-sortable identifiers (better than UUIDv4)
- **CORS** enabled for cross-origin requests
- **Swagger/OpenAPI** for API documentation generation
- **Scalar** for beautiful, interactive API reference UI
- **Environment validation** with Zod schemas

### API Features
- **Type-safe routing** with Zod schemas for params, query, and body
- **Automatic OpenAPI generation** from Zod schemas
- **Cursor-based pagination** using UUIDv7 for efficient data fetching
- **Comprehensive error handling** with proper HTTP status codes
- **Wildcard route handling** for flexible webhook capture (`/capture/*`)
- **Request metadata capture**: method, IP, headers, content-type, content-length

### Frontend Architecture
- **TanStack Router** for file-based, type-safe routing with auto-generated route tree
- **TanStack Query** for server state management and data fetching
- **React 19** with StrictMode enabled for concurrent features
- **Tailwind CSS 4** with custom Zinc color theme and dark mode
- **Component-based architecture** with reusable UI components
- **Shiki** for high-quality syntax highlighting with Vesper theme
- **React Resizable Panels** for flexible, draggable layouts
- **Radix UI** primitives for accessible, unstyled components
- **Lucide React** for consistent, customizable icons

### Frontend Features
- **Resizable panel layout** with persistent sidebar and main content
- **Real-time data updates** with TanStack Query
- **Type-safe navigation** with generated route tree
- **Copy to clipboard** functionality for webhook URLs
- **Code syntax highlighting** for JSON, XML, and other formats
- **Responsive design** adapting to different screen sizes
- **Developer tools** with TanStack Router Devtools (commented out by default)

### Database
- **PostgreSQL 17** with JSONB support for flexible data storage
- **Drizzle Kit** for schema migrations and database management
- **Snake case** column naming convention
- **Automated migrations** with version tracking
- **Seeding support** with Faker.js for realistic test data

## 📁 Project Structure Details

### Backend (`api/`)

```
api/

## � Project Structure Details

### Backend (`api/`)

```
api/
├── src/
│   ├── server.ts              # Fastify app setup, plugins, and routes registration
│   ├── env.ts                 # Environment variable validation with Zod
│   ├── db/
│   │   ├── index.ts          # Database connection and Drizzle client
│   │   ├── seed.ts           # Database seeding script with Faker.js
│   │   ├── schema/
│   │   │   ├── index.ts      # Schema exports
│   │   │   └── webhooks.ts   # Webhooks table schema
│   │   └── migrations/       # Drizzle Kit generated migrations
│   └── routes/
│       ├── capture-webhook.ts    # POST/GET/etc /capture/* - Capture webhooks
│       ├── list-webhooks.ts      # GET /api/webhooks - List with pagination
│       ├── get-webhook.ts        # GET /api/webhooks/:id - Get single webhook
│       └── delete-webhook.ts     # DELETE /api/webhooks/:id - Delete webhook
├── drizzle.config.ts         # Drizzle Kit configuration
├── docker-compose.yml        # PostgreSQL container setup
├── biome.json               # Biome formatter/linter config
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

### Frontend (`web/`)

```
web/
├── src/
│   ├── main.tsx                  # App entry point, router setup
│   ├── index.css                 # Global Tailwind styles
│   ├── routeTree.gen.ts          # Auto-generated route tree (by TanStack Router)
│   ├── routes/
│   │   ├── __root.tsx           # Root layout with panels and QueryClient
│   │   ├── index.tsx            # Home route (/)
│   │   └── webhooks.$id.tsx     # Webhook detail route (/webhooks/:id)
│   ├── components/
│   │   ├── sidebar.tsx                # Left sidebar with webhook list
│   │   ├── webhooks-list.tsx          # Webhook list container
│   │   ├── webhooks-list-item.tsx     # Individual webhook item
│   │   ├── webhook-details.tsx        # Webhook detail view
│   │   ├── webhooks-detail-header.tsx # Header for detail view
│   │   ├── section-title.tsx          # Section header component
│   │   ├── section-data-table.tsx     # Key-value table display
│   │   └── ui/
│   │       ├── badge.tsx             # Status badges
│   │       ├── checkbox.tsx          # Custom checkbox (Radix)
│   │       ├── code-block.tsx        # Syntax highlighted code
│   │       └── icon-button.tsx       # Reusable icon button
│   └── http/
│       ├── hooks/                    # Custom React Query hooks (if any)
│       └── schemas/
│           └── webhooks.ts           # Zod schemas for webhook data
├── public/                   # Static assets
├── vite.config.ts           # Vite configuration
├── biome.json              # Biome formatter/linter config
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript config for app
├── tsconfig.node.json      # TypeScript config for Node scripts
├── index.html              # HTML entry point
└── package.json            # Dependencies and scripts
```

## 🎯 Code Conventions

### Backend
- **File naming**: kebab-case (e.g., `capture-webhook.ts`)
- **Database columns**: snake_case (configured in Drizzle)
- **TypeScript**: Strict mode enabled
- **Route structure**: Each route in separate file with typed plugin
- **Validation**: All inputs validated with Zod schemas
- **Error handling**: HTTP status codes with typed responses

### Frontend
- **File naming**: kebab-case for components, $param for dynamic routes
- **Component style**: Functional components with hooks
- **Styling**: Tailwind utility classes with tailwind-merge for conflicts
- **Type safety**: Full TypeScript with generated route types
- **State management**: TanStack Query for server state
- **Code organization**: Components, routes, and utilities separated

## 🔍 Key Implementation Details

### UUIDv7 vs UUIDv4
The project uses **UUIDv7** instead of traditional UUIDv4 for several benefits:
- **Time-sortable**: UUIDs are naturally ordered by creation time
- **Better database performance**: Improved index efficiency
- **Cursor pagination**: Enables efficient cursor-based pagination
- **Compatibility**: Still universally unique like UUIDv4

### Cursor-based Pagination
Instead of offset/limit pagination, the API uses cursor-based pagination:
- **More efficient**: No need to count rows or scan previous pages
- **Consistent results**: No duplicate/missing items when data changes
- **Scalable**: Performance doesn't degrade with large offsets
- **Implementation**: Uses UUIDv7 as cursor with `lt()` operator

### Route Organization
- **Typed routes**: Each route uses `FastifyPluginAsyncZod` for type safety
- **Schema validation**: Zod schemas define params, query, body, and responses
- **OpenAPI generation**: Swagger docs auto-generated from Zod schemas
- **Separation of concerns**: Each endpoint in its own file

### Database Schema Design
- **JSONB columns**: Flexible storage for headers and query params
- **Type casting**: TypeScript types cast on JSONB columns
- **Timestamps**: Automatic `createdAt` with `defaultNow()`
- **Text for IDs**: UUIDs stored as text for better performance

##  CORS Configuration

The API is configured with CORS support to allow cross-origin requests:

```typescript
// api/src/server.ts
app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})
```

**Configuration Details**:
- **origin**: `true` - Allows all origins (suitable for development)
- **methods**: All standard HTTP methods supported
- **credentials**: Currently disabled (commented out)

**Production Recommendation**: 
For production deployments, restrict `origin` to specific domains:

```typescript
app.register(fastifyCors, {
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
})
```

## 🔒 Security Considerations

### Development vs Production

**Current Setup** (Development):
- CORS allows all origins
- Database uses default credentials
- No authentication on API endpoints
- No rate limiting

**Recommendations for Production**:

1. **Environment Variables**
   - Use strong, unique database passwords
   - Never commit `.env` files to version control
   - Use environment variable managers (e.g., AWS Secrets Manager, HashiCorp Vault)

2. **API Security**
   - Implement authentication (JWT, API keys, OAuth)
   - Add rate limiting to prevent abuse
   - Validate and sanitize all inputs
   - Implement request size limits

3. **Database Security**
   - Use SSL/TLS for database connections
   - Restrict database access by IP
   - Regular backups and disaster recovery plan
   - Use read-only replicas for analytics

4. **CORS Configuration**
   - Restrict origins to known domains
   - Enable credentials only when needed
   - Use HTTPS in production

5. **Data Privacy**
   - Implement data retention policies
   - Allow users to delete their webhooks
   - Consider GDPR compliance if applicable
   - Encrypt sensitive data at rest

6. **Monitoring**
   - Set up logging and monitoring
   - Track unusual patterns or attacks
   - Implement alerting for security events

## 📖 API Documentation

Interactive API documentation is available at `/docs` when running the API server. It's powered by Scalar and provides:
- Full endpoint documentation with descriptions
- Request/response schemas generated from Zod
- Interactive API testing with "Try it out" functionality
- OpenAPI 3.0 specification
- Beautiful, modern UI

Access it at: `http://localhost:3333/docs`

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to PostgreSQL
```
Error: getaddrinfo ENOTFOUND localhost
```

**Solution**:
1. Ensure Docker is running: `docker ps`
2. Start the database: `cd api && docker compose up -d`
3. Check database logs: `docker compose logs postgres`
4. Verify DATABASE_URL in `.env` file

### Port Already in Use

**Problem**: Port 3333 or 5173 already in use

**Solution**:
```bash
# Find process using the port
lsof -i :3333
# or
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or change the port in .env (API) or vite.config.ts (Web)
```

### Migration Issues

**Problem**: Migration fails or database out of sync

**Solution**:
```bash
cd api

# Check migration status
pnpm db:studio

# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d

# Run migrations again
pnpm db:generate
pnpm db:migrate
```

### TypeScript Errors

**Problem**: Type errors in frontend after route changes

**Solution**:
```bash
cd web

# Route tree is auto-generated, but you can trigger it manually
# by saving any route file or restarting dev server
pnpm dev
```

### Biome Formatting Issues

**Problem**: Code formatting inconsistencies

**Solution**:
```bash
# Format all code
pnpm format

# Or in specific workspace
cd api
pnpm format

cd web
pnpm format
```

## ❓ FAQ (Frequently Asked Questions)

### General

**Q: What is Webhook Inspector used for?**  
A: Webhook Inspector is a development tool that helps you debug and inspect webhook requests. It's useful when integrating with third-party services that send webhooks (like GitHub, Stripe, Slack, etc.) or when testing your own webhook implementations.

**Q: Can I use this in production?**  
A: The current version is designed for development and testing. For production use, you should add authentication, rate limiting, and proper security measures. See the [Security Considerations](#-security-considerations) section.

**Q: Is this similar to RequestBin or Webhook.site?**  
A: Yes! Webhook Inspector provides similar functionality but with the advantage of being self-hosted, open-source, and fully customizable.

### Technical

**Q: Why UUIDv7 instead of UUIDv4?**  
A: UUIDv7 provides time-based sorting, which is perfect for cursor-based pagination and generally better for database indexing performance.

**Q: Why Fastify instead of Express?**  
A: Fastify is faster, has built-in schema validation, automatic OpenAPI generation, and better TypeScript support out of the box.

**Q: Why TanStack Router instead of React Router?**  
A: TanStack Router provides type-safe routing, automatic code-splitting, file-based routing, and excellent developer experience with devtools.

**Q: Can I use MySQL or MongoDB instead of PostgreSQL?**  
A: While technically possible, you'd need to modify the Drizzle configuration and might lose JSONB support. PostgreSQL is recommended for this use case.

**Q: Why pnpm instead of npm or yarn?**  
A: pnpm is faster, more disk-space efficient, and has excellent monorepo support with workspaces.

### Usage

**Q: How do I capture webhooks from external services?**  
A: You'll need to expose your local server to the internet using tools like:
- [ngrok](https://ngrok.com/): `ngrok http 3333`
- [localtunnel](https://localtunnel.github.io/www/): `lt --port 3333`
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

Then use the public URL as your webhook endpoint.

**Q: How long are webhooks stored?**  
A: Currently, webhooks are stored indefinitely. You can manually delete them or implement retention policies in the future.

**Q: Can I replay captured webhooks?**  
A: Not yet, but this is a planned feature. See [Future Enhancements](#-future-enhancements).

**Q: Is there a limit to webhook size?**  
A: Currently, there's no explicit limit, but very large payloads may cause performance issues. This is something to consider for production use.

**Q: Can I filter or search webhooks?**  
A: Not in the current version, but this is planned for future releases.

### Development

**Q: How do I add a new route to the API?**  
A: Create a new file in `api/src/routes/`, define your route with Zod schemas, and register it in `api/src/server.ts`.

**Q: How do I add a new page to the frontend?**  
A: Create a new file in `web/src/routes/`. TanStack Router will automatically generate the route tree. The filename determines the route path.

**Q: Can I use this as a template for my own project?**  
A: Absolutely! This project demonstrates best practices for building full-stack TypeScript applications. Feel free to use it as a starting point.

**Q: How do I contribute?**  
A: Check the [Contributing](#-contributing) section for detailed guidelines.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/webhookinspector.git
   cd webhookinspector
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Make your changes**
   - Follow existing code conventions
   - Add tests if applicable
   - Update documentation

6. **Format and lint your code**
   ```bash
   pnpm -r format
   pnpm -r lint
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m 'feat: add some amazing feature'
   ```
   
   **Commit Message Convention**:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

8. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

9. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

### Development Guidelines

- **Code Quality**: Use Biome for formatting and linting
- **Type Safety**: Leverage TypeScript to its fullest
- **Documentation**: Update README.md for significant changes
- **Testing**: Add tests for new features (when test infrastructure is available)
- **Performance**: Consider performance implications of changes
- **Accessibility**: Ensure UI components are accessible

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features from the [Future Enhancements](#-future-enhancements) list
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Adding tests
- 🔧 DevOps and infrastructure improvements
- 🌐 Internationalization (i18n)

### Questions or Issues?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Be respectful and constructive in all interactions

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 AndreGM

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## 👤 Author

**AndreGM**
- GitHub: [@AndreGM](https://github.com/AndreGM)

## 🔗 Useful Links

### Documentation
- [Fastify Documentation](https://fastify.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Zod Documentation](https://zod.dev/)
- [Shiki Documentation](https://shiki.matsu.io/)
- [Radix UI Documentation](https://www.radix-ui.com/)

### Tools
- [Scalar API Reference](https://github.com/scalar/scalar)
- [Biome](https://biomejs.dev/)
- [pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/)

## 📊 Project Stats

- **Languages**: TypeScript, SQL
- **Package Manager**: pnpm (workspaces)
- **Node Version**: 22+ recommended
- **PostgreSQL Version**: 17
- **Total Packages**: ~50+ dependencies across both projects
- **Architecture**: Monorepo with 2 workspaces

## ⚡ Performance Considerations

- **Fastify**: One of the fastest Node.js web frameworks
- **UUIDv7**: Time-sortable IDs for better database indexing
- **Cursor pagination**: Efficient pagination without OFFSET scans
- **JSONB**: Fast JSON querying in PostgreSQL
- **React 19**: Concurrent rendering and automatic batching
- **Vite**: Lightning-fast HMR and optimized builds
- **Biome**: Faster alternative to ESLint + Prettier

## 🏷️ Tags

`webhook` `inspector` `fastify` `react` `typescript` `postgresql` `drizzle-orm` `tanstack-router` `tailwindcss` `vite` `zod` `monorepo` `pnpm`

## 🙏 Acknowledgments

This project was built with amazing open-source technologies:

- **[Fastify](https://fastify.dev/)** - Lightning-fast web framework
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with great DX
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing for React
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next generation build tool
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Shiki](https://shiki.matsu.io/)** - Beautiful syntax highlighting
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[PostgreSQL](https://www.postgresql.org/)** - The world's most advanced open source database

Special thanks to the open-source community for creating these incredible tools!

## 📞 Support

If you have any questions, issues, or suggestions:

- 🐛 **Bug Reports**: [Open an issue](https://github.com/AndreGM/webhookinspector/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/AndreGM/webhookinspector/discussions)
- 📧 **Contact**: Reach out via GitHub

## ⭐ Show Your Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔀 Contributing code
- 📢 Sharing with others

---

**Built with ❤️ using modern web technologies**

*Happy webhook debugging! 🚀*
