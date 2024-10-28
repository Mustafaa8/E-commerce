# Ecommerce API

A NestJS-based ecommerce backend API with user management, product catalog, and shopping cart functionality.

## Features

- User authentication and management
- Product catalog
- Shopping cart operations
- JWT-based security
- TypeORM integration with entities for Users, Products, and Cart

## Tech Stack

- NestJS
- TypeORM
- MongoDB
- JWT Authentication
- TypeScript

## Prerequisites

- Node.js
- npm
- MongoDB or docker image of it

## Installation

```bash
$ npm install
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# API Endpoints Documentation

## Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Register new user |
| POST | `/users/login` | User login |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

## Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Add new product |
| GET | `/products/:name` | Get product by name |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |


## Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | View cart |
| POST | `/cart/add/:product_id/:quantity` | Add to cart |
| DELETE | `/cart/remove/:product_id/:quantity` | Remove from cart |
| DELETE | `/cart/clear` | Clear cart |

