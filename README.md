# 🌍 Travel Buddy & Meetup – Backend

Backend for the **Travel Buddy & Meetup Platform**, a social travel networking application built with **Node.js, Express.js, TypeScript, and PostgreSQL (Prisma ORM)**.

This backend provides secure REST APIs for **authentication, profiles, travel plans, matching, reviews, subscriptions, and payments**.

---

## 🚀 Live Links

🔗 **Frontend:** https://travelfont.vercel.app  
🔗 **Backend API:** https://server-six-mauve.vercel.app  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL + Prisma ORM**
- **bcrypt** (Password hashing)
- **JWT Authentication**
- **Cloudinary + Multer** (Image upload)
- **Stripe** (Payments)

---

## 📌 Core API Features

### 1️⃣ Authentication
- Register new users  
- Login  
- JWT-based authentication  
- Role-based access (`admin`, `travaller`)  
- Secure password hashing using **bcrypt**

---

### 2️⃣ User Profiles
- Fetch public user profile  
- Edit/update profile  
- Upload profile images using Cloudinary  

---

### 3️⃣ Travel Plans (CRUD)
Travel plan fields include:
- Destination  
- Date range  
- Budget  
- Travel type  
- Description  

Additional features:
- Search  
- Filter  

---

## 📘 API Endpoints Overview

### 🔑 **Authentication**

| Method | Endpoint              | Description         |
|--------|------------------------|---------------------|
| POST   | `/api/auth/register`   | Register new user   |
| POST   | `/api/auth/login`      | Login               |

---

### 👤 **Users**

| Method | Endpoint            | Description       |
|--------|----------------------|-------------------|
| GET    | `/api/users/:id`     | Get user profile  |
| PATCH  | `/api/users/:id`     | Update profile    |

---

### 🧳 **Travel Plans**

| Method | Endpoint                   | Description          |
|--------|-----------------------------|----------------------|
| POST   | `/api/travel-plans`        | Create travel plan   |
| GET    | `/api/travel-plans`        | Get all plans        |
| GET    | `/api/travel-plans/:id`    | Get single plan      |
| PATCH  | `/api/travel-plans/:id`    | Update plan          |
| DELETE | `/api/travel-plans/:id`    | Delete plan          |

---

### ⭐ **Reviews**

| Method | Endpoint                | Description      |
|--------|--------------------------|------------------|
| POST   | `/api/reviews`          | Add review       |
| PATCH  | `/api/reviews/:id`      | Update review    |
| DELETE | `/api/reviews/:id`      | Delete review    |

---

### 💳 **Payments**

| Method | Endpoint                            | Description            |
|--------|--------------------------------------|------------------------|
| POST   | `/api/payments/create-intent`       | Create payment intent  |

---


  

