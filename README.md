# Oracle Fusion Integration Platform

Enterprise-style REST API and integration middleware built with **NestJS** to simulate an Oracle Fusion Cloud integration environment.

The platform provides a backend integration layer between Oracle Fusion-style services and an operational database, with support for employee, department, supplier, health monitoring, and synchronization workflows.

This project is designed as a **portfolio implementation for Oracle Fusion Integration / Middleware / Backend Engineering roles**.

---

## Architecture

```text
                         ┌──────────────────────────────┐
                         │     Oracle Fusion Simulator  │
                         │        / Mock Service        │
                         └──────────────┬───────────────┘
                                        │
                                        │ REST / HTTP
                                        ▼
┌──────────────────────┐       ┌──────────────────────────────┐
│                      │       │                              │
│   Next.js Dashboard  │──────▶│     NestJS Integration API   │
│                      │ REST  │                              │
└──────────────────────┘       │                              │
                               │  ┌────────────────────────┐  │
                               │  │ Oracle Integration      │  │
                               │  │ Client / Auth Layer     │  │
                               │  └────────────────────────┘  │
                               │                              │
                               │  ┌────────────────────────┐  │
                               │  │ Employee Module         │  │
                               │  │ Department Module       │  │
                               │  │ Supplier Module         │  │
                               │  │ Sync Module             │  │
                               │  │ Health Module            │  │
                               │  └────────────────────────┘  │
                               │                              │
                               │        Prisma ORM            │
                               └──────────────┬───────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │       PostgreSQL / Neon      │
                               │                              │
                               │ Employees                    │
                               │ Departments                  │
                               │ Suppliers                    │
                               │ Sync Logs                    │
                               │ Sync Checkpoints             │
                               └──────────────────────────────┘
```

---

## Features

### Integration

- Oracle Fusion-style REST integration
- Oracle client abstraction
- Mock Oracle mode for portfolio/demo environments
- Centralized integration layer
- Configurable Oracle authentication
- REST-based communication

### Employee Management

- Retrieve employees
- Employee search
- Pagination
- Employee detail retrieval
- Department relationship
- Employee status
- Oracle employee identifiers

### Department Management

- Retrieve departments
- Oracle department identifiers
- Department code
- Department manager relationship

### Supplier Management

- Retrieve suppliers
- Supplier number
- Supplier name
- Supplier email
- Supplier status
- Pagination

### Synchronization

- Employee synchronization
- Department synchronization
- Supplier synchronization
- Synchronization history
- Running synchronization monitoring
- Synchronization status
- Sync operation tracking
- Sync checkpoint support

### Monitoring

- Application health
- Database health
- Oracle integration health
- Synchronization status
- Synchronization history
- Running synchronization monitoring

### API

- RESTful API
- Swagger / OpenAPI documentation
- DTO validation
- Global validation pipe
- Global HTTP exception filter
- CORS support
- Pagination
- Standardized API responses

### Deployment

- Docker support
- Docker Compose support
- Railway-compatible deployment
- Google Cloud Run deployment
- Neon PostgreSQL support

---

# Technology Stack

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Programming language |
| Prisma | ORM |
| PostgreSQL | Relational database |
| Neon | Cloud PostgreSQL |
| Docker | Containerization |
| Docker Compose | Local development |
| Swagger / OpenAPI | API documentation |
| JWT | Authentication foundation |
| OAuth 2.0 | Integration authentication foundation |
| Google Cloud Run | Cloud deployment |
| Google Artifact Registry | Container image registry |
| GitHub | Source control |

---

# Project Structure

```text
oracle-fusion-integration-platform/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │
│   ├── common/
│   │   ├── dto/
│   │   ├── filters/
│   │   └── ...
│   │
│   ├── config/
│   │   ├── configuration.ts
│   │   └── env.validation.ts
│   │
│   ├── database/
│   │   ├── database.module.ts
│   │   └── prisma.module.ts
│   │
│   ├── departments/
│   │   ├── departments.controller.ts
│   │   ├── departments.module.ts
│   │   └── departments.service.ts
│   │
│   ├── employees/
│   │   ├── employees.controller.ts
│   │   ├── employees.module.ts
│   │   ├── employees.service.ts
│   │   ├── repositories/
│   │   └── ...
│   │
│   ├── health/
│   │   ├── health.controller.ts
│   │   ├── health.module.ts
│   │   └── health.service.ts
│   │
│   ├── oracle/
│   │   ├── oracle-auth.service.ts
│   │   ├── oracle-client.service.ts
│   │   └── oracle.module.ts
│   │
│   ├── suppliers/
│   │   ├── suppliers.controller.ts
│   │   ├── suppliers.module.ts
│   │   └── suppliers.service.ts
│   │
│   ├── sync/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── system/
│   │   └── ...
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

# Prerequisites

Make sure the following tools are installed:

- Node.js 20+
- npm 10+
- Git
- Docker
- Docker Compose

Optional:

- Google Cloud CLI (`gcloud`)
- PostgreSQL client
- Neon account

Check versions:

```bash
node --version
npm --version
git --version
docker --version
docker compose version
```

---

# Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Enter the project directory:

```bash
cd oracle-fusion-integration-platform
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

