# Oracle Fusion Integration Platform

> Enterprise-grade Oracle Fusion Integration Platform built with **NestJS**, **Prisma**, and **PostgreSQL**.

---

## Overview

Oracle Fusion Integration Platform is a backend application designed to synchronize enterprise master data between **Oracle Fusion Cloud Applications** and a local database.

This project demonstrates how an enterprise integration service can be implemented using a clean, modular, and scalable architecture. Instead of acting as a simple CRUD application, it simulates a real-world Oracle Fusion integration service capable of retrieving data from Oracle REST APIs, transforming the payload, storing synchronized data locally, and exposing standardized REST APIs for downstream applications.

The current implementation focuses on three master data domains:

- Employees (HCM)
- Departments (HCM)
- Suppliers (Procurement)

The platform also provides synchronization services, pagination, filtering, centralized logging, Swagger documentation, and an extensible architecture for future Oracle Fusion modules.

---

# Key Features

## Oracle Fusion Integration

- Oracle Fusion REST API Client
- Basic Authentication Support
- Configurable Oracle Environment
- Oracle Pagination Support
- Oracle Filter Builder
- Generic Oracle Provider Architecture

---

## Synchronization Engine

- Full Synchronization
- Incremental Synchronization
- Generic Sync Processor
- Upsert Strategy
- Synchronization Coordinator
- Batch Processing
- Pagination Support
- Synchronization Logging

---

## REST API

- Employees API
- Departments API
- Suppliers API
- Synchronization API
- Swagger / OpenAPI Documentation
- Validation Pipe
- Global Exception Filter

---

## Database

- PostgreSQL
- Prisma ORM
- UUID Primary Keys
- Automatic Timestamp
- Migration Support

---

## Enterprise Features

- Modular Architecture
- Repository Pattern
- Provider Pattern
- Mapper Pattern
- DTO Layer
- Dependency Injection
- Configuration Management
- Environment Validation
- HTTP Logging
- Error Mapping

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | NestJS |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Documentation | Swagger / OpenAPI |
| Validation | class-validator |
| HTTP Client | Axios |
| Scheduler | @nestjs/schedule |
| Logging | NestJS Logger |
| Container | Docker |
| Version Control | Git |

---

# Project Architecture

```text
                    +----------------------+
                    |  Oracle Fusion Cloud |
                    |    REST Services     |
                    +----------+-----------+
                               |
                               |
                     Oracle REST Client
                               |
                               |
                +--------------v--------------+
                | Oracle Integration Platform |
                +--------------+--------------+
                               |
         +---------------------+---------------------+
         |                     |                     |
         |                     |                     |
+--------v-------+    +--------v-------+    +--------v-------+
| Employees      |    | Departments    |    | Suppliers      |
| Module         |    | Module         |    | Module         |
+--------+-------+    +--------+-------+    +--------+-------+
         |                     |                     |
         +---------------------+---------------------+
                               |
                      Synchronization Engine
                               |
                               |
                      Generic Sync Processor
                               |
                               |
                       Repository Layer
                               |
                               |
                            Prisma ORM
                               |
                               |
                         PostgreSQL Database
```

---

# High-Level Architecture

```text
src
│
├── common
│   ├── dto
│   ├── filters
│   ├── interceptors
│   ├── interfaces
│   └── utils
│
├── config
│
├── database
│
├── modules
│   ├── employees
│   ├── departments
│   ├── suppliers
│   ├── oracle
│   ├── sync
│   ├── auth
│   ├── health
│   └── system
│
└── main.ts
```

---

# Module Overview

## Oracle Module

Responsible for communication with Oracle Fusion REST APIs.

Components include:

- Oracle Client
- Authentication Service
- Pagination Service
- Query Builder
- Filter Builder
- Provider Layer
- DTO Mapping

---

## Employees Module

Provides employee APIs and synchronization support.

Responsibilities:

- Retrieve employees
- Local employee repository
- Mapping Oracle DTO
- REST endpoints

---

## Departments Module

Provides department management and synchronization.

Responsibilities:

- Department repository
- Department mapping
- Oracle provider
- REST endpoints

---

## Suppliers Module

Responsible for supplier synchronization.

Responsibilities:

- Supplier repository
- Supplier mapper
- Oracle supplier provider
- REST API

---

## Synchronization Module

Coordinates all synchronization jobs.

Responsibilities:

- Full Synchronization
- Incremental Synchronization
- Batch Processing
- Logging
- Generic Sync Processor
- Synchronization Coordinator

---

# Design Principles

This project follows several enterprise software engineering principles:

- Clean Architecture
- SOLID Principles
- Separation of Concerns
- Repository Pattern
- Provider Pattern
- Mapper Pattern
- Dependency Injection
- Single Responsibility Principle
- Configuration by Environment
- Extensible Module Design

---

# Current Features

| Feature | Status |
|----------|:------:|
| Employee Synchronization | ✅ |
| Department Synchronization | ✅ |
| Supplier Synchronization | ✅ |
| Oracle REST Client | ✅ |
| Generic Oracle Provider | ✅ |
| Oracle Pagination | ✅ |
| Oracle Filter Builder | ✅ |
| Generic Synchronization Engine | ✅ |
| Incremental Synchronization | ✅ |
| Scheduler Support | ✅ |
| Prisma ORM | ✅ |
| PostgreSQL | ✅ |
| Swagger Documentation | ✅ |
| Global Exception Filter | ✅ |
| HTTP Logging | ✅ |
| Docker Support | ✅ |
| Unit Testing | ⏳ Planned |
| CI/CD Pipeline | ⏳ Planned |

