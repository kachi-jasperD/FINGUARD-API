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