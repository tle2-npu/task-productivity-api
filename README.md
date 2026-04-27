# Task Productivity API

## Project Overview
This project is a RESTful API built with Node.js and Express that allows users to manage tasks and track daily productivity data.

It demonstrates backend development concepts including:
- Authentication & Authorization (JWT + RBAC)
- RESTful API design
- Relational database modeling (Sequelize)
- Middleware architecture
- Error handling
- Unit testing
- Relationship-based endpoints

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- SQLite (development)
- JWT (authentication)
- bcryptjs (password hashing)
- Jest + Supertest (testing)

## API Documentation
You can find the Postman documentation is available [here](https://documenter.getpostman.com/view/52605404/2sBXqGqMR2).

## Deployment
API is deployed on Render [here](https://task-productivity-api.onrender.com).

## Project Structure
```
task-productivity-api/
├── src/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── db/
├── tests/
├── server.js
├── .env
└── package.json
```

## Setup Instructions

### 1. Clone repository
```
git clone https://github.com/tle2-npu/task-productivity-api.git 
cd task-productivity-api
```

### 2. Install dependencies
```
npm install
```

### 3. Setup environment variables
Create .env file:
```
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
DB_STORAGE=./src/db/database.sqlite
```

### 4. Initialize database
```
npm run db:init
```

### 5. Seed database (optional)
```
npm run seed
```

### 6. Start server
```
npm run dev
```
Server runs at:
`http://localhost:3000`

## Authentication Guide
### Register
`POST /api/register`

Body 
```
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456"
}
```
Response
```
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John",
    "email": "john@test.com"
  }
}
```

### Login
`POST /api/login`

Body
```{
  "email": "john@test.com",
  "password": "123456"
}
```
Response
```{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "email": "john@test.com",
    "role": "user"
  }
}
```

### Logout
`POST /api/logout`

Response
```
{
  "message": "Logout successful"
}
```

### Using JWT Token
For protected routes:
`Authorization: Bearer YOUR_TOKEN`

With user roles:
- user can access only own tasks
- admin can access all tasks + all users 

## API Endpoints 
#### TASKS (Protected)

All task routes require authentication: `Authorization: Bearer TOKEN`

### GET 
`GET /api/tasks`  

Features:
- User → sees own tasks
- Admin → sees all tasks

Response: 
```
[
  {
    "taskId": 1,
    "title": "Study API",
    "priority": "high",
    "status": "pending"
  }
]
```
`GET /api/tasks/:id` 

Permissions: Owner or Admin only

Response `200 OK` or `404 Not Found` 

### POST 
`POST /api/tasks` 

Permissions: Owner or Admin only

Body: 
```
{
  "title": "New Task",
  "priority": "high",
  "status": "pending"
}
```

Response 
```
{
  "taskId": 1,
  "title": "New Task"
}
```

### PUT
` PUT /api/tasks/:id` 

Permissions: Owner or Admin only

Body:
```
{
  "status": "completed"
}
```
Response:
```
{
  "message": "Task updated successfully"
}
```

### DELETE 
`DELETE /api/tasks/:id` 

Permissions: Owner or Admin only

Response:
```
{
  "message": "Task deleted successfully"
}
```

### Get all tasks by user
`GET /api/users/:id/tasks`

Response:
```
{
  "userId": 1,
  "tasks": [
    {
      "taskId": 1,
      "title": "Study API"
    }
  ]
}
```

## Error Handling
All errors return JSON format:
```
{
  "message": "Error description"
}
```
Common Status Codes:
- 200 → Success
- 201 → Created
- 401 → Unauthorized
- 403 → Forbidden
- 400 → Bad Request
- 404 → Not Found
- 500 → Server Error

## Testing
Run tests: 
```
npm test
```

Tests include:
- Authentication (register/login)
- Task CRUD
- RBAC authorization
- Search functionality
- Error cases

## Key Features
- JWT Authentication
- Role-Based Access Control (RBAC)
- Task CRUD system
- User-task relationships
- Sequelize ORM with SQLite
- Middleware system (logging, auth, error handling)
- Unit testing (Jest + Supertest)