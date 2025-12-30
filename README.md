💳 Digital Wallet Backend API (Bkash/Nagad Inspired)
📌 Project Overview
This project is a secure, modular, and role-based backend API for a digital wallet system built with Express.js and Mongoose. It enables users, agents, and admins to interact with wallets, perform financial transactions, and manage system operations with strict authentication and authorization.

The system supports:

🔐 JWT-based Authentication

🎭 Role-based Authorization (Admin, User, Agent)

🏦 Wallet Management (auto-created at registration)

💸 Transactional Logic (add, withdraw, send, cash-in/out)

📦 Modular Code Architecture

🔁 Trackable Transactions

🚀 Features
👤 Users
Register/Login with JWT

Wallet auto-created with initial balance (৳50)

Add money (top-up)

Withdraw money

Send money to another user

View wallet balance & transaction history

🧑‍💼 Agents
Cash-in (add money to user wallet)

Cash-out (withdraw money from user wallet)

View commission history (optional)

🛡️ Admins
View all users, agents, wallets, and transactions

Block/unblock user wallets

Approve/suspend agents

Configure system parameters (fees, limits) (optional)

🧱 Tech Stack
Backend Framework: Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT

Password Security: bcrypt

Validation: Joi / custom middleware

Architecture: Modular (src/modules)

📂 Project Structure
Code
src/
├── modules/
│   ├── auth/          # Login, register, JWT
│   ├── user/          # User operations
│   ├── wallet/        # Wallet logic
│   └── transaction/   # Transaction handling
├── middlewares/       # Auth & role-based protection
├── config/            # DB, environment configs
├── utils/             # Helpers (error handling, response)
├── app.ts             # Entry point
🔐 Authentication & Authorization
JWT-based login system

Roles: admin, user, agent

Middleware ensures role-based route protection

🧩 API Endpoints
Auth
POST /auth/register → Register new user/agent/admin

POST /auth/login → Login & receive JWT

User
POST /wallets/deposit → Add money

POST /wallets/withdraw → Withdraw money

POST /wallets/send → Send money to another user

GET /wallets/me → View wallet balance

GET /transactions/me → View transaction history

Agent
POST /agents/cashin → Add money to user wallet

POST /agents/cashout → Withdraw money from user wallet

GET /agents/commissions → View commission history (optional)

Admin
GET /admin/users → View all users

GET /admin/agents → View all agents

GET /admin/wallets → View all wallets

GET /admin/transactions → View all transactions

PATCH /admin/wallets/block/:id → Block/unblock wallet

PATCH /admin/agents/approve/:id → Approve/suspend agent

⚙️ Setup & Installation
Prerequisites
Node.js  (>=16)

MongoDB (local or cloud e.g., Atlas)

Postman (for testing)

Steps
bash
# Clone repository
git clone https://github.com/niloytalukde/Digital_Wallet_Server

# Navigate to project
cd digital-wallet-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with DB_URI, JWT_SECRET, PORT

# Run server
npm run dev
🧪 Testing
Use Postman to test endpoints

JWT required for protected routes

Example test flow:

Register user/agent/admin

Login → get JWT

Perform wallet operations

Verify transaction history

📜 Documentation
All endpoints documented in Postman collection

Includes request/response examples

Error handling with proper status codes:

200 OK → Success

400 Bad Request → Validation errors

401 Unauthorized → Invalid/missing JWT

403 Forbidden → Role not permitted

404 Not Found → Resource missing

🎥 Demo Video (5–10 mins)
Intro (30s) – Project title & purpose

Folder Structure (1 min) – Walkthrough of src/

Auth Flow (1 min) – Register, login, JWT roles

User Features (1 min) – Deposit, withdraw, send money

Agent Features (1 min) – Cash-in/out, commissions

Admin Features (1 min) – Manage users, wallets, agents

Postman Testing (3–4 mins) – Demonstrate endpoints

Ending (30s) – Mention README, testing coverage, thanks

✅ Future Enhancements
Transaction fees & agent commissions

Daily/monthly transaction limits

Notification system (console/webhook)

Advanced reporting dashboards

🙌 Acknowledgements
Inspired by Bkash and Nagad wallet systems.
Built with ❤️ using Node.js  + MongoDB.
