# FinGuard API

Backend API for **FinGuard**, a financial resilience platform that analyzes a user's financial position, forecasts potential shortfalls, assesses financial risk, and provides actionable recommendations.

Financial data is sourced primarily from **CRC Credit Bureau Nigeria** and normalized before being processed by FinGuard's financial engine.

## Introduction

The FinGuard API is responsible for:

- User authentication and consent
- CRC financial-data integration and synchronization
- Financial profiles, debts, and expenses
- Financial assessment and DTI calculation
- Cashflow and shortfall forecasting
- Financial risk assessment
- Recommendations and risk alerts
- Dashboard data aggregation

CRC-specific logic is isolated behind a dedicated integration layer so that the core financial engine remains independent of the external data provider.

## Project Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **API:** REST
- **Database:** PostgreSQL
- **ORM:** TBD
- **Validation:** TBD
- **Authentication:** TBD
- **External Data Provider:** CRC Credit Bureau Nigeria
- **Testing:** TBD

> Some implementation choices are intentionally left open and will be finalized during development.

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd finguard-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Update `.env` with the required database, authentication, and CRC configuration.

### 4. Run the development server

```bash
npm run dev
```

## Node.js Module Structure

```text
src/
├── modules/
│   ├── auth/
│   ├── consent/
│   ├── users/
│   ├── financial-data/
│   │   ├── crc/
│   │   ├── normalization/
│   │   └── sync/
│   ├── financial-profile/
│   ├── debts/
│   ├── expenses/
│   ├── assessment/
│   ├── forecast/
│   ├── risk/
│   ├── recommendations/
│   ├── alerts/
│   └── dashboard/
│
└── common/
    ├── auth/
    ├── errors/
    ├── logging/
    ├── validation/
    └── database/
```

## Architecture Principle

The application should follow this flow:

```text
CRC Credit Bureau
        ↓
CRC Integration
        ↓
Data Normalization
        ↓
Financial Engine
        ↓
Assessment / Forecast / Risk
        ↓
Recommendations / Alerts / Dashboard
```

CRC-specific responses should **not** be used directly throughout the application. They should first be transformed into FinGuard's internal financial data models.

## API Versioning

All API endpoints are currently versioned under:

```text
/v1
```

Example:

```text
GET /v1/dashboard
GET /v1/financial-position
GET /v1/financial-risk
```

## Development Status

🚧 **MVP — In Development**

The API specification is based on the FinGuard PRD and the current architectural decision to use CRC Credit Bureau Nigeria as the financial-data source.

---

## Live Site

[View FinGuard-API](https://render.app/)

## API Documentation:

https://documenter.getpostman.com/view/2449601/2sBYAsyCFz

## Live Url

https://finguard-api-n71k.onrender.com/

---

### **Endpoint Assignments:**

| Endpoint | Backend Engineer |
| -------- | ---------------- |
| Auth     | Dev              |
| Auth     | Dev              |
| Auth     | Dev              |

---

## ✅ **Branch Protection Rules**

The `main` branch is protected by a GitHub ruleset to ensure all changes are reviewed before they are merged.

### Ruleset Configuration

| Setting                                   | Configuration |
| ----------------------------------------- | ------------- |
| **Enforcement status**                    | Active        |
| **Target branch**                         | `main`        |
| **Bypass list**                           | Empty         |
| **Require a pull request before merging** | Enabled       |
| **Required approvals**                    | 1             |
| **Dismiss stale pull request approvals**  | Enabled       |
| **Require review from Code Owners**       | Enabled       |
| **Require status checks to pass**         | Disabled      |
| **Block force pushes**                    | Enabled       |

### Code Ownership

The repository uses a `CODEOWNERS` file to designate the code owner:

```text
.github/CODEOWNERS
```

Current configuration:

```text
* @kachi-jasperD
```

This means `@kachi-jasperD` is the Code Owner for all files in the repository.

### Contribution Workflow

All changes to `main` must follow this workflow:

1. Contributor creates a new branch.
2. Contributor pushes their changes to the branch.
3. Contributor opens a Pull Request targeting `main`.
4. Other contributors may review the Pull Request.
5. The Code Owner (`@kachi-jasperD`) must approve the Pull Request.
6. Once the required approval is received, the Pull Request can be merged.
7. Direct changes to `main` are not permitted.

### Summary

> **No direct pushes to `main`. All changes require a Pull Request and Code Owner approval before merging.**

---

✅ **Pull Request.**

**\*\***we will show proof of PRs here

---

✅ **Network Graph.**

**\*\***we will show proof of team contribution here

---

# Retrospective: Collaboration Issues Identified

This document outlines key collaboration issues identified during recent retrospectives to enhance workflow and code quality.

---

1. **Editing Other Developers' Code Without Communication:**
   - Before modifying someone else's code, reach out to the original developer to discuss the changes.
   - Understand the context and potential impact of the existing implementation.
   - Provide visibility into planned changes and allow for feedback to prevent conflicts or unintended consequences.

2. **Insufficient Testing Before Raising PRs:**
   - Prior to raising a Pull Request (PR), thoroughly test your changes:
     - Ensure that your fix resolves the intended issue without causing new defects.
     - Test the responsiveness and cross-browser compatibility of the application, not just the specific area affected by your changes.
     - Conduct regression testing to confirm that unrelated features are not impacted.

3. **Not Syncing with Main Before Pushing to Main:**
   - Before pushing your changes to the main branch, always pull the latest updates from the main branch.
   - Resolve any merge conflicts locally and retest to ensure the integrity of the codebase.

---

Implementing these guidelines will help maintain code quality, foster better collaboration, and minimize potential conflicts during development.

##

                    POST /api/analyses
                            │
                            ▼
                    Authenticate user
                            │
                            ▼
                 Find financial profile
                            │
                            ▼
                    Find user's debts
                            │
                            ▼
              Calculate financial metrics
                    ┌───────┴───────┐
                    ▼               ▼
                  DTI             Buffer
                    │               │
                    └───────┬───────┘
                            ▼
                     Financial Context
                            │
                            ▼
                     OpenAI / AI model
                            │
                            ▼
                   Generate feedback
                            │
                            ▼
                   Save Analysis to MongoDB
                            │
                            ▼
                         201 Created

---

Postman
↓
POST /api/analyses
↓
requireAuth ✅
↓
Find financial profile ✅
↓
Find debts ✅
↓
Calculate DTI/buffer ✅
↓
generateAnalysis() ✅
↓
OpenAI API ✅
