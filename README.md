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