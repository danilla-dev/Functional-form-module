# AI Agent Subscription Platform

A full-stack application designed to manage AI agent subscriptions. The platform includes a landing page with sections such as "How It Works", "Features", "Pricing", and "FAQ", and provides a multi-step registration process, subscription management, and integrations with external services like Gmail and Allegro. The application is built using React, Express, MongoDB, Stripe, and Chakra UI.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a concept-based platform where users can subscribe to an AI agent service. The application includes a landing page with responsive sections explaining the service and subscription options. Users can sign up, verify their email, and choose subscription preferences before making payments via Stripe. After successful payment, users are directed to a dashboard where they can manage their subscription and integrations with external platforms like Gmail and Allegro.

## Features

- **Responsive Design:** Built with Chakra UI for a fully responsive user interface. 📱
- **Multi-step Subscription Process:** Includes user registration, email verification, and subscription preference setup. 📝
- **Payment Integration:** Integrated with Stripe for handling payments in test mode. 💳
- **API Integrations:** Simulated integrations with external platforms such as Gmail, Allegro, and Google Drive. 🌐
- **User Authentication:** Secure user authentication using JWT and HTTP-only cookies. 🔐
- **Dashboard:** After subscription, users can view their subscription details, activity, and integration settings. 📊
- **Dynamic Content:** Sections like FAQs and pricing are dynamically rendered based on user input. 🔄
- **State Management:** React Query for efficient data fetching and caching. 🧠

## Technologies Used

- **Frontend:**

  - React ⚛️
  - Chakra UI 🎨
  - React Query 📚
  - Axios 🌐
  - Framer Motion 🏃‍♂️
  - React Router 🛤️
  - React Hook Form 📝
  - Yup ✔️

- **Backend:**

  - Express 🚀
  - MongoDB 🗃️
  - Mongoose 🔍
  - Helmet 🛡️
  - Bcrypt 🔑
  - JWT Authentication 🔒
  - Stripe 💳

- **Dev Tools:**

  - Nodemon 🖥️
  - Cookie Parser 🍪
  - Cors 🔗
  - Crypto 🔐
  - React Icons 🖼️
  - JSCookie 🍪

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-agent-subscription-platform.git
   ```

2. Install client dependencies::
   ```bash
   cd ai-agent-subscription-platform/client
   npm install
   ```
3. Install server dependencies:
   ```bash
   cd ../server
   npm install
   ```
4. Create a .env file in both the frontend and backend directories and set up the required environment variables (e.g., MongoDB URI, JWT secret, Stripe API key).

5. Install server dependencies:
   ```bash
   cd server
   npm start
   ```
6. Start the frontend development server:

```bash
cd frontend
npm start
```

Your application will be running at http://localhost:5173.

## Usage

- **Landing Page:** The user can navigate through the landing page sections (How It Works, Features, Pricing) and proceed to registration. 🏠
- **Multi-Step Registration:** TThe user registers with email and password, verifies the email, and sets subscription preferences. 📝
- **Payment:** After entering preferences, the user is redirected to Stripe for payment processing. 💳
- **Dashboard:** After successful payment, the user can view subscription details, activity, and manage integrations with platforms. 📊

## API Documentation

### Authentication

- **Register User**

  - **Endpoint:** `POST /api/auth/register`
  - **Request Body:**
    ```json
    {
    	"email": "user@example.com",
    	"password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
    	"message": "Registration successful"
    }
    ```

- **Login User**
  - **Endpoint:** `POST /api/auth/login`
  - **Request Body:**
    ```json
    {
    	"email": "user@example.com",
    	"password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
    	"token": "your_jwt_token"
    }
    ```

### Subscription Endpoints

- **Get Subscription Details**

  - **Endpoint:** `GET /api/subscription/details`
  - **Headers:**
    - `Authorization: Bearer <jwt_token>`
  - **Response:**
    ```json
    {
    	"subscriptionStatus": "active",
    	"expiryDate": "2024-12-01",
    	"preferences": {
    		"assistPreferences": "AI Assistant",
    		"communicationInterval": "daily",
    		"communicationStyle": "formal"
    	}
    }
    ```

- **Update Subscription Preferences**
  - **Endpoint:** `PUT /api/subscription/preferences`
  - **Request Body:**
    ```json
    {
    	"assistPreferences": "AI Assistant",
    	"communicationInterval": "weekly",
    	"communicationStyle": "casual"
    }
    ```
  - **Response:**
    ```json
    {
    	"message": "Subscription preferences updated successfully"
    }
    ```

---

## Technologies Used

- **Frontend:**
  - React ⚛️, Chakra UI 🎨, React Query 📚, Axios 🌐, React Router DOM 🛤️, React Hook Form 📝, Yup ✔️
- **Backend:**
  - Express 🚀, JWT 🔒, MongoDB 🗃️, Mongoose 🔍, CORS 🔗, Helmet 🛡️, bcrypt 🔑, Nodemon 🖥️
- **Other Libraries:**
  - Stripe 💳, Framer Motion 🏃‍♂️, js-cookie 🍪, Cookie-parser 🍪, crypto 🔐, React Icons 🖼️, React Scroll 🌀, env 🌱

---

## Setup Instructions

### Prerequisites

1. Node.js 🌱
2. MongoDB 🗃️

### Frontend Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MongoDB connection and environment variables.
4. Start the backend server:
   ```bash
   npm run dev
   ```

---

## How It Works

1. **User Flow:**

- Navigate to the landing page and explore the features and pricing. 🏠
- Register via a multi-step form, including email and password input. 📝
- Email verification step is required to proceed to subscription preferences. 📧
- Once preferences are set, the user is redirected to Stripe for payment. 💳
- On success, the user is redirected to their dashboard with subscription details and platform

2. **API Flow:**

- User registers, logs in, and accesses subscription details via RESTful API with JWT authentication. 🔐
- Subscription preferences can be updated using the API. 🔄

---

## Additional Features to Consider

1. **Admin Panel:** Add a simple admin panel for managing users, subscriptions, and integrations. 👩‍💼
2. **Analytics Dashboard:** Provide users with analytics about their usage, such as interaction logs, preferences, and billing history.📊
3. **Notifications:** Implement email or in-app notifications for subscription changes, payments, or new integrations. 📧
4. **Performance Optimization:** Optimize the app for performance, such as code splitting, lazy loading, and using Redis for caching data where necessary.⚡

---

## Conclusion

This project demonstrates full-stack capabilities with a clear user journey from registration to payment and managing platform integrations. It leverages modern technologies like React ⚛️, Express 🚀, MongoDB 🗃️, and Stripe 💳 to build a fully functional AI Agent subscription platform. 🎯
