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