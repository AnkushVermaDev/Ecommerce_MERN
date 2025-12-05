# 🛒 MERN E-Commerce App
A functional e-commerce application built using the MERN Stack (MongoDB, Express.js, React, Node.js) as part of the Sicuaura MERN Full Stack Internship Project Evaluation.

## Overview
This project implements core e-commerce functionality including product listing, product details, user authentication, and cart management. Focus areas include clean code, RESTful API design, and maintainable state management.

## Features
### Frontend
- Product listing
- Product details page
- User login & registration
- Cart CRUD (Add, Update, Remove)
- State management (Context API / Redux Toolkit)
- React Router navigation
- Custom CSS or TailwindCSS

### Backend
- RESTful API with Express.js
- JWT-based authentication
- Password hashing using bcrypt
- MongoDB with Mongoose models
- Cart CRUD operations

## Tech Stack
### Client
- React.js
- React Router
- Redux Toolkit / Context API
- TailwindCSS / Custom CSS
- Axios

### Server
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt

## Project Structure

/Ecommerce_MERN
├── backend
│ ├── server.js
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── middleware/
└── frontend
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/ or store/
│ ├── App.js
│ └── index.js




## API Endpoints
### Products
- GET /api/products – Get all products
- GET /api/products/:id – Get single product

### Users
- POST /api/users/register – Register user
- POST /api/users/login – Login & return JWT
- GET /api/users/current – Get authenticated user info

### Cart
- POST /api/cart/add – Add item
- GET /api/cart – Get cart
- PUT /api/cart/:itemId – Update item
- DELETE /api/cart/:itemId – Remove item