Create the environment file:

```bash
cp .env.example .env
```

Example configuration:

```env
PORT=3000

NODE_ENV=development

APP_NAME=oracle-fusion-integration-platform

ORACLE_MODE=mock

DATABASE_REQUIRED=true

DATABASE_URL="postgresql://postgres:postgres@localhost:5433/oracle_fusion"
```

For Neon PostgreSQL:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"
```

---

# Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Application port |
| `NODE_ENV` | Application environment |
| `APP_NAME` | Application name |
| `ORACLE_MODE` | Oracle integration mode |
| `DATABASE_REQUIRED` | Enable or disable database health requirement |
| `DATABASE_URL` | PostgreSQL connection string |

---

# Oracle Integration Modes

The application supports a mock Oracle integration mode for portfolio and development environments.

```env
ORACLE_MODE=mock
```

Mock mode allows the application to operate without requiring a real Oracle Fusion Cloud account.

This makes the project suitable for:

- Local development
- Portfolio demonstrations
- API testing
- Integration architecture demonstrations
- Cloud deployment demonstrations

A real Oracle Fusion integration can be configured later by replacing the mock implementation with the actual Oracle Fusion REST endpoints and credentials.

---

# Database Setup

## Option 1 — Local PostgreSQL with Docker

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Check running containers:

```bash
docker ps
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed the database:

```bash
npm run prisma:seed
```

---

# Option 2 — Neon PostgreSQL

The application can also use Neon PostgreSQL.

Configure:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"
```

Check migration status:

```bash
npx prisma migrate status
```

Apply migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed the database:

```bash
npm run prisma:seed
```

---

# Prisma

Check Prisma migration status:

```bash
npx prisma migrate status
```

Create a development migration:

```bash
npx prisma migrate dev
```

Apply production migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Inspect the database:

```bash
npx prisma studio
```

Reset the development database:

```bash
npx prisma migrate reset
```

> Do not use `migrate reset` against a production database.

---

# Running the Application

## Development

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## Production

Build:

```bash
npm run build
```

Start:

```bash
npm run start:prod
```

---

# API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api
```

The Swagger UI provides interactive documentation for the REST API.

The API uses bearer authentication support where authentication is enabled.

---

# API Endpoints

## Health

### Application Health

```http
GET /health
```

Example:

```bash
curl http://localhost:3000/health
```

---

### Database Health

```http
GET /health/database
```

Example:

```bash
curl http://localhost:3000/health/database
```

Example response:

```json
{
  "status": "UP",
  "responseTime": 6
}
```

---

### Oracle Health

```http
GET /health/oracle
```

Example:

```bash
curl http://localhost:3000/health/oracle
```

---

# Employees

## Get Employees

```http
GET /employees
```

Example:

```bash
curl http://localhost:3000/employees
```

---

## Search Employees

```http
GET /employees?search=John
```

Example:

```bash
curl "http://localhost:3000/employees?search=John"
```

---

## Employee Pagination

```http
GET /employees?limit=10&offset=0
```

Example:

```bash
curl "http://localhost:3000/employees?limit=10&offset=0"
```

---

## Get Employee Detail

```http
GET /employees/:id
```

Example:

```bash
curl http://localhost:3000/employees/<employee-id>
```

---

# Departments

## Get Departments

```http
GET /departments
```

Example:

```bash
curl http://localhost:3000/departments
```

Example response:

```json
{
  "success": true,
  "message": "Departments retrieved successfully.",
  "data": [
    {
      "id": "782b1146-0b2a-4228-886b-c80262b85692",
      "oracleId": "200",
      "name": "Finance",
      "code": "FIN",
      "managerId": null
    }
  ],
  "meta": {
    "total": 4,
    "limit": 10,
    "offset": 0,
    "page": 1,
    "hasMore": false
  }
}
```

---

# Suppliers

## Get Suppliers

```http
GET /suppliers
```

Example:

```bash
curl http://localhost:3000/suppliers
```

---

## Supplier Pagination

```http
GET /suppliers?limit=10&offset=0
```

Example:

```bash
curl "http://localhost:3000/suppliers?limit=10&offset=0"
```

---

# Synchronization

The synchronization layer provides controlled data synchronization between Oracle Fusion-style sources and the integration database.

---

## Synchronize Employees

```http
POST /sync/employees
```

Example:

```bash
curl -X POST http://localhost:3000/sync/employees
```

---

## Synchronize Departments

```http
POST /sync/departments
```

Example:

```bash
curl -X POST http://localhost:3000/sync/departments
```

---

## Synchronize Suppliers

```http
POST /sync/suppliers
```

Example:

```bash
curl -X POST http://localhost:3000/sync/suppliers
```

---

# Synchronization Monitoring

## Synchronization Status

```http
GET /sync/status
```

Example:

```bash
curl http://localhost:3000/sync/status
```

---

## Synchronization History

```http
GET /sync/history
```

Example:

```bash
curl "http://localhost:3000/sync/history?limit=10&offset=0"
```

---

## Running Synchronization

```http
GET /sync/running
```

Example:

```bash
curl http://localhost:3000/sync/running
```

Example response when there is no active synchronization:

```json
{
  "success": true,
  "message": "Running synchronizations retrieved successfully.",
  "data": []
}
```

---

# Standard API Response

Successful responses generally follow a consistent structure.

```json
{
  "success": true,
  "message": "Employees retrieved successfully",
  "data": [],
  "meta": {
    "total": 20,
    "limit": 25,
    "offset": 0,
    "page": 1,
    "hasMore": false
  }
}
```

This structure provides:

- Operation status
- Human-readable message
- Response data
- Pagination metadata where applicable

---

# Validation

The application uses NestJS `ValidationPipe` with:

```text
whitelist: true
forbidNonWhitelisted: true
transform: true
enableImplicitConversion: true
```

This provides:

- DTO validation
- Automatic type transformation
- Protection against unexpected request properties
- Consistent request validation

---

# CORS

The API allows requests from configured frontend origins.

The configuration supports:

- Local Next.js development
- Production frontend
- Vercel preview deployments

Vercel preview origins are supported using a controlled origin pattern.

Example:

```text
https://oracle-fusion-integration-dashboard-*.vercel.app
```

CORS is configured in:

```text
src/main.ts
```

---

# Docker

Build the application image:

```bash
docker build -t oracle-fusion-integration-platform .
```

Run the container:

```bash
docker run --rm \
  -p 3000:3000 \
  --env-file .env \
  oracle-fusion-integration-platform
```

---

# Docker Compose

Start the development environment:

```bash
docker compose up -d
```

View running services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f app
```

Stop services:

```bash
docker compose down
```

---

# Google Cloud Run Deployment

The backend can be deployed to Google Cloud Run using a container image.

Example image:

```text
asia-southeast1-docker.pkg.dev/oracle-fusion-portfolio/oracle-fusion-api/oracle-fusion-api:latest
```

Example Cloud Run service:

```text
oracle-fusion-api
```

Region:

```text
asia-southeast1
```

Deploy using:

```bash
gcloud run deploy oracle-fusion-api \
  --image asia-southeast1-docker.pkg.dev/oracle-fusion-portfolio/oracle-fusion-api/oracle-fusion-api:latest \
  --region asia-southeast1
```

Check the deployed image:

```bash
gcloud run services describe oracle-fusion-api \
  --region=asia-southeast1 \
  --format="value(spec.template.spec.containers[0].image)"
```

Check the latest ready revision:

```bash
gcloud run services describe oracle-fusion-api \
  --region=asia-southeast1 \
  --format="value(status.latestReadyRevisionName)"
```

---

# Production API

The deployed backend is currently hosted on Google Cloud Run.

Example:

```text
https://oracle-fusion-api-832119751212.asia-southeast1.run.app
```

Health check:

```bash
curl https://oracle-fusion-api-832119751212.asia-southeast1.run.app/health
```

Database health:

```bash
curl https://oracle-fusion-api-832119751212.asia-southeast1.run.app/health/database
```

Departments:

```bash
curl https://oracle-fusion-api-832119751212.asia-southeast1.run.app/departments
```

Employees:

```bash
curl https://oracle-fusion-api-832119751212.asia-southeast1.run.app/employees
```

Suppliers:

```bash
curl https://oracle-fusion-api-832119751212.asia-southeast1.run.app/suppliers
```

---

# Frontend Integration

The backend is designed to be consumed by the companion Next.js dashboard:

```text
Oracle Fusion Integration Dashboard
```

The frontend configures the API URL using:

```env
NEXT_PUBLIC_API_BASE_URL=https://oracle-fusion-api-832119751212.asia-southeast1.run.app
```

The dashboard consumes endpoints including:

```text
GET /health
GET /health/database
GET /health/oracle

GET /employees
GET /employees/:id

GET /departments
GET /suppliers

GET /sync/status
GET /sync/history
GET /sync/running
```

---

# Development Workflow

Typical development workflow:

```text
1. Update source code
       │
       ▼
2. Run development server
       │
       ▼
3. Test API locally
       │
       ▼
4. Run Prisma migration if required
       │
       ▼
5. Run production build
       │
       ▼
6. Build Docker image
       │
       ▼
7. Push image to registry
       │
       ▼
8. Deploy to Cloud Run
       │
       ▼
9. Test production endpoints
       │
       ▼
10. Connect frontend dashboard
```

---

# Testing API

Health:

```bash
curl -i http://localhost:3000/health
```

Database:

```bash
curl -i http://localhost:3000/health/database
```

Employees:

```bash
curl -s http://localhost:3000/employees | jq
```

Departments:

```bash
curl -s http://localhost:3000/departments | jq
```

Suppliers:

```bash
curl -s http://localhost:3000/suppliers | jq
```

Synchronization status:

```bash
curl -s http://localhost:3000/sync/status | jq
```

Synchronization history:

```bash
curl -s \
  "http://localhost:3000/sync/history?limit=10&offset=0" \
  | jq
```

Running synchronization:

```bash
curl -s http://localhost:3000/sync/running | jq
```

---

# Build Verification

Run the production build:

```bash
npm run build
```

Expected result:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

# Git Workflow

Check repository status:

```bash
git status
```

Review changes:

```bash
git diff
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "docs: update backend README"
```

Push to GitHub:

```bash
git push origin main
```

---

# Project Goals

This project demonstrates practical experience with:

- Enterprise REST API development
- Oracle Fusion integration concepts
- Middleware architecture
- REST API integration
- PostgreSQL data management
- Prisma ORM
- Data synchronization
- Incremental synchronization concepts
- Sync checkpoint management
- API health monitoring
- Error handling
- Request validation
- API documentation
- Docker containerization
- Cloud deployment
- Frontend/backend integration
- Cloud database integration

---

# Future Improvements

Potential future enhancements include:

- OAuth 2.0 implementation with Oracle Fusion
- Production Oracle Fusion Cloud integration
- BullMQ-based background synchronization
- Redis-based job processing
- Advanced retry strategy
- Dead-letter queue
- Idempotency handling
- Distributed locking
- Advanced sync checkpoint management
- Prometheus metrics
- Grafana dashboards
- Structured logging
- OpenTelemetry tracing
- GitHub Actions CI/CD
- Automated integration testing
- Rate limiting
- API versioning
- Role-based access control
- Audit logging

---

# Related Project

Frontend dashboard:

```text
Oracle Fusion Integration Dashboard
```

The dashboard provides an operational UI for:

- Employee directory
- Employee details
- Department data
- Supplier data
- Synchronization monitoring
- Health monitoring
- Integration status

---

# Portfolio Context

This project is intended to demonstrate an enterprise integration architecture similar to systems commonly used in Oracle Fusion Cloud integration environments.

The architecture separates:

```text
Frontend
   │
   ▼
Integration API
   │
   ├── Oracle Client
   │
   ├── Business Modules
   │
   ├── Synchronization Layer
   │
   └── Health Monitoring
           │
           ▼
      PostgreSQL
```

The implementation uses a mock Oracle integration layer so the complete architecture can be demonstrated without requiring access to a production Oracle Fusion Cloud environment.

---

# License

This project is intended for portfolio and educational purposes.
