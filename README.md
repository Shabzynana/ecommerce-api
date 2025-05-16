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

## 🔐 Security Features

- JWT tokens with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention via TypeORM
- Role-based route protection
- Ownership validation for user-specific resources

## 🚦 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove from cart

### Orders
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order from cart
- `PUT /orders/:id/status` - Update order status (Admin only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🧼 Code Quality

- Type safety with TypeScript
- Clean code practices
- Separation of concerns using services
- Proper error handling middleware
- Input validation using \`class-validator\`

## 📈 Future Improvements

- Order status tracking (shipped, delivered, etc.)
- Admin dashboard and analytics
- Unit & integration testing with Jest and Supertest

## 🧑‍💻 Author

Adebiyi Oluwafemi Olamilekan
Junior Backend Developer  
[LinkedIn](https://www.linkedin.com/in/your-profile) | [Portfolio](https://your-portfolio.com)


