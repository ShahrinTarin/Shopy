# Shopy - E-Commerce Web App

[Live Site](YOUR_LIVE_SITE_LINK) | [GitHub Repository](YOUR_GITHUB_LINK)

---

## Project Description
Shopy is a modern e-commerce web application built with Next.js, Tailwind CSS, and NextAuth.js for authentication. Users can browse products, register/login, and authenticated users can add new products via a secure dashboard. The app features a sleek, animated UI with glassmorphism design and responsive mobile-first layout.

---

## Features
- User authentication with NextAuth.js (credentials & Google OAuth)
- Add new products via secure dashboard (authenticated users only)
- Animated and gradient-based UI (glassmorphism)
- Responsive design for mobile and desktop
- Loading spinners for better UX on login and form submission

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone YOUR_GITHUB_LINK
cd shopy

npm install
# or
yarn install
npm run dev
# or
yarn dev

## 📁 API Endpoints Overview

| Method | Route                        | Description                                      |
|--------|------------------------------|-------------------------------------------------|
| GET    | `/products`                  | Get all products                                |
| GET    | `/products/:id`              | Get a single product by ID                      |
| POST   | `/api/productsave`           | Add a new product (Auth required)              |
| POST   | `/api/auth/signup`           | Register a new user                             |
| POST   | `/api/auth/login`            | Login user with credentials                     |
| POST   | `/api/auth/logout`           | Logout user                                     |
| GET    | `/api/auth/session`          | Get current user session                        |

