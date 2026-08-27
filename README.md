# Oracle Fusion Integration Platform

Enterprise-grade REST API built with NestJS for integrating and synchronizing Oracle Fusion Cloud data with an internal application database.

The platform provides a backend integration layer between an Oracle Fusion environment (or a local mock/simulator) and an internal PostgreSQL database. It exposes standardized REST APIs for employees, departments, suppliers, health monitoring, and synchronization operations.

---

## Overview

The Oracle Fusion Integration Platform is designed as a backend integration service that demonstrates an enterprise integration architecture similar to an Oracle Fusion Integration Developer / ERP Integration Developer environment.

The platform is responsible for:

- Consuming Oracle Fusion REST APIs
- Providing a local Oracle Fusion mock/simulator for development
- Mapping Oracle Fusion data into internal domain models
- Persisting data into PostgreSQL
- Synchronizing Oracle Fusion entities
- Tracking synchronization status and history
- Providing health monitoring endpoints
- Exposing documented REST APIs through Swagger/OpenAPI
- Supporting JWT/Bearer authentication architecture
- Running locally with Docker
- Deploying as a containerized service to Google Cloud Run
- Supporting a Next.js dashboard as the frontend consumer

---

## Architecture

```text
                         ┌──────────────────────────────┐
                         │      Oracle Fusion Cloud      │
                         │                              │
                         │       REST APIs / HCM        │
                         └──────────────┬───────────────┘
                                        │
                                        │ HTTPS
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                Oracle Fusion Integration Platform               │
│                         NestJS API                              │
│                                                                 │
│  ┌──────────────┐    ┌───────────────┐    ┌─────────────────┐  │
│  │ Oracle Auth  │───▶│ Oracle Client │───▶│ Oracle Provider │  │
│  └──────────────┘    └───────────────┘    └─────────────────┘  │
│                                                 │               │
│                                                 ▼               │
│                                      ┌─────────────────────┐    │
│                                      │   Sync Engine       │    │
│                                      │                     │    │
│                                      │ - Employees         │    │
│                                      │ - Departments       │    │
│                                      │ - Suppliers         │    │
│                                      └──────────┬──────────┘    │
│                                                 │               │
│                                                 ▼               │
│                                      ┌─────────────────────┐    │
│                                      │ Prisma ORM          │    │
│                                      └──────────┬──────────┘    │
└────────────────────────────────────────────────┼────────────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │ PostgreSQL / Neon   │
                                      │                     │
                                      │ Employees           │
                                      │ Departments         │
                                      │ Suppliers           │
                                      │ Sync Logs           │
                                      │ Sync Checkpoints    │
                                      └─────────────────────┘


                    Frontend Consumer
                           │
                           │ HTTPS / REST
                           ▼
              ┌──────────────────────────┐
              │ Next.js Dashboard        │
              │                          │
              │ Vercel                   │
              └──────────────────────────┘


Production Deployment:

GitHub
   │
   ▼
Docker Build
   │
   ▼
Google Artifact Registry
   │
   ▼
Google Cloud Run
   │
   ▼
Oracle Fusion Integration API

Technology Stack
Backend
NestJS
TypeScript
Prisma ORM
PostgreSQL
REST API
Swagger / OpenAPI
class-validator
JWT / Bearer authentication infrastructure
Axios / HTTP client
Docker
Integration
Oracle Fusion Cloud REST API architecture
Oracle Fusion mock provider
Employee synchronization
Department synchronization
Supplier synchronization
Incremental synchronization
Synchronization checkpoint
Synchronization history
Synchronization monitoring
Cloud
Google Cloud Run
Google Artifact Registry
Google Cloud PostgreSQL-compatible database integration
Docker container deployment
Development Tools
Git
GitHub
npm
Docker Compose
Prisma CLI
Swagger UI
Project Structure
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
│   │   └── ...
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
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── departments/
│   │   ├── departments.controller.ts
│   │   ├── departments.service.ts
│   │   └── departments.module.ts
│   │
│   ├── employees/
│   │   ├── employees.controller.ts
│   │   ├── employees.service.ts
│   │   ├── employee.repository.ts
│   │   └── ...
│   │
│   ├── health/
│   │   ├── health.controller.ts
│   │   ├── health.service.ts
│   │   └── ...
│   │
│   ├── oracle/
│   │   ├── oracle-auth.service.ts
│   │   ├── oracle-client.service.ts
│   │   ├── oracle.module.ts
│   │   └── ...
│   │
│   ├── suppliers/
│   │   ├── suppliers.controller.ts
│   │   ├── suppliers.service.ts
│   │   └── suppliers.module.ts
│   │
│   ├── sync/
│   │   ├── sync.controller.ts
│   │   ├── sync.service.ts
│   │   ├── sync-engine.service.ts
│   │   ├── sync-monitoring.controller.ts
│   │   ├── sync-monitoring.service.ts
│   │   └── ...
│   │
│   ├── system/
│   │   └── ...
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
├── prisma.config.ts
└── README.md
Prerequisites

Before running the project, make sure the following software is installed.

Node.js

Recommended:

Node.js >= 20.11

Check:

node -v
npm
npm -v
Git
git --version
Docker
docker --version
Docker Compose
docker compose version
Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/oracle-fusion-integration-platform.git

Enter the project directory:

cd oracle-fusion-integration-platform

Install dependencies:

npm install
Environment Configuration

Create the environment file:

cp .env.example .env

Example:

PORT=3000

NODE_ENV=development

APP_NAME=oracle-fusion-integration-platform

ORACLE_MODE=mock

DATABASE_URL="postgresql://postgres:postgres@localhost:5433/oracle_fusion?schema=public"
Environment Variables
Variable	Description	Example
PORT	Application port	3000
NODE_ENV	Runtime environment	development
APP_NAME	Application name	oracle-fusion-integration-platform
ORACLE_MODE	Oracle integration mode	mock
DATABASE_URL	PostgreSQL connection string	postgresql://...
Running PostgreSQL with Docker

The project includes PostgreSQL configuration through Docker Compose.

Start the database:

docker compose up -d postgres

Check running containers:

docker ps

Example:

oracle-postgres

PostgreSQL is exposed locally through:

localhost:5433
Prisma

Generate Prisma Client:

npx prisma generate

Run database migrations:

npx prisma migrate dev

Reset the development database:

npx prisma migrate reset

Seed the database:

npx prisma db seed

Open Prisma Studio:

npx prisma studio
Seed Data

The project includes mock enterprise data for development.

Example entities:

Departments
Finance
Human Resources
Information Technology
Procurement
Employees

The database contains sample employee records including:

John Smith
Sarah Wilson
Michael Brown
David Miller
Emily Davis
...
Suppliers

Example suppliers include:

PT Digital Integrasi Indonesia
PT Global Software Solution
PT Mitra Teknologi Nusantara
PT Enterprise Hardware
...
Development

Start the application:

npm run start:dev

The API will be available at:

http://localhost:3000
Production Build

Build the application:

npm run build

Start the production application:

npm run start:prod
API Documentation

Swagger UI is available at:

http://localhost:3000/api

Swagger provides interactive documentation for the REST API.

The API uses Bearer authentication configuration for protected endpoints.

REST API
Health
Application Health
GET /health

Example:

curl http://localhost:3000/health

Example response:

{
  "status": "UP",
  "database": {
    "status": "UP",
    "responseTime": 6
  },
  "oracle": {
    "status": "UP",
    "responseTime": 1
  }
}
Database Health
GET /health/database

Example:

curl http://localhost:3000/health/database

Example response:

{
  "status": "UP",
  "responseTime": 6
}
Oracle Health
GET /health/oracle

Example:

curl http://localhost:3000/health/oracle
Employees API
Get Employees
GET /employees

Example:

curl http://localhost:3000/employees

The endpoint supports pagination and filtering.

Search
GET /employees?search=john
Limit
GET /employees?limit=25
Offset
GET /employees?limit=10&offset=10
Example Response
{
  "success": true,
  "message": "Employees retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "oracleId": "EMP-001",
      "employeeNumber": "10001",
      "firstName": "John",
      "lastName": "Smith",
      "displayName": "John Smith",
      "email": "john.smith@example.com",
      "departmentId": "uuid",
      "jobTitle": null,
      "status": "ACTIVE",
      "syncedAt": null,
      "createdAt": "2026-08-25T13:04:32.128Z",
      "updatedAt": "2026-08-25T13:04:32.128Z"
    }
  ],
  "meta": {
    "total": 20,
    "limit": 25,
    "offset": 0,
    "page": 1,
    "hasMore": false
  }
}
Get Employee Detail
GET /employees/:id

Example:

curl http://localhost:3000/employees/EMPLOYEE_ID
Departments API
Get Departments
GET /departments

Example:

curl http://localhost:3000/departments

Example response:

{
  "success": true,
  "message": "Departments retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "oracleId": "200",
      "name": "Finance",
      "code": "FIN",
      "managerId": null
    },
    {
      "id": "uuid",
      "oracleId": "300",
      "name": "Human Resources",
      "code": "HR",
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
Suppliers API
Get Suppliers
GET /suppliers

Example:

curl http://localhost:3000/suppliers

Example response:

{
  "success": true,
  "message": "Suppliers retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "supplierNumber": "V0010",
      "supplierName": "PT Cipta Infrastruktur Teknologi",
      "email": "info@ciptainfrastruktur.id",
      "status": "ACTIVE"
    }
  ],
  "meta": {
    "total": 18,
    "limit": 10,
    "offset": 0,
    "page": 1,
    "hasMore": true
  }
}
Synchronization API

The synchronization module demonstrates an enterprise-style integration workflow between Oracle Fusion and the internal database.

Supported entities:

Employee
Department
Supplier
Employee Synchronization
POST /sync/employees

Example:

curl -X POST http://localhost:3000/sync/employees

The synchronization process can:

Retrieve records from the Oracle provider
Transform Oracle records
Compare records with PostgreSQL
Insert new records
Update existing records
Track synchronization results
Record synchronization history
Update synchronization checkpoints
Department Synchronization
POST /sync/departments

Example:

curl -X POST http://localhost:3000/sync/departments
Supplier Synchronization
POST /sync/suppliers

Example:

curl -X POST http://localhost:3000/sync/suppliers
Synchronization Monitoring

The platform provides endpoints for monitoring synchronization operations.

Synchronization Status
GET /sync/status

Example:

curl http://localhost:3000/sync/status

The endpoint provides information such as:

Entity
Status
Last Sync
Total Records
Success Count
Failed Count
Running Synchronizations
GET /sync/running

Example:

curl http://localhost:3000/sync/running

Example response when there is no active synchronization:

{
  "success": true,
  "message": "Running synchronizations retrieved successfully.",
  "data": []
}
Synchronization History
GET /sync/history

Example:

curl http://localhost:3000/sync/history

Pagination:

curl "http://localhost:3000/sync/history?limit=10&offset=0"

Example response:

{
  "success": true,
  "message": "Synchronization history retrieved successfully.",
  "data": [],
  "meta": {
    "total": 0,
    "limit": 10,
    "offset": 0,
    "page": 1,
    "hasMore": false
  }
}
Oracle Fusion Integration

The Oracle module abstracts communication with Oracle Fusion Cloud.

The architecture separates Oracle communication from business logic through an Oracle client/provider layer.

Conceptually:

Application
     │
     ▼
OracleClientService
     │
     ▼
Oracle Fusion REST API
     │
     ▼
HCM / ERP Resources

For development and portfolio demonstration, the project supports mock mode.

Oracle Mock Mode

The application can run without a real Oracle Fusion Cloud account.

Set:

ORACLE_MODE=mock

Mock data is stored under:

src/mocks/

Example:

src/mocks/workers.json
src/mocks/departments.json

This allows the synchronization workflow to be demonstrated without external Oracle credentials.

Validation

Global validation is enabled using NestJS ValidationPipe.

Configuration includes:

whitelist
forbidNonWhitelisted
transform
implicit conversion

This helps prevent unexpected request properties from entering application logic.

Error Handling

The application uses a global HTTP exception filter.

Location:

src/common/filters/http-exception.filter.ts

The filter provides standardized API error responses.

CORS

CORS is configured for the frontend dashboard.

Allowed origins include:

http://localhost:3000

The production dashboard:

https://oracle-fusion-integration-dashboard.vercel.app

Vercel preview deployments matching:

https://oracle-fusion-integration-dashboard*.vercel.app

are also supported.

This allows the deployed Next.js dashboard to communicate with the backend API hosted on Google Cloud Run.

Docker

Build the application image:

docker build -t oracle-fusion-api .

Run the container:

docker run --env-file .env -p 3000:3000 oracle-fusion-api
Docker Compose

Start the complete local environment:

docker compose up -d

Stop the environment:

docker compose down

View logs:

docker compose logs -f
Google Cloud Run Deployment

The backend is deployable as a containerized application to Google Cloud Run.

Example production service:

oracle-fusion-api

Region:

asia-southeast1

The deployed API follows the Cloud Run service architecture:

Internet
    │
    ▼
Google Cloud Run
    │
    ▼
NestJS Container
    │
    ├── PostgreSQL
    │
    └── Oracle Integration Layer
Cloud Run Service

Example service:

oracle-fusion-api

Region:

asia-southeast1

The deployed API endpoint can be verified using:

curl https://YOUR-CLOUD-RUN-URL/health

Database health:

curl https://YOUR-CLOUD-RUN-URL/health/database

Employees:

curl https://YOUR-CLOUD-RUN-URL/employees

Departments:

curl https://YOUR-CLOUD-RUN-URL/departments

Suppliers:

curl https://YOUR-CLOUD-RUN-URL/suppliers
Cloud Run Container Image

The service is deployed using a container image stored in Google Artifact Registry.

Example image:

asia-southeast1-docker.pkg.dev/oracle-fusion-portfolio/oracle-fusion-api/oracle-fusion-api:latest
API Verification

Production API can be tested using:

curl -s https://YOUR-CLOUD-RUN-URL/health | jq

Example database verification:

curl -i \
  -H "Origin: https://oracle-fusion-integration-dashboard.vercel.app" \
  https://YOUR-CLOUD-RUN-URL/health/database

A successful CORS response should contain:

access-control-allow-origin:
https://oracle-fusion-integration-dashboard.vercel.app
Git Workflow

Check repository status:

git status

View changes:

git diff

Stage changes:

git add .

Commit:

git commit -m "docs: update backend readme"

Push:

git push origin main
Development Workflow

Typical development workflow:

1. Start PostgreSQL
       │
       ▼
2. Run Prisma migrations
       │
       ▼
3. Seed development data
       │
       ▼
4. Start NestJS
       │
       ▼
5. Test REST API
       │
       ▼
6. Test synchronization
       │
       ▼
7. Verify dashboard integration
       │
       ▼
8. Run production build
       │
       ▼
9. Build Docker image
       │
       ▼
10. Deploy to Cloud Run
Testing API Locally

Health:

curl http://localhost:3000/health

Employees:

curl http://localhost:3000/employees | jq

Departments:

curl http://localhost:3000/departments | jq

Suppliers:

curl http://localhost:3000/suppliers | jq

Synchronization status:

curl http://localhost:3000/sync/status | jq

Synchronization history:

curl http://localhost:3000/sync/history | jq

Running synchronization:

curl http://localhost:3000/sync/running | jq
Production Verification

After deploying to Google Cloud Run:

curl -s \
  https://YOUR-CLOUD-RUN-URL/health \
  | jq

Test employees:

curl -s \
  https://YOUR-CLOUD-RUN-URL/employees \
  | jq

Test departments:

curl -s \
  https://YOUR-CLOUD-RUN-URL/departments \
  | jq

Test suppliers:

curl -s \
  https://YOUR-CLOUD-RUN-URL/suppliers \
  | jq

Test CORS:

curl -i \
  -H "Origin: https://oracle-fusion-integration-dashboard.vercel.app" \
  https://YOUR-CLOUD-RUN-URL/health/database
Design Principles

The project follows several enterprise integration principles.

Separation of Concerns

Integration logic, business logic, persistence, and API controllers are separated into independent modules.

Repository Pattern

Database operations are encapsulated in repository classes instead of being directly implemented inside controllers.

Service Layer

Business logic is implemented inside service classes.

Provider Abstraction

Oracle Fusion communication is abstracted behind provider/client components so the application can operate with either:

Mock Provider

or:

Oracle Fusion REST API
Incremental Synchronization

Synchronization can use checkpoints to avoid processing the entire dataset repeatedly.

Observability

Synchronization activity is tracked through:

Sync Status
Sync History
Sync Running State
Health Checks
Security Considerations

The project includes infrastructure for API authentication using Bearer tokens.

The application also implements:

Request validation
Whitelisted properties
Non-whitelisted property rejection
Standardized exception handling
CORS restrictions
Environment-based configuration

Production secrets should never be committed to Git.

Use environment variables or a managed secret solution for:

DATABASE_URL
Oracle credentials
JWT secrets
API credentials
Database

The project uses PostgreSQL as the integration database.

Main domain entities include:

Employee
Department
Supplier
SyncLog
SyncCheckpoint

Prisma manages:

Schema
Migrations
Database access
Type-safe queries
API Response Standard

The API follows a consistent response structure.

Successful response:

{
  "success": true,
  "message": "Operation completed successfully.",
  "data": []
}


Paginated response:

{
  "success": true,
  "message": "Records retrieved successfully.",
  "data": [],
  "meta": {
    "total": 0,
    "limit": 10,
    "offset": 0,
    "page": 1,
    "hasMore": false
  }
}
Current Status

The current backend implementation includes:

 NestJS application
 TypeScript
 PostgreSQL
 Prisma ORM
 Prisma migrations
 Database seed
 Employee API
 Department API
 Supplier API
 Oracle integration abstraction
 Oracle mock mode
 Employee synchronization
 Department synchronization
 Supplier synchronization
 Synchronization history
 Synchronization monitoring
 Running synchronization monitoring
 Synchronization checkpoint
 Pagination
 Search
 Global validation
 Global exception filter
 Health monitoring
 Swagger / OpenAPI
 CORS configuration
 Docker
 Docker Compose
 Google Cloud Run deployment
 Production API verification
 Next.js dashboard integration