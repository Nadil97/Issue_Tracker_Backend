# 🚀 Issue Tracker API - Professional Grade Backend

This is a robust Issue Tracker Backend built with the **MERN** stack, following the **MVC Architecture** to ensure scalability and maintainability.

## 🛠 Technologies Used
- [cite_start]**Runtime:** Node.js [cite: 5]
- [cite_start]**Framework:** Express.js [cite: 5]
- [cite_start]**Database:** MongoDB with Mongoose 
- [cite_start]**Authentication:** JSON Web Tokens (JWT) & Bcrypt for password hashing 
- **Validation:** Joi / Express-validator
- [cite_start]**Deployment:** Render / Railway (Suggested) [cite: 20]

## ✨ Key Features
- [cite_start]**Full CRUD Operations:** Create, Read, Update, and Delete issues[cite: 2].
- [cite_start]**Advanced Filtering:** Search by title and filter by priority or status.
- [cite_start]**Performance Optimization:** Implemented pagination to handle large datasets efficiently[cite: 15].
- [cite_start]**Dashboard Stats:** API endpoint to get issue counts by status (Open, In Progress, Resolved).
- [cite_start]**Security:** Secure authentication and authorization for user-specific data[cite: 16].

## 📁 Project Structure (MVC)
```text
src/
├── config/         # Database and Environment configurations
├── controllers/    # Request handling & Business logic
├── middleware/     # Auth & Error handling middlewares
├── models/         # Database schemas (Mongoose)
├── routes/         # API Route definitions
└── app.js          # Entry point