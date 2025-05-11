# GasUpNow

## Project Overview

**GasUpNow** is a web application that provides an order management system for members and an admin dashboard to manage orders. The application includes authentication via JWT tokens, dynamic state management with Zustand, and protected routes for members and admins.

### Tech Stack
- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Zustand
  - React Router
- **Backend:**
  - Node.js
  - Express
  - MongoDB (assumed)
  - JWT Authentication
- **State Management:** Zustand
- **Routing:** Protected routes for authenticated users

## Core Features

### Admin Features:
- **Login/Logout:** Admins can log in and log out using JWT authentication.
- **Order Management:** Admins can view, update order statuses (e.g., Pending, Confirmed), and update payment statuses (Paid, Pending).
- **Protected Dashboard:** Admin dashboard (`/admin-dashboard`) is protected and only accessible by authenticated admins.

### Member Features:
- **Signup/Login:** Members can sign up, log in, and maintain a session with JWT.
- **Order Creation:** Members can place an order, select cylinder types (Domestic/Commercial), payment methods, and calculate the total price.
- **Order Management:** Members can view and manage their orders from their personal dashboard.
- **Protected Dashboard:** Member dashboard (`/dashboard`) is only accessible to authenticated members.

## State Management with Zustand

### `useAuthStore` (For Member Authentication and Orders)
- Manages member state (user, orders, current order).
- Actions:
  - `signup`, `login`, `logout`
  - `createOrder`, `fetchOrders`, `fetchOrderById`

### `useAdminStore` (For Admin Authentication and Order Management)
- Manages admin state (admin, orders).
- Actions:
  - `login`, `logout`
  - `fetchAllOrders`, `updateOrderStatus`, `updatePaymentStatus`

## Routing

### Public Routes:
- `/`, `/about`, `/services`, `/contact`, `/order`, `/login`, `/signup`

### Protected Routes:
- **For Members:** `/dashboard` – Accessible only by authenticated members.
- **For Admins:** `/admin-dashboard` – Accessible only by authenticated admins via `AdminRoute`.

## Core Components
- **Navbar:** Displays links to the site’s pages (Home, About, Services, etc.), login/signup buttons, and member/admin-specific routes.
- **ProtectedRoute:** A higher-order component that ensures member routes are only accessible to authenticated users.
- **AdminRoute:** A higher-order component that ensures admin routes are only accessible to authenticated admins.
- **Order Management (Admin):** Admins can view and update order status and payment status.
- **Order Management (Member):** Members can create, view, and manage their orders.

## API Integration
- **Authentication:**
  - `/api/member/signup` – Member registration.
  - `/api/member/login` – Member login.
  - `/api/admin/login` – Admin login.

- **Order Management:**
  - `/api/order/create` – Create an order (members only).
  - `/api/order/get` – Fetch member orders.
  - `/api/order/getOrder/:id` – Fetch details of a specific member order.
  - `/api/admin/orders` – Fetch all orders (admin only).
  - `/api/admin/order/:id/status` – Update order status (admin only).
  - `/api/admin/order/:id/payment-status` – Update payment status (admin only).

## Toast Notifications
- The application provides toast notifications for various actions such as login success/failure, order creation success/failure, and order status updates.

## Utility & Helpers
- **Axios:** Custom `axiosInstance` for handling HTTP requests with a predefined base URL and authorization headers.
- **LocalStorage:** Used to persist admin and user data, as well as JWT tokens, across sessions.

## Future Improvements
- **Admin Features:**
  - Add more granular admin roles (e.g., manage products, view reports).
  
- **Member Features:**
  - Implement user profile settings (name, email update, etc.).
  - Implement order history filters (e.g., by date, status).

---

Feel free to fork, clone, or contribute to this project!
