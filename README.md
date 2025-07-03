[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19883120&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

  # 📦 Express.js Products API

A simple RESTful API built with **Express.js** that performs standard CRUD operations on an in-memory `products` resource. Includes middleware for logging, authentication, validation, error handling, and advanced features like search, pagination, and filtering.

---

## 🚀 Getting Started

### 📁 Prerequisites

* [Node.js](https://nodejs.org/) (v14 or above)
* [Postman](https://www.postman.com/) or `curl` for testing endpoints

### 📥 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
```

### ⚙️ Environment Variables

Create a `.env` file and add:

```env
PORT=3000
API_KEY=1234567
```

(Refer to `.env.example` for structure)

### ▶️ Run the Server

```bash
node server.js
```

Server will run at: `http://localhost:3000`

---

## 📘 API Documentation

Base URL: `http://localhost:3000/api/products`

### 🔹 GET `/api/products`

**Description**: List all products with optional filtering and pagination.

**Query Parameters**:

* `category` (optional): Filter by category
* `page` (optional): Page number (default 1)
* `limit` (optional): Items per page (default 10)

**Response**:

```json
{
  "total": 3,
  "page": 1,
  "limit": 10,
  "products": [ { ... }, ... ]
}
```

---

### 🔹 GET `/api/products/:id`

**Description**: Get a specific product by ID

**Response**:

```json
{
  "id": "uuid",
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

### 🔹 POST `/api/products`

**Description**: Create a new product

**Headers**:

* `x-api-key`: `1234567`
* `Content-Type`: `application/json`

**Body**:

```json
{
  "name": "Blender",
  "description": "Powerful blender",
  "price": 99.99,
  "category": "kitchen",
  "inStock": true
}
```

**Response**: `201 Created`

```json
{
  "id": "uuid",
  "name": "Blender",
  "description": "Powerful blender",
  "price": 99.99,
  "category": "kitchen",
  "inStock": true
}
```

---

### 🔹 PUT `/api/products/:id`

**Description**: Update an existing product

**Headers**:

* `x-api-key`: `1234567`

**Body**:

```json
{
  "price": 89.99,
  "inStock": false
}
```

**Response**: `200 OK`

```json
{
  "id": "uuid",
  "price": 89.99,
  "inStock": false,
  ...other fields
}
```

---

### 🔹 DELETE `/api/products/:id`

**Description**: Delete a product by ID

**Headers**:

* `x-api-key`: `1234567`

**Response**: `204 No Content`

---

### 🔹 GET `/api/products/search/query?query=term`

**Description**: Search products by name

**Response**:

```json
[ { "id": "uuid", "name": "Laptop", ... } ]
```

---

### 🔹 GET `/api/products/stats/count`

**Description**: Get product count by category

**Response**:

```json
{
  "electronics": 2,
  "kitchen": 1
}
```

---

## 🧰 Middleware Used

* **Logger**: Logs HTTP method, route, and timestamp
* **Authentication**: Validates `x-api-key` in headers
* **Validation**: Ensures proper product structure
* **Global Error Handler**: Catches and formats uncaught errors

---

## 📬 Contact

For questions or contributions, feel free to open an issue or pull request!
