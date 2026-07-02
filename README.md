# XOHO Banking App

A modern digital banking web application built with React, inspired by YONO SBI.

## Tech Stack

- React 19
- React Router DOM v7
- CSS Modules (per-component styling)
- REST API integration via fetch

## Installation & Setup

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # Production build
npm test        # Run tests
```

> The app expects a backend API running at `http://localhost:3001/api`. Set `REACT_APP_API_URL` in `.env` to override.

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero/dashboard based on auth state |
| `/services` | ServicesPage | All banking services |
| `/accounts` | AccountsPage | Account types listing |
| `/account-opening` | AccountOpeningPage | 3-step account opening form |
| `/personal-loans` | PersonalLoanPage | Loan offers + EMI calculator |
| `/loan-application` | LoanApplicationPage | 4-step loan application form |
| `/loan-tracking` | LoanTrackingPage | Application status timeline |
| `/contact` | ContactPage | Contact info + message form |
| `/grievance` | GrievancePage | Grievance registration form |

---

## Features

### Authentication
- JWT-based login via modal (LoginModal)
- Calls `apiService.login()` with fallback to mock data when API is unavailable
- Session persistence using `localStorage` (token + userData restored on refresh)
- Auth state managed globally via `AuthContext`
- Profile icon showing user initial in Navbar when logged in
- Dropdown with user name, Adaptive Mode toggle, and Logout
- Logout clears token and userData from `localStorage`

### Home Page
- **Guest view**: Hero banner, Quick Actions, Services grid, Login section, Footer
- **Logged-in view**: Account Dashboard replaces Hero/Quick Actions

### Account Dashboard (post-login)
- Account summary with balance fetched from API (`getAccountDashboardData`)
- Recent transactions list (credit/debit styled)
- Quick links: Fund Transfer, Bill Payment, Loans, Fixed Deposit
- LoadingSpinner and ErrorMessage with retry on failure
- Falls back to mock data when API is unavailable

### Account Opening
- 3-step form: Personal Info → Address → Account Configuration
- Supports Savings, Current, Salary account types
- Collects PAN, Aadhar, initial deposit
- Lists account benefits (zero balance, free debit card, etc.)

### Accounts Page
- Fetches account types from API (`getAccountTypes`) with loading/error states
- Falls back to static Savings, Current, Salary account data
- Displays features per account type
- "Open Account" CTA navigates to `/account-opening`

### Personal Loans
- Loan offers fetched from API (`getLoanOffers`) with loading/error states
- Falls back to static Jumbo Loan and Only4U Loan offers
- Interactive EMI calculator with sliders for amount (₹50K–₹50L) and tenure (12–84 months)
- Displays: Monthly EMI, Total Interest, Total Payable
- Eligibility criteria for Salaried and Self-Employed
- Required documents section
- "Apply Now" navigates to `/loan-application`

### Loan Application (4-step form)
- Step 1 – Personal Details: name, DOB, gender, marital status, PAN, Aadhar
- Step 2 – Address Details: address, city, state, pincode, residence type
- Step 3 – Employment Details: type, company, designation, income, experience
- Step 4 – Loan Details & Documents: purpose, existing loans, document uploads (PAN, Aadhar, salary slips, bank statement), linked bank account display, declaration checkbox
- Submits via `apiService.submitLoanApplication()`
- Animated success modal on submission, then navigates to `/loan-tracking`

### Loan Tracking
- Visual timeline: Application Submitted → Document Verification → Credit Evaluation → Approval & Disbursal
- Displays applicant name, loan amount, tenure, offer name
- Edit Application and Back to Loans actions

### Services Page
- Banking services fetched from API (`getBankingServices`) with loading/error states
- Falls back to static list: Account Opening, Personal Loans, Fund Transfer, Bill Payments, Fixed Deposits, Credit Cards, Insurance, Demat Account
- Clickable cards navigate to relevant pages where routes exist

### Quick Actions
- Cards for Cards, Loans, Investments, Grievance
- Grievance card navigates to `/grievance`

### Grievance
- Form with contact info + grievance details
- Category: Account, Transaction, Card, Loan, Other
- Priority: Low, Medium, High
- Submits via `apiService.submitGrievance()`
- Shows inline success screen with generated reference ID (no alert)

### Contact Page
- Contact info cards fetched from API (`getContactInfo`) with loading state
- Falls back to static phone, email, address cards
- Message form submits via `apiService.submitContactForm()`
- Inline success banner on submission (no alert)

### AI Agent Chatbot
- Floating chat button (bottom of every page)
- Two modes:
  - **Automation mode**: detects action keywords (click, fill, submit, navigate, etc.), asks for confirmation before executing via `/api/agent`
  - **Conversation mode**: general banking Q&A via `/api/chat`
- Maintains chat history for context
- Extracts user context from DOM (name, email, phone) to personalize automation
- Confirm/Cancel buttons for pending automation tasks

### Navbar
- Active link highlighting (exact match on Home)
- Sticky positioning
- Login button (opens modal) for guests
- Profile icon with dropdown for logged-in users:
  - Displays user name
  - Adaptive Mode toggle (shown only when `window.AdaptiveEngine` is available)
  - Logout button

### Common Components
- `LoadingSpinner` – reusable loading state with customizable message
- `ErrorMessage` – reusable error state with optional retry button

---

## API Service (`apiService.js`)

Singleton class wrapping all backend calls with Bearer token auth. Base URL defaults to `http://localhost:3001/api`, overridable via `REACT_APP_API_URL`.

| Category | Methods |
|---|---|
| Auth | `login`, `logout`, `getProfile`, `register`, `refreshToken` |
| Loans | `getLoanOffers`, `getLoanFeatures`, `getLoanEligibility`, `getLoanDocuments`, `getLoanConfig`, `submitLoanApplication`, `getLoanApplicationStatus`, `calculateEMI`, `getPersonalizedLoanOffers` |
| Accounts | `getAccountTypes`, `getAccountBalance`, `getAccountDetails`, `getAccountTransactions`, `openAccount`, `getAccountSummary`, `getAccountBenefits` |
| Services | `getBankingServices`, `getServiceDetails`, `getQuickActions` |
| Contact | `getContactInfo`, `submitContactForm`, `submitGrievance`, `getGrievanceStatus`, `getGrievanceCategories` |
| Transactions | `getTransactionHistory`, `getTransactionDetails`, `initiateFundTransfer` |
| Dashboard | `getDashboardData`, `getRecentActivities` |
| Batch | `getLoanPageData`, `getAccountDashboardData`, `getServicesPageData`, `getUIData` |

---

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.js
│   │   ├── LoadingSpinner.css
│   │   ├── ErrorMessage.js
│   │   └── ErrorMessage.css
│   ├── AccountDashboard.js / .css
│   ├── AccountForm.js / .css
│   ├── Chatbot.js / .css
│   ├── Footer.js / .css
│   ├── Hero.js / .css
│   ├── LoanApplication.js / .css
│   ├── Login.js / .css
│   ├── LoginModal.js / .css
│   ├── Navbar.js / .css
│   ├── QuickActions.js / .css
│   └── Services.js / .css
├── context/
│   └── AuthContext.js
├── pages/
│   ├── Home.js
│   ├── AccountOpeningPage.js / .css
│   ├── AccountsPage.js / .css
│   ├── ContactPage.js / .css
│   ├── GrievancePage.js / .css
│   ├── LoanApplicationPage.js / .css
│   ├── LoanTrackingPage.js / .css
│   ├── PersonalLoanPage.js / .css
│   └── ServicesPage.js / .css
├── services/
│   └── apiService.js
└── App.js
```