---

# Repository Structure

```text
oracle-fusion-integration-platform
│
├── docs
├── prisma
├── src
├── test
├── docker
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

# Project Goals

The primary objective of this project is to demonstrate enterprise backend development skills for Oracle Fusion integrations, including:

- Oracle Fusion REST API Integration
- Enterprise Backend Architecture
- Synchronization Engine Design
- Data Transformation
- Repository Pattern
- Prisma ORM
- PostgreSQL Integration
- REST API Development
- Enterprise Logging
- Scalable Module Design

This project is intended as both a learning resource and a professional portfolio showcasing modern backend engineering practices in the Oracle Fusion ecosystem.

# Installation

## Prerequisites

Before running this project, make sure you have the following software installed:

| Software | Version |
|----------|---------|
| Node.js | 20.x or later |
| npm | 10.x or later |
| PostgreSQL | 15+ |
| Git | Latest |
| Docker | Optional |

You can verify your installation by running:

```bash
node -v
npm -v
git --version
```

---

## Clone Repository

Clone this repository to your local machine.

```bash
git clone https://github.com/fauzirahman/oracle-fusion-integration-platform.git
```

Navigate to the project directory.

```bash
cd oracle-fusion-integration-platform
```

---

## Install Dependencies

Install all required Node.js packages.

```bash
npm install
```

Once the installation is complete, verify that NestJS dependencies have been installed successfully.

```bash
npm list --depth=0
```

---

## Environment Variables

Create a new environment file by copying the example configuration.

```bash
cp .env.example .env
```

Update the values in the `.env` file to match your environment.

Example:

```env
####################################################
# Application
####################################################

NODE_ENV=development
PORT=3000

####################################################
# Database
####################################################

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/oracle_integration?schema=public"

####################################################
# Oracle Fusion
####################################################

ORACLE_BASE_URL=https://your-instance.oraclecloud.com

ORACLE_USERNAME=your_username

ORACLE_PASSWORD=your_password

####################################################
# Synchronization
####################################################

SYNC_BATCH_SIZE=100

SYNC_PAGE_SIZE=100

####################################################
# Logging
####################################################

LOG_LEVEL=debug
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| NODE_ENV | Application environment |
| PORT | HTTP server port |
| DATABASE_URL | PostgreSQL connection string |
| ORACLE_BASE_URL | Oracle Fusion REST API base URL |
| ORACLE_USERNAME | Oracle Fusion username |
| ORACLE_PASSWORD | Oracle Fusion password |
| SYNC_BATCH_SIZE | Number of records processed per synchronization batch |
| SYNC_PAGE_SIZE | Number of records retrieved from Oracle Fusion per request |
| LOG_LEVEL | Application logging level |

> **Important**
>
> Never commit your actual `.env` file to version control. Only commit `.env.example`.

---

## Database Setup

This project uses **PostgreSQL** as the primary database.

Create a PostgreSQL database.

Example:

```sql
CREATE DATABASE oracle_integration;
```

Verify the database connection by checking the `DATABASE_URL` value in your `.env` file.

---

## Prisma Setup

Generate the Prisma Client.

```bash
npx prisma generate
```

Apply database migrations.

```bash
npx prisma migrate dev
```

For production environments, use:

```bash
npx prisma migrate deploy
```

To inspect your database visually, launch Prisma Studio.

```bash
npx prisma studio
```

---

## Docker (Optional)

If Docker is installed, you can start the required services using Docker Compose.

```bash
docker compose up -d
```

To stop all running containers:

```bash
docker compose down
```

> Docker is optional and primarily intended for local development environments.

---

## Running the Application

Start the application in development mode.

```bash
npm run start:dev
```

Build the application for production.

```bash
npm run build
```

Run the production build.

```bash
npm run start:prod
```

By default, the application will be available at:

```text
http://localhost:3000
```

---

## Swagger Documentation

Once the application is running, Swagger UI can be accessed at:

```text
http://localhost:3000/api
```

Swagger provides interactive API documentation for all available endpoints.

---

## Health Check

Verify that the application is running correctly.

```http
GET /health
```

Example response:

```json
{
  "status": "UP",
  "timestamp": "2026-08-02T03:50:58.458Z",
  "database": {
    "status": "UP",
    "responseTime": 21
  },
  "oracle": {
    "status": "UP",
    "responseTime": 5
  }
}
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run start:dev` | Start the application in development mode |
| `npm run build` | Build the application |
| `npm run start:prod` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source code |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Apply database migrations |
| `npx prisma migrate deploy` | Apply production migrations |
| `npx prisma studio` | Open Prisma Studio |
| `docker compose up -d` | Start Docker services |
| `docker compose down` | Stop Docker services |

---

# 🏗️ Part 3 — Project Architecture

This project follows a modular and layered architecture inspired by enterprise integration platforms. Each module has a single responsibility, making the application easier to maintain, extend, and test.

