# FinGuard API

Backend REST API for **FinGuard**, a financial resilience platform that helps users understand their financial position, manage debts and financial profiles, and receive AI-powered financial analysis and recommendations.

The API handles user authentication, financial profiles, debts, financial analysis, validation, file uploads, database operations, and integration with external services such as OpenAI and Cloudinary.

---

## Introduction

The FinGuard API is responsible for:

- User authentication and authorization
- User management
- Financial profile management
- Debt management
- Financial analysis
- Financial metric calculations
- Debt-to-income (DTI) and financial buffer calculations
- AI-powered financial feedback
- Analysis persistence
- Request validation
- Error handling
- Logging
- File uploads
- Database communication

The application follows a layered backend architecture where:

- **Routes** define API endpoints.
- **Controllers** handle HTTP requests and responses.
- **Models** define and interact with database entities.
- **Services** contain reusable business logic.
- **Middlewares** handle authentication, validation, errors, logging, and uploads.
- **Configuration** contains database and external-service setup.
- **Schemas** define validation structures.

---

## Project Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **API:** REST API
- **Database:** MongoDB
- **Database ODM:** Mongoose
- **Authentication:** JWT-based authentication
- **AI Integration:** OpenAI API
- **File Storage:** Cloudinary
- **Validation:** Custom validation/schema layer
- **Testing:** In development
- **API Testing/Documentation:** Postman

---

## Project Structure

```text
finguard-api/
│
├── src/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── connectDB.js
│   │   ├── envValidation.js
│   │   └── openAI.js
│   │
│   ├── controllers/
│   │   ├── analysisController.js
│   │   ├── debtController.js
│   │   ├── financialProfileController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── requireAuth.js
│   │   ├── upload.js
│   │   └── validator.js
│   │
│   ├── models/
│   │   ├── analysisModel.js
│   │   ├── debtModel.js
│   │   ├── financialProfileModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── analysisRoute.js
│   │   ├── debtRoute.js
│   │   ├── financialProfileRoute.js
│   │   └── userRoute.js
│   │
│   ├── schemas/
│   │   └── schema.js
│   │
│   ├── services/
│   │   ├── analysisService.js
│   │   └── mockAnalysisService.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── readMe.md
└── server.js
```

---

## Architecture

FinGuard follows a layered REST API architecture:

```text
                    Client / Postman
                           │
                           ▼
                       API Routes
                           │
                           ▼
                      Middleware
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        Authentication  Validation    Uploads
              │            │            │
              └────────────┼────────────┘
                           ▼
                      Controllers
                           │
                           ▼
                       Services
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
           Models                External Services
              │                 ┌─────────┴─────────┐
              ▼                 ▼                   ▼
          MongoDB            OpenAI             Cloudinary
```

### Architectural Responsibilities

#### Routes

Routes define the available API endpoints and connect requests to the appropriate controllers.

```text
src/routes/
```

Current route files:

- `analysisRoute.js`
- `debtRoute.js`
- `financialProfileRoute.js`
- `userRoute.js`

---

#### Controllers

Controllers handle incoming HTTP requests and return HTTP responses.

```text
src/controllers/
```

Current controllers:

- `analysisController.js`
- `debtController.js`
- `financialProfileController.js`
- `userController.js`

---

#### Models

Models define the application's database structures and provide access to MongoDB through Mongoose.

```text
src/models/
```

Current models:

- `userModel.js`
- `financialProfileModel.js`
- `debtModel.js`
- `analysisModel.js`

---

#### Services

Services contain reusable business logic that should not be tightly coupled to the HTTP layer.

```text
src/services/
```

Current services:

- `analysisService.js`
- `mockAnalysisService.js`

The analysis service is responsible for preparing financial information and generating financial analysis, including communication with the AI layer.

---

#### Middlewares

Middleware provides reusable request-processing functionality.

```text
src/middlewares/
```

Current middleware includes:

- `requireAuth.js` — protects authenticated routes
- `validator.js` — validates incoming request data
- `errorHandler.js` — handles application errors
- `logger.js` — provides request/application logging
- `upload.js` — handles file uploads

---

#### Configuration

External services and application configuration are centralized in:

```text
src/config/
```

Current configuration files:

- `connectDB.js` — database connection
- `openAI.js` — OpenAI configuration
- `cloudinary.js` — Cloudinary configuration
- `envValidation.js` — environment variable validation

---

#### Schemas

Validation-related schemas are maintained in:

```text
src/schemas/schema.js
```

Schemas are used to ensure incoming data follows the expected structure before it reaches the application's business logic.

---

## Application Entry Points

The project contains two important application files:

### `src/app.js`

Responsible for configuring the Express application, middleware, and routes.

### `server.js`

Responsible for starting the application server and establishing the required startup configuration.

The general startup flow is:

```text
server.js
    │
    ▼
src/app.js
    │
    ▼
Middleware Configuration
    │
    ▼
Route Registration
    │
    ▼
Database Connection
    │
    ▼
API Server
```

---

# API Routes

The API currently contains the following major route groups:

```text
/v1/users
/v1/financial-profile
/v1/debts
/v1/analyses
```

> The exact endpoint paths and HTTP methods should be verified against the current route files and Postman collection.

---

## Financial Analysis Flow

The financial analysis endpoint follows the general flow below:

```text
POST /api/analyses
        │
        ▼
Authenticate User
        │
        ▼
Find Financial Profile
        │
        ▼
Find User's Debts
        │
        ▼
Calculate Financial Metrics
        │
        ├───────────────┐
        ▼               ▼
       DTI           Financial Buffer
        │               │
        └───────┬───────┘
                ▼
       Build Financial Context
                │
                ▼
          Analysis Service
                │
                ▼
           OpenAI API
                │
                ▼
        Generate Financial
             Feedback
                │
                ▼
       Save Analysis to DB
                │
                ▼
           HTTP Response
```

### Current Analysis Pipeline

The current implementation follows this sequence:

```text
Postman
   ↓
POST /api/analyses
   ↓
requireAuth
   ↓
Find Financial Profile
   ↓
Find User Debts
   ↓
Calculate DTI / Financial Buffer
   ↓
generateAnalysis()
   ↓
OpenAI API
   ↓
Save Analysis
   ↓
Return Response
```

---

## Authentication

Protected endpoints use the authentication middleware:

```text
src/middlewares/requireAuth.js
```

The middleware verifies the user's authentication credentials before allowing access to protected controller actions.

The authentication layer is designed to ensure that users can only access resources associated with their authenticated account.

---

## Database

FinGuard uses **MongoDB** as its database with Mongoose models.

The database connection is configured in:

```text
src/config/connectDB.js
```

The primary database models are:

```text
User
Financial Profile
Debt
Analysis
```

These are represented by:

```text
src/models/userModel.js
src/models/financialProfileModel.js
src/models/debtModel.js
src/models/analysisModel.js
```

---

## AI Integration

FinGuard uses the **OpenAI API** to generate AI-powered financial analysis and feedback.

The OpenAI configuration is located at:

```text
src/config/openAI.js
```

The analysis service is responsible for preparing the user's financial context before passing the relevant information to the AI model.

```text
Financial Profile
       +
     Debts
       +
Financial Metrics
       │
       ▼
Financial Context
       │
       ▼
   OpenAI API
       │
       ▼
AI Financial Feedback
```

---

## Cloudinary Integration

Cloudinary is used for file/media uploads.

Configuration:

```text
src/config/cloudinary.js
```

File-upload handling is implemented through:

```text
src/middlewares/upload.js
```

---

# Environment Variables

Create a local `.env` file based on the provided example:

```bash
cp .env.example .env
```

Then configure the required environment variables.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Do not commit `.env` or any secrets to the repository.

---

# Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>
cd finguard-api
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update the values with your local configuration.

## 4. Start the Development Server

```bash
npm run dev
```

## 5. Start the Production Server

```bash
npm start
```

> The exact npm scripts depend on the configuration currently defined in `package.json`.

---

# Development Status

🚧 **MVP — In Development**

FinGuard API is currently under active development.

Current core areas include:

- User management
- Authentication
- Financial profiles
- Debt management
- Financial analysis
- Financial metric calculations
- AI-powered analysis
- MongoDB persistence
- Cloudinary integration
- Request validation
- Error handling
- API documentation

---

# API Documentation

API endpoints are documented and tested using Postman.

**Postman Documentation:**

https://documenter.getpostman.com/view/2449601/2sBYAsyCFz

---

# Live API

**FinGuard API:**

https://finguard-api-n71k.onrender.com/

---

# Live Site

**FinGuard API on Render:**

https://render.com/

---

# Endpoint Assignments

| Endpoint Area | Backend Engineer |
|---|---|
| Authentication / Users | Maryann |
| Financial Profile | Azeez |
| Debts | Onyeachi |
| Financial Analysis | Onyekachi |

> Update this table as endpoint ownership changes across the team.

---

# Branch Protection Rules

The `main` branch is protected by a GitHub ruleset to ensure that changes are reviewed before being merged.

## Ruleset Configuration

| Setting | Configuration |
|---|---|
| **Enforcement status** | Active |
| **Target branch** | `main` |
| **Bypass list** | Empty |
| **Require a pull request before merging** | Enabled |
| **Required approvals** | 1 |
| **Dismiss stale pull request approvals** | Enabled |
| **Require review from Code Owners** | Enabled |
| **Require status checks to pass** | Disabled |
| **Block force pushes** | Enabled |

---

## Code Ownership

The repository uses a `CODEOWNERS` file to designate the code owner.

```text
.github/CODEOWNERS
```

Current configuration:

```text
* @kachi-jasperD
```

This means `@kachi-jasperD` is the Code Owner for all files in the repository.

---

# Contribution Workflow

All changes to `main` should follow this workflow:

1. Create a new branch.
2. Make the required changes.
3. Test the changes locally.
4. Push the branch to GitHub.
5. Open a Pull Request targeting `main`.
6. Request review from the appropriate contributors.
7. Obtain the required Code Owner approval.
8. Resolve any review comments.
9. Merge the Pull Request after approval.

### Important

> **No direct pushes to `main`. All changes should go through a Pull Request and the required review process.**

---

# Development Collaboration Guidelines

## 1. Communicate Before Editing Another Developer's Code

Before making significant changes to another developer's implementation:

- Communicate with the original developer.
- Understand the reason behind the existing implementation.
- Discuss the proposed changes.
- Consider potential effects on their work.
- Avoid unnecessary conflicts or duplicated work.

---

## 2. Test Before Raising a Pull Request

Before creating a Pull Request:

- Test the affected endpoints.
- Verify that the intended issue has been resolved.
- Test related functionality.
- Check for regressions.
- Verify authentication and authorization where applicable.
- Test validation and error handling.
- Confirm that the application starts successfully.

For API changes, use Postman or another API client to verify the affected endpoints.

---

## 3. Sync With `main`

Before merging or submitting significant changes:

```bash
git checkout main
git pull origin main
```

Then update your feature branch with the latest changes from `main`.

Resolve any merge conflicts locally and retest the application before completing the Pull Request.

---

# Pull Requests

The repository uses Pull Requests to review and integrate changes.

### PR Evidence

> Screenshots or links demonstrating completed Pull Requests can be added here.

---

# Network Graph

> Screenshots demonstrating team contributions and the repository network graph can be added here.

---

# Retrospective: Collaboration Issues Identified

The team has identified the following areas for improvement during development.

## Editing Other Developers' Code Without Communication

Before modifying another developer's implementation:

- Communicate with the developer.
- Understand the existing implementation.
- Explain the reason for the proposed change.
- Coordinate changes where necessary.

This helps reduce merge conflicts and prevents unintended changes to another developer's work.

---

## Insufficient Testing Before Raising PRs

Developers should thoroughly test their changes before opening a Pull Request.

Testing should include:

- The functionality being changed.
- Related endpoints.
- Authentication and authorization.
- Validation.
- Error handling.
- Regression testing.

A Pull Request should not be used as the first place to discover whether the implementation works.

---

## Not Syncing With `main`

Developers should regularly synchronize their working branches with the latest version of `main`.

Before completing a Pull Request:

```text
Latest main
    ↓
Update feature branch
    ↓
Resolve conflicts
    ↓
Run tests
    ↓
Verify API
    ↓
Open / Update Pull Request
```

Keeping branches synchronized reduces merge conflicts and makes integration safer.

---

# Summary

FinGuard API is a Node.js REST API built around a layered backend architecture.

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

External integrations such as OpenAI and Cloudinary are isolated in the configuration/service layers.

The current backend focuses on:

- 🔐 Authentication
- 👤 User management
- 💰 Financial profiles
- 💳 Debt management
- 📊 Financial analysis
- 🤖 AI-powered financial feedback
- 🗄️ MongoDB persistence
- ☁️ Cloudinary file handling
- 🛡️ Validation and error handling
- 📝 API documentation
- 🔀 Collaborative Git workflow

---

## Current Repository Structure at a Glance

```text
finguard-api/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── readMe.md
└── server.js
```

**FinGuard API — MVP in Development 🚧**


