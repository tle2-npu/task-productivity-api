# Task Productivity API

## Project Overview
This project is a RESTful API built with Node.js and Express that allows users to manage tasks and track daily productivity sessions.  
It demonstrates backend development concepts including database design, CRUD operations, middleware, error handling, and unit testing.

The system is built using a relational database and follows RESTful API conventions.

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Jest (testing)
- Supertest (API testing)
- Postman (API documentation)

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

## API Documentation
You can find the Postman documentation is available [here](https://documenter.getpostman.com/view/52605404/2sBXqGqMR2).


## API Endpoints 
### GET 
URL `/api/tasks` for returning all tasks

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
URL `/api/tasks/:id` for returning task by ID 

Response `200 OK` or `404 Not Found` 

### POST 
URL `/api/tasks` for creating new task

Require fields:
- title (string)
- userId (integer)

Response `201 Created` or `400 Bad Request` 

### PUT
URL `/api/tasks/:id` for updating an existing task by ID

Path Parameter: id (integer) 

Response `200 OK` or `404 Not Found` 

Example:
- Request Body:
```
{
  "status": "completed"
}
```
- Response:
```
{
  "message": "Task updated successfully"
}
```

### DELETE 
URL `/api/tasks/:id` for deleting task by ID

Path Parameter: id (integer) 

Response `200 OK` or `404 Not Found` 

Response:
```
{
  "message": "Task deleted successfully"
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
- 400 → Bad Request
- 404 → Not Found
- 500 → Server Error

## Testing
Run unit tests: 
```
npm test
```

Tests include:
- Create task
- Get tasks
- Error handling validation

## Key Features
- RESTful API design
- CRUD operations for tasks
- Relational database with Sequelize
- Middleware (logging + error handling)
- Unit testing with Jest + Supertest
- Postman API documentation

## Future Improvements
- Add authentication (JWT)
- Role-based access control (admin/user)
- Expand session analytics
- Deploy to cloud (Render)