The primary goal is to simulate a production-ready Oracle Fusion Integration Platform using NestJS while following clean architecture principles.

---

# High Level Architecture

```text
                        +----------------------+
                        |   Oracle Fusion ERP  |
                        |   (REST API / Mock)  |
                        +----------+-----------+
                                   |
                                   |
                          Oracle Client Module
                                   |
                    Authentication / HTTP Client
                                   |
        +--------------------------+-------------------------+
        |                          |                         |
        |                          |                         |
 Employees Module          Departments Module       Suppliers Module
        |                          |                         |
        +-------------+------------+-------------------------+
                      |
              Synchronization Module
                      |
             Business Logic & Mapping
                      |
                 Prisma ORM Layer
                      |
                  PostgreSQL
                      |
                 Swagger / REST API
```

---

# Request Flow

A typical request follows the sequence below.

```text
Client
   │
   ▼
Controller
   │
Validation Pipe
   │
Service
   │
Repository / Oracle Client
   │
Business Logic
   │
Prisma ORM
   │
PostgreSQL
   │
JSON Response
```

---

# Project Structure

```
src
│
├── app.module.ts
│
├── common
│   ├── constants
│   ├── decorators
│   ├── dto
│   ├── enums
│   ├── exceptions
│   ├── filters
│   ├── interceptors
│   ├── interfaces
│   ├── pipes
│   └── utils
│
├── config
│
├── database
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── modules
│   ├── auth
│   ├── oracle
│   ├── employees
│   ├── departments
│   ├── suppliers
│   ├── synchronization
│   ├── health
│   └── system
│
└── mocks
    ├── workers.json
    ├── departments.json
    └── suppliers.json
```

---

# Module Responsibilities

## Oracle Module

Responsible for communicating with Oracle Fusion REST API.

Responsibilities:

- Authentication
- HTTP Client
- Oracle URL Builder
- Oracle Error Mapping
- HTTP Logging
- Retry Strategy
- Mock Mode

---

## Employees Module

Responsible for employee operations.

Responsibilities

- Retrieve employees
- Search employees
- Pagination
- Employee mapping
- Oracle DTO transformation

---

## Departments Module

Responsible for department information.

Responsibilities

- Department listing
- Department detail
- Organization mapping
- Pagination

---

## Suppliers Module

Responsible for supplier master data.

Responsibilities

- Supplier retrieval
- Supplier mapping
- Oracle supplier transformation

---

## Synchronization Module

Responsible for synchronizing Oracle Fusion data into PostgreSQL.

Responsibilities

- Synchronization coordinator
- Incremental synchronization
- Full synchronization
- Retry mechanism
- Synchronization logging

---

## Health Module

Provides application health information.

Endpoints

```
GET /health
```

Used by:

- Docker
- Kubernetes
- Monitoring tools

---

## System Module

Provides internal system information.

Examples

- Version
- Environment
- Build Information

---

# Layered Architecture

```
Controller Layer
        │
        ▼
Service Layer
        │
        ▼
Provider Layer
        │
        ▼
Oracle Client
        │
        ▼
Prisma Repository
        │
        ▼
PostgreSQL
```

Each layer only communicates with the layer directly below it.

---

# Dependency Injection

NestJS Dependency Injection keeps modules loosely coupled.

Example

```
Controller
    │
    ▼
EmployeesService
    │
    ▼
OracleEmployeeProvider
    │
    ▼
OracleClientService
```

Benefits

- Easier testing
- Mockable services
- Better maintainability

---

# Database Architecture

```
Oracle Fusion

     │
     │ Synchronization
     ▼

PostgreSQL

 ├── employees
 ├── departments
 ├── suppliers
 ├── sync_jobs
 └── sync_logs
```

Oracle Fusion remains the source of truth.

PostgreSQL is used for

- caching
- reporting
- API responses
- local searching

---

# Data Synchronization Strategy

```
Oracle Fusion

      │

      ▼

 Fetch REST API

      │

      ▼

Validate

      │

      ▼

Transform DTO

      │

      ▼

Save PostgreSQL

      │

      ▼

Return Summary
```

Future synchronization will support

- Full Sync
- Incremental Sync
- Scheduler
- Retry Queue

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Runtime | Node.js |
| Framework | NestJS |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| API Documentation | Swagger |
| Container | Docker |
| Authentication | Basic Authentication (Mock) |
| Future Authentication | OAuth2 |
| Logging | NestJS Logger |
| Validation | class-validator |
| Transformation | class-transformer |

---

# Design Principles

This project follows several software engineering principles.

## Single Responsibility Principle

Each module has one responsibility.

Example

```
Employees Module

Only handles employee logic.
```

---

## Dependency Injection

Business logic never creates dependencies manually.

Everything is injected by NestJS.

---

## Separation of Concerns

Business logic

≠

HTTP communication

≠

Database

≠

DTO Mapping

---

## Open / Closed Principle

Future Oracle entities can be added without changing existing modules.

Example

```
Projects Module

Invoices Module

Purchase Orders Module

Customers Module
```

---

# Current Architecture Status

