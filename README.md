# 🛒 Ecommerce API

A scalable and secure RESTful API for an eCommerce application built with **TypeScript**, **Express**, and **TypeORM**. This backend handles core functionalities such as user authentication, product management, shopping cart, order processing, and more.

## 🚀 Features

- User registration and login (JWT authentication)
- Role-based access control (Customer, Admin)
- Product catalog management (CRUD)
- Shopping cart functionality
- Order placement and tracking
- Secure password hashing
- Request validation and error handling
- PostgreSQL database integration with TypeORM
- Modular and maintainable project structure

### Technical Highlights
- Asynchronous email notifications using job queues
- Clean architecture with modular design
- Comprehensive test coverage with Jest
- API documentation with Swagger/OpenAPI
- Docker containerization for easy deployment

## 🧱 Tech Stack

- **Backend**: Node.js, TypeScript
- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL (can be swapped)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **Queue System**: Redis, Bullmq
- **Validation**: class-validator
- **Environment Management**: dotenv
- **API Documentation & Testing**: Swagger (OpenAPI), Postman
- **Version Control**: Git
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Docker (optional)
- npm or yarn
 
## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/shabzynana/ecommerce-api.git
cd ecommerce-api
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials and other configurations
```

4. Run database migrations
```bash
yarn migration:create
yarn migration:generate
yarn migration:run
```

5. Start the development server
```bash
npm run start:dev
```

## 🐳 Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build the image manually
docker build -t ecommerce-api .
docker run -p 3000:3000 ecommerce-api
```

## 📚 API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs-json`

## 📌 API Endpoints Overview

### Auth

- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login and receive JWT

### Products

- \`GET /api/products\` - List all products
- \`POST /api/products\` - Add new product *(Admin only)*
- \`GET /api/products/:id\` - Get single product
- \`PUT /api/products/:id\` - Update product *(Admin only)*
- \`DELETE /api/products/:id\` - Delete product *(Admin only)*

### Cart

- \`GET /api/cart\` - Get current user's cart
- \`POST /api/cart\` - Add product to cart
- \`PUT /api/cart/:itemId\` - Update quantity
- \`DELETE /api/cart/:itemId\` - Remove item

### Orders

- \`POST /api/orders\` - Place order
- \`GET /api/orders\` - View all orders (user)
- \`GET /api/orders/:id\` - View order by ID

## 🔐 Authentication

This project uses **JWT (JSON Web Tokens)** for authentication. Authenticated users must pass the token in the \`Authorization\` header as:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## 🧪 Testing

You can test the endpoints using tools like **Postman** or **Thunder Client**.

Sample Postman collection available here: [TODO: Add link]

## 🧼 Code Quality

- Type safety with TypeScript
- Clean code practices
- Separation of concerns using services
- Proper error handling middleware
- Input validation using \`class-validator\`

## 📈 Future Improvements

- Add product categories and filtering
- Implement payment gateway integration
- Order status tracking (shipped, delivered, etc.)
- Admin dashboard and analytics
- Unit & integration testing with Jest and Supertest
- Dockerize the project for deployment

## 🧑‍💻 Author

Adebiyi Oluwafemi Olamilekan
Junior Backend Developer  
[LinkedIn](https://www.linkedin.com/in/your-profile) | [Portfolio](https://your-portfolio.com)


