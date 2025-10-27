# Webhook Inspector

A full-stack application for inspecting and debugging webhooks. This tool allows you to capture, store, and analyze incoming webhook requests with detailed information about headers, body, and metadata.

## 🏗️ Project Structure

This is a monorepo managed with **pnpm workspaces** containing two main packages:

```
webhookinspector/
├── api/          # Backend API (Fastify + PostgreSQL)
└── web/          # Frontend (React + Vite)
```

## ✨ Features

- **Webhook Capture**: Capture incoming webhook requests with full details
- **Request Inspection**: View method, path, headers, body, query parameters, and IP address
- **Database Storage**: Persist webhook data using PostgreSQL with Drizzle ORM
- **API Documentation**: Interactive API docs powered by Scalar
- **Type Safety**: Full TypeScript support across the stack
- **Modern Stack**: Built with latest technologies and best practices

## 🛠️ Tech Stack

### Backend (API)
- **Runtime**: Node.js with TypeScript
- **Framework**: [Fastify](https://fastify.dev/) - Fast and low overhead web framework
- **Database**: PostgreSQL 17
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript-first ORM
- **Validation**: Zod - TypeScript-first schema validation
- **API Docs**: Swagger + Scalar API Reference
- **Code Quality**: Biome - Fast formatter and linter

### Frontend (Web)
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript

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

## 📚 API Endpoints

### Health Check
- `GET /health` - Check API health status

### Webhooks
- `GET /api/webhooks` - List all captured webhooks
  - Query params: `limit` (optional, default: 20, max: 100)

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

### Root
```bash
pnpm install          # Install all dependencies
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
```

### Web
```bash
pnpm dev             # Start Vite development server
pnpm build           # Build for production
pnpm preview         # Preview production build
```

## 🐳 Docker

The project includes a Docker Compose configuration for running PostgreSQL:

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

## 📝 Environment Variables

### API Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | API server port | 3333 |
| DATABASE_URL | PostgreSQL connection URL | Required |

## 🏛️ Architecture

### Backend Architecture
- **Fastify** with TypeScript for type-safe routing
- **Zod** for runtime validation and type inference
- **Drizzle ORM** for database operations with snake_case mapping
- **UUIDv7** for unique, time-sortable identifiers
- **CORS** enabled for cross-origin requests

### Database
- PostgreSQL with JSONB support for flexible data storage
- Drizzle Kit for schema migrations
- Snake case column naming convention

## 🔐 CORS Configuration

The API is configured with CORS support:
- Allowed methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Origin: All origins allowed (configurable)

## 📖 API Documentation

Interactive API documentation is available at `/docs` when running the API server. It's powered by Scalar and provides:
- Full endpoint documentation
- Request/response schemas
- Interactive API testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

AndreGM

---

Built with ❤️ using modern web technologies