| Feature | Status |
|----------|--------|
| Modular Architecture | ✅ |
| Oracle Client | ✅ |
| Oracle Authentication | ✅ |
| Employee Module | ✅ |
| Department Module | ✅ |
| Supplier Module | ✅ |
| Synchronization Module | ✅ |
| PostgreSQL | ✅ |
| Prisma ORM | ✅ |
| Swagger | ✅ |
| Mock Oracle API | ✅ |
| Incremental Synchronization | 🚧 |
| Scheduler | 🚧 |
| Dashboard | 📅 Planned |

---

---

# 🔄 Part 4 — Oracle Fusion Integration

## Overview

The Oracle module is the heart of this project.

It is responsible for communicating with Oracle Fusion ERP using Oracle REST APIs while abstracting authentication, request handling, error mapping, logging, and data transformation from the business modules.

The current implementation uses **Mock Mode** to simulate Oracle Fusion responses during development.

This design allows the application to switch to a real Oracle Fusion Cloud environment with minimal code changes.

---

# Oracle Integration Architecture

```text
                        Oracle Fusion Cloud
                               │
                     REST API / OAuth2
                               │
                      OracleClientService
                               │
                 Oracle Authentication Layer
                               │
                    HTTP Request / Response
                               │
                DTO Transformation & Mapping
                               │
        +----------------------+----------------------+
        |                      |                      |
 Employees Module     Departments Module     Suppliers Module
        |                      |                      |
        +----------- Synchronization Module ---------+
                               │
                               ▼
                          PostgreSQL
```

---

# Integration Philosophy

This project follows an **adapter pattern**.

Business modules never communicate directly with Oracle Fusion.

Instead, every module depends on an abstraction.

```text
Controller
      │
Service
      │
Provider Interface
      │
Oracle Provider
      │
Oracle Client
      │
Oracle Fusion REST API
```

Benefits:

- Loose coupling
- Easier testing
- Mock support
- Easy migration
- Future multi-provider support

---

# Oracle Client

The Oracle Client centralizes every HTTP communication.

Responsibilities

- Build endpoint URL
- Send HTTP requests
- Add authentication headers
- Handle timeout
- Retry failed requests
- Parse Oracle responses
- Map Oracle errors
- Produce application exceptions

Business modules never use Axios directly.

---

# Authentication

Current implementation uses:

```
Basic Authentication
```

Example request

```
Authorization: Basic xxxxxxxxxxxxx
```

Credentials are loaded from environment variables.

```
ORACLE_BASE_URL

ORACLE_USERNAME

ORACLE_PASSWORD
```

---

# Production Authentication

Oracle Fusion Cloud typically uses OAuth2.

Future implementation

```
Client ID

Client Secret

Access Token

Refresh Token
```

The application architecture already separates authentication from business logic, making OAuth2 migration straightforward.

---

# Oracle REST API

Current modules communicate with Oracle REST endpoints similar to:

| Module | Oracle Endpoint |
|---------|-----------------|
| Employees | `/hcmRestApi/resources/latest/workers` |
| Departments | `/hcmRestApi/resources/latest/departments` |
| Suppliers | `/fscmRestApi/resources/latest/suppliers` |

Actual endpoint paths may vary depending on Oracle Fusion configuration.

---

# Oracle Response Mapping

Oracle responses are transformed before reaching business logic.

Example

Oracle Response

```json
{
  "PersonId": 300100190123456,
  "PersonNumber": "100001",
  "DisplayName": "John Doe"
}
```

↓

Application DTO

```typescript
{
  id: "...",
  oracleId: "...",
  employeeNumber: "...",
  displayName: "John Doe"
}
```

Benefits

- Stable internal API
- Oracle-independent business layer
- Easier testing

---

# Mock Mode

Current development environment uses:

```
Mock Oracle Data
```

Located in

```
src/mocks/
```

Example

```
workers.json

departments.json

suppliers.json
```

Advantages

- No Oracle subscription required
- Faster development
- Offline development
- Predictable testing

---

# Environment Modes

Development

```
Mock JSON
```

Testing

```
Mock JSON
```

Production

```
Oracle Fusion Cloud
```

Switching environments should require configuration changes only.

---

# Synchronization Flow

Current synchronization process

```text
Oracle (Mock)

      │

      ▼

Oracle Client

      │

      ▼

Receive JSON

      │

      ▼

Validate

      │

      ▼

Transform DTO

      │

      ▼

Persist PostgreSQL

      │

      ▼

Return Summary
```

---

# Synchronization Lifecycle

```text
Start

↓

Call Oracle API

↓

Receive Data

↓

Validate

↓

Map DTO

↓

Save Database

↓

Generate Summary

↓

Finish
```

Future versions will support:

- Incremental Synchronization
- Batch Synchronization
- Scheduled Synchronization
- Retry Queue
- Dead Letter Queue

---

# Data Transformation

Every Oracle object passes through a mapper.

Example

```text
Oracle DTO

↓

Mapper

↓

Application DTO

↓

Prisma Entity

↓

Database
```

This isolates Oracle-specific structures from the application domain.

---

# Error Handling

The Oracle layer converts HTTP failures into application-friendly exceptions.

Examples

| Oracle Status | Application Response |
|---------------|----------------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 408 | Request Timeout |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

The application avoids exposing raw Oracle error messages to API consumers.

---

# Retry Strategy

Current

- Manual retry

Planned

- Exponential Backoff
- Retry Queue
- Circuit Breaker
- Failure Threshold

---

# Logging Strategy

Every Oracle request should produce structured logs.

Example

```text
Request URL

HTTP Method

Execution Time

Status Code

Response Size

Correlation ID
```

Future improvements

- JSON Logging
- ELK Stack
- Grafana
- Prometheus

---

# Timeout Strategy

Long-running Oracle requests should be terminated after a configurable timeout.

Example

```
HTTP Timeout

30 seconds
```

Future implementation

```
Configurable timeout

Per endpoint timeout

Retry after timeout
```

---

# Security Considerations

Credentials are never hardcoded.

Environment variables are used instead.

Sensitive values include:

- Oracle Username
- Oracle Password
- Client Secret
- Access Token

These values should never be committed to source control.

---

# Oracle Integration Roadmap

| Feature | Status |
|----------|--------|
| Oracle Client | ✅ |
| Authentication Layer | ✅ |
| Mock Data | ✅ |
| Employee Integration | ✅ |
| Department Integration | ✅ |
| Supplier Integration | ✅ |
| DTO Mapping | ✅ |
| Error Mapping | ✅ |
| Logging | ✅ |
| Full Synchronization | 🚧 |
| Incremental Synchronization | 🚧 |
| Scheduler | 🚧 |
| OAuth2 Authentication | 📅 Planned |
| Oracle Cloud Production | 📅 Planned |

---

# Production Migration Plan

The transition from Mock Mode to Oracle Fusion Cloud is designed to require minimal changes.

Migration checklist:

- Configure Oracle Cloud URL
- Configure OAuth2 credentials
- Replace mock providers with Oracle providers
- Enable scheduler
- Configure monitoring
- Configure retry strategy
- Enable production logging

No changes should be required in business modules.

---

# Integration Design Goals

This architecture was designed with the following objectives:

- Maintainability
- Extensibility
- Testability
- Loose Coupling
- Enterprise Readiness
- Oracle Fusion Compatibility
- Production Scalability

---

---

# 🌐 Part 5 — REST API Documentation

## API Overview

The Oracle Fusion Integration Platform exposes a RESTful API that enables external applications to retrieve master data, monitor synchronization status, and trigger synchronization processes.

The API follows REST principles and returns JSON responses.

Current modules include:

| Module | Status |
|---------|--------|
| Employees | ✅ |
| Departments | ✅ |
| Suppliers | ✅ |
| Synchronization | ✅ |
| Synchronization Monitoring | ✅ |
| Health | ✅ |
| System | ✅ |

---

# API Base URL

Development

```text
http://localhost:3000
```

Swagger UI

```text
http://localhost:3000/api
```

OpenAPI Specification

```text
http://localhost:3000/api-json
```

---

# Response Format

Every endpoint returns JSON.

Successful example

```json
{
    "data": [],
    "message": "Success"
}
```

Resource example

```json
{
    "id": "2f82e7af-2e08-4b8d-a93b-63c7c4ef8d67",
    "oracleId": "300100001234567",
    "displayName": "John Doe"
}
```

---

# Authentication

Current implementation

```
No API Authentication
```

Oracle authentication is handled internally by the Oracle Client module using configured credentials.

Future versions will support

- JWT
- OAuth2
- API Key
- Role-Based Authorization

---

# Content Type

```
Content-Type: application/json
```

---

# HTTP Methods

| Method | Description |
|---------|-------------|
| GET | Retrieve data |
| POST | Trigger synchronization |

---

# HTTP Status Codes

| Status | Meaning |
|---------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 408 | Request Timeout |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

# Swagger Documentation

Swagger is enabled by default.

Open

```
http://localhost:3000/api
```

Features

- Interactive API Explorer
- Request Validation
- DTO Documentation
- Example Payload
- Response Models

---

# Employees API

Base Route

```
/employees
```

## Get All Employees

```
GET /employees
```

Description

Returns employee records from the Oracle provider (currently Mock Mode).

Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | Maximum records |
| offset | number | Pagination offset |
| search | string | Search employee |

Example

```http
GET /employees?limit=20&offset=0
```

cURL

```bash
curl http://localhost:3000/employees
```

Response

```json
[
  {
    "id": "...",
    "employeeNumber": "100001",
    "displayName": "John Doe"
  }
]
```

---

## Get Employee by ID

```
GET /employees/{id}
```

Example

```http
GET /employees/100001
```

cURL

```bash
curl http://localhost:3000/employees/100001
```

Response

```json
{
    "id":"...",
    "employeeNumber":"100001",
    "displayName":"John Doe"
}
```

---

# Departments API

Base Route

```
/departments
```

## Get All Departments

```
GET /departments
```

Description

Returns department master data.

Example

```http
GET /departments
```

cURL

```bash
curl http://localhost:3000/departments
```

Response

```json
[
    {
        "id":"...",
        "code":"IT",
        "name":"Information Technology"
    }
]
```

---

## Get Department Detail

```
GET /departments/{id}
```

Example

```http
GET /departments/300
```

Response

```json
{
    "id":"...",
    "code":"IT",
    "name":"Information Technology"
}
```

---

# Suppliers API

Base Route

```
/suppliers
```

## Get All Suppliers

```
GET /suppliers
```

Description

Returns supplier master data synchronized from Oracle.

Example

```http
GET /suppliers
```

cURL

```bash
curl http://localhost:3000/suppliers
```

Response

```json
[
    {
        "id":"...",
        "supplierNumber":"SUP001",
        "supplierName":"PT ABC"
    }
]
```

---

## Get Supplier Detail

```
GET /suppliers/{id}
```

Example

```http
GET /suppliers/2f82e7af-2e08-4b8d-a93b-63c7c4ef8d67
```

Response

```json
{
    "id":"...",
    "supplierNumber":"SUP001",
    "supplierName":"PT ABC"
}
```

---

# Synchronization API

The Synchronization API is responsible for synchronizing Oracle Fusion master data into the local PostgreSQL database.

Synchronization is coordinated by the **SyncCoordinatorService**, which orchestrates each synchronization task sequentially to ensure data consistency.

Current implementation supports:

| Entity | Endpoint | Status |
|---------|----------|--------|
| Employees | POST /sync/employees | ✅ |
| Departments | POST /sync/departments | ✅ |
| Suppliers | POST /sync/suppliers | ✅ |
| All Master Data | POST /sync/all | ✅ |

---

# Synchronization Workflow

```text
                    Client

                      │

                      ▼

          POST /sync/employees

                      │

                      ▼

          SyncCoordinatorService

                      │

                      ▼

         OracleEmployeeProvider

                      │

                      ▼

          OracleClientService

                      │

                      ▼

             Oracle Fusion
             (Mock JSON)

                      │

                      ▼

             Employee Mapper

                      │

                      ▼

               Repository

                      │

                      ▼

               PostgreSQL

                      │

                      ▼

          Synchronization Result
```

---

# Synchronize Employees

```
POST /sync/employees
```

Description

Synchronizes employee master data from Oracle Fusion into PostgreSQL.

Current Source

```
Mock Oracle Data
```

Future Source

```
Oracle Fusion REST API
```

Example

```http
POST /sync/employees
```

cURL

```bash
curl -X POST http://localhost:3000/sync/employees
```

Example Response

```json
{
    "entity": "Employee",
    "processed": 150,
    "inserted": 145,
    "updated": 5,
    "failed": 0,
    "duration": 3120
}
```

---

# Synchronize Departments

```
POST /sync/departments
```

Description

Synchronizes department master data.

Example

```http
POST /sync/departments
```

cURL

```bash
curl -X POST http://localhost:3000/sync/departments
```

Example Response

```json
{
    "entity":"Department",
    "processed":20,
    "inserted":20,
    "updated":0,
    "failed":0
}
```

---

# Synchronize Suppliers

```
POST /sync/suppliers
```

Description

Synchronizes supplier master data.

Example

```http
POST /sync/suppliers
```

cURL

```bash
curl -X POST http://localhost:3000/sync/suppliers
```

Example Response

```json
{
    "entity":"Supplier",
    "processed":300,
    "inserted":297,
    "updated":3,
    "failed":0
}
```

---

# Synchronize All Entities

```
POST /sync/all
```

Description

Executes synchronization sequentially for every supported Oracle Fusion entity.

Execution order

1. Employees
2. Departments
3. Suppliers

Example

```http
POST /sync/all
```

cURL

```bash
curl -X POST http://localhost:3000/sync/all
```

Example Response

```json
{
    "status":"completed",
    "entities":[
        "Employees",
        "Departments",
        "Suppliers"
    ],
    "duration":8125
}
```

---

# Synchronization Monitoring API

Synchronization Monitoring provides visibility into synchronization jobs and their execution history.

Current endpoints

| Endpoint | Description |
|----------|-------------|
| GET /sync/status | Current synchronization status |
| GET /sync/history | Synchronization history |
| GET /sync/history/{entity} | History by entity |
| GET /sync/running | Running jobs |

---

# Get Synchronization Status

```
GET /sync/status
```

Description

Returns the latest synchronization status.

Example

```http
GET /sync/status
```

Example Response

```json
{
    "status":"IDLE",
    "lastSync":"2026-08-02T09:30:00Z",
    "lastEntity":"Supplier"
}
```

Possible Status Values

| Status |
|---------|
| IDLE |
| RUNNING |
| COMPLETED |
| FAILED |

---

# Get Synchronization History

```
GET /sync/history
```

Description

Returns historical synchronization executions.

Example

```http
GET /sync/history
```

Example Response

```json
[
    {
        "entity":"Employee",
        "status":"SUCCESS",
        "processed":150,
        "duration":3150
    },
    {
        "entity":"Department",
        "status":"SUCCESS",
        "processed":20,
        "duration":950
    }
]
```

---

# Get Synchronization History by Entity

```
GET /sync/history/{entity}
```

Example

```http
GET /sync/history/Employee
```

cURL

```bash
curl http://localhost:3000/sync/history/Employee
```

Example Response

```json
[
    {
        "entity":"Employee",
        "status":"SUCCESS",
        "processed":150
    }
]
```

---

# Get Running Jobs

```
GET /sync/running
```

Description

Returns currently executing synchronization jobs.

Example

```http
GET /sync/running
```

Example Response

```json
[
    {
        "entity":"Supplier",
        "startedAt":"2026-08-02T09:00:00Z",
        "progress":"65%"
    }
]
```

If no synchronization is currently running:

```json
[]
```

---

# Synchronization Design Principles

The synchronization module follows these principles:

- Oracle Fusion is the source of truth.
- Synchronization is idempotent.
- Business modules never communicate directly with Oracle.
- DTO mapping isolates Oracle-specific structures.
- Synchronization is coordinated through a single service.
- Monitoring endpoints are read-only.
- Synchronization endpoints are explicitly triggered via POST requests.

---

# Planned Enhancements

The current implementation provides a solid foundation for enterprise synchronization. Future improvements include:

- Incremental synchronization using last successful sync timestamp
- Scheduled synchronization using Cron
- Batch processing for large datasets
- Retry mechanism with exponential backoff
- Dead Letter Queue (DLQ)
- Distributed job execution
- Parallel synchronization for independent entities
- Metrics integration with Prometheus
- Dashboard visualization using Grafana
- Audit trail for synchronization events

---

# Health API

The Health API provides operational endpoints used to verify the availability of the application and its external dependencies.

These endpoints are useful for:

- Docker health checks
- Kubernetes liveness and readiness probes
- Monitoring systems
- Load balancers
- Production diagnostics

---

## Base Route

```
/health
```

---

## Application Health

```
GET /health
```

Description

Returns the overall application health status.

Example

```http
GET /health
```

cURL

```bash
curl http://localhost:3000/health
```

Example Response

```json
{
    "status":"UP",
    "service":"oracle-fusion-integration-platform",
    "timestamp":"2026-08-02T10:20:35Z"
}
```

---

## Database Health

```
GET /health/database
```

Description

Checks PostgreSQL connectivity.

Example

```http
GET /health/database
```

Example Response

```json
{
    "database":"UP",
    "provider":"PostgreSQL"
}
```

---

## Oracle Health

```
GET /health/oracle
```

Description

Checks Oracle provider availability.

Current Mode

```
Mock Oracle
```

Future Mode

```
Oracle Fusion Cloud
```

Example

```http
GET /health/oracle
```

Example Response

```json
{
    "oracle":"UP",
    "mode":"Mock"
}
```

---

# System API

The System module provides information about the running application.

These endpoints are primarily intended for administrators and operational monitoring.

---

## Base Route

```
/system
```

---

## Application Information

```
GET /system/info
```

Description

Returns general information about the application.

Example

```http
GET /system/info
```

Example Response

```json
{
    "application":"Oracle Fusion Integration Platform",
    "version":"1.0.0",
    "environment":"development"
}
```

---

## Oracle Connection Test

```
GET /system/oracle/ping
```

Description

Tests connectivity to the configured Oracle provider.

Current implementation validates the configured Oracle client.

Future implementation will verify connectivity against Oracle Fusion Cloud.

Example

```http
GET /system/oracle/ping
```

Example Response

```json
{
    "oracle":"reachable"
}
```

---

# Pagination

Employee endpoints support pagination through query parameters.

Example

```
GET /employees?limit=20&offset=0
```

| Parameter | Description |
|------------|-------------|
| limit | Maximum number of returned records |
| offset | Starting position |
| search | Search employee |

Example

```http
GET /employees?limit=10&offset=20&search=john
```

---

# Response Convention

REST endpoints should return JSON.

Successful Response

```json
{
    "data": [],
    "message": "Success"
}
```

Resource Response

```json
{
    "id":"...",
    "displayName":"John Doe"
}
```

Collection Response

```json
[
    {
        "id":"..."
    }
]
```

---

# Error Handling

The application converts internal exceptions into HTTP responses.

Common Status Codes

| Status | Description |
|---------|-------------|
| 200 | Success |
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 408 | Request Timeout |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

Example

```json
{
    "statusCode":404,
    "message":"Employee not found"
}
```

The exact error payload depends on the configured global exception filter.

---

# Validation

Incoming requests are validated using:

- ValidationPipe
- class-validator
- class-transformer

Validation is applied before reaching the service layer.

---

# API Versioning

Current version

```
v1
```

Future versions may introduce URI or header-based versioning while maintaining backward compatibility.

---

# OpenAPI / Swagger

Swagger is enabled automatically.

```
http://localhost:3000/api
```

OpenAPI JSON

```
http://localhost:3000/api-json
```

Swagger includes

- DTO schemas
- Parameters
- Response models
- Example values
- Endpoint descriptions

---

# Best Practices

The following practices are recommended when consuming this API:

- Use Swagger to explore available endpoints.
- Treat Oracle Fusion as the source of truth.
- Use synchronization endpoints instead of writing directly to local tables.
- Monitor synchronization status before triggering consecutive jobs.
- Validate responses before processing downstream.
- Protect production endpoints with authentication when exposed publicly.
- Store Oracle credentials in environment variables.
- Never commit secrets to source control.

---

# Security Notes

Current development environment uses mock Oracle data.

Before deploying to production:

- Replace mock providers with Oracle Fusion REST integration.
- Configure OAuth2 (or the organization's authentication mechanism).
- Enable HTTPS.
- Restrict access to operational endpoints.
- Rotate credentials regularly.
- Enable structured logging and centralized monitoring.

---

---

# 🚀 Part 6 — Roadmap & Future Development

## Project Status

The Oracle Fusion Integration Platform is under active development.

The current implementation focuses on establishing a robust integration architecture using NestJS, Prisma, and PostgreSQL while simulating Oracle Fusion Cloud through mock data.

The long-term goal is to evolve this project into a production-ready Oracle Fusion Integration Platform capable of synchronizing enterprise master data securely and efficiently.

---

# Development Roadmap

## Phase 1 — Foundation

Completed

- [x] NestJS project setup
- [x] Docker development environment
- [x] PostgreSQL integration
- [x] Prisma ORM
- [x] Environment configuration
- [x] Global validation pipe
- [x] Exception handling
- [x] Swagger / OpenAPI
- [x] Modular architecture
- [x] Repository pattern
- [x] Provider pattern
- [x] Mapper pattern

---

## Phase 2 — Oracle Integration

Completed

- [x] Oracle Client
- [x] Oracle Authentication Layer (Basic Authentication)
- [x] Oracle Query Builder
- [x] Oracle Pagination Helper
- [x] Oracle HTTP Logger
- [x] Oracle DTO Mapping
- [x] Mock Oracle Provider
- [x] Employee Integration
- [x] Department Integration
- [x] Supplier Integration

---

## Phase 3 — Synchronization

Current Status

- [x] Synchronization Coordinator
- [x] Employee Synchronization
- [x] Department Synchronization
- [x] Supplier Synchronization
- [x] Synchronize All Endpoint
- [x] Synchronization Monitoring API
- [x] Scheduler Structure
- [ ] Incremental Synchronization Persistence
- [ ] Synchronization Retry Strategy
- [ ] Synchronization Locking
- [ ] Batch Processing

---

## Phase 4 — Monitoring & Observability

In Progress

- [x] Health API
- [x] Database Health Check
- [x] Oracle Provider Health Check
- [x] System Information API
- [ ] Structured JSON Logging
- [ ] Prometheus Metrics
- [ ] Grafana Dashboard
- [ ] Distributed Tracing
- [ ] Alerting

---

## Phase 5 — Production Readiness

Planned

- [ ] OAuth2 Authentication
- [ ] Oracle Fusion Cloud Integration
- [ ] HTTPS Configuration
- [ ] Rate Limiting
- [ ] Request Correlation ID
- [ ] Circuit Breaker
- [ ] Retry with Exponential Backoff
- [ ] Secrets Management
- [ ] Production Docker Image
- [ ] CI/CD Pipeline

---

## Phase 6 — Business Modules

Current

- [x] Employees
- [x] Departments
- [x] Suppliers

Planned

- [ ] Purchase Orders
- [ ] Requisitions
- [ ] Invoices
- [ ] Inventory
- [ ] Customers
- [ ] Projects
- [ ] Assets
- [ ] Business Units
- [ ] Cost Centers

---

# Architecture Evolution

Current

```text
Oracle Mock JSON

        │

        ▼

Oracle Client

        │

        ▼

Business Module

        │

        ▼

Prisma ORM

        │

        ▼

PostgreSQL
```

Target

```text
Oracle Fusion Cloud

        │

 OAuth2 Authentication

        │

Oracle REST API

        │

Retry Layer

        │

Circuit Breaker

        │

Synchronization Engine

        │

Prisma ORM

        │

PostgreSQL

        │

Monitoring Dashboard
```

---

# Future Improvements

The following improvements are planned for future releases.

## Performance

- Incremental synchronization
- Parallel synchronization
- Bulk database operations
- Query optimization
- Connection pooling
- Distributed scheduler

---

## Reliability

- Retry Queue
- Dead Letter Queue
- Synchronization Lock
- Failure Recovery
- Idempotent Synchronization

---

## Security

- OAuth2
- JWT
- Role-Based Access Control (RBAC)
- Secret Rotation
- Audit Logging

---

## Monitoring

- Prometheus
- Grafana
- ELK Stack
- OpenTelemetry
- Centralized Logging

---

## Testing

- Unit Testing
- Integration Testing
- End-to-End Testing
- Mock Oracle Testing
- Performance Testing

---

# Contributing

Contributions are welcome.

Recommended workflow

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit using Conventional Commits

```text
feat(sync): add incremental synchronization

fix(oracle): improve error handling

docs(readme): update architecture documentation
```

4. Push your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# Coding Standards

This project follows:

- TypeScript Best Practices
- NestJS Style Guide
- SOLID Principles
- Clean Architecture
- Conventional Commits
- ESLint
- Prettier

---

# License

This project is licensed under the MIT License.

See the `LICENSE` file for additional details.

---

# Author

**Fauzi Rahman**

Oracle Fusion Integration Developer Portfolio

Built with:

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Swagger
- Oracle Fusion REST API (Mock Mode)

---

# Acknowledgements

Special thanks to the open-source community and the technologies that made this project possible.

- NestJS
- Prisma
- PostgreSQL
- Docker
- Swagger / OpenAPI

---

# Support

If you encounter issues or have suggestions, please open an issue in the project repository.

Feature requests, bug reports, and pull requests are welcome.

---

## ⭐ Project Vision

This project aims to demonstrate how an enterprise-grade Oracle Fusion Integration Platform can be built using modern backend technologies and clean architectural practices.

The roadmap focuses on progressing from a development-friendly mock environment to a production-ready integration platform with secure authentication, scalable synchronization, observability, and operational resilience.

---
