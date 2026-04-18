# Issue Tracker Backend

This is a robust Issue Tracker Backend built with the **MERN** stack (Node.js, Express, MongoDB), following the **MVC Architecture** to ensure scalability and maintainability.

## ✨ Features

- **User Authentication**: Secure JWT-based registration and login.
- **Issue Management**: CRUD operations for issues (Create, Read, Update, Delete).
- **Dashboard Stats**: Real-time aggregation of issue statuses (Open, In Progress, Resolved).
- **Search & Filtering**: Filter issues by status, priority, or search by title.
- **Pagination & Sorting**: Efficient data retrieval with customizable sorting and pagination.

## 🛠️ Tech Stack

- **Server**: Node.js & Express.js
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Validation**: Joi
- **Authentication**: JsonWebToken (JWT) & bcryptjs
- **Logging**: Morgan

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

# 📖 API Documentation

This guide provides sample requests and instructions for testing the endpoints using **Thunder Client** or Postman.

## Base URL
`http://localhost:5000/api`

## 1. Authentication Endpoints

### Register User
- **Method:** `POST`
- **URL:** `/auth/register`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
- **Method:** `POST`
- **URL:** `/auth/login`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
> [!IMPORTANT]
> After a successful login, you will receive a `token`. Copy this token to use in the `Authorization` header for protected routes.

## 2. Issue Management Endpoints (Protected)

*All these endpoints require an `Authorization` header: `Bearer <token>`*

### Get All Issues
- **Method:** `GET`
- **URL:** `/issues`
- **Query Params (Optional):**
  - `page`: `1`
  - `limit`: `10`
  - `sort`: `-createdAt`
  - `status`: `Open`
  - `search`: `title_keyword`

### Create New Issue
- **Method:** `POST`
- **URL:** `/issues`
- **Body (JSON):**
```json
{
  "title": "Fix login bug",
  "description": "The login button is not responding on mobile devices.",
  "status": "Open",
  "priority": "High"
}
```
*Valid `status`: `Open`, `In Progress`, `Resolved`*
*Valid `priority`: `Low`, `Medium`, `High`*

### Get Single Issue
- **Method:** `GET`
- **URL:** `/issues/:id`

### Update Issue
- **Method:** `PUT`
- **URL:** `/issues/:id`
- **Body (JSON):**
```json
{
  "status": "In Progress",
  "priority": "Medium"
}
```

### Delete Issue
- **Method:** `DELETE`
- **URL:** `/issues/:id`

### Get Dashboard Statistics
- **Method:** `GET`
- **URL:** `/issues/stats`

---

## 📂 Project Structure

```text
src/
├── config/         # Database configuration
├── controllers/    # Route controllers (logic)
├── middleware/     # Custom middleware (auth, error handling)
├── models/         # Mongoose models (schemas)
├── routes/         # API routes
└── app.js          # Entry point
```
