# CodeV1be Social Web

A fullstack social media platform built by the CodeV1be Team for sharing stories.

---

## Project Overview

This project is a modern social media platform built to demonstrate fullstack capabilities using Next.js and Node.js.  

**Key Highlights:**
- User authentication with db sessions
- CRUD operations for posts and user profiles
- Image uploads via Cloudinary
- Efficient client-side caching with React Query
- Modal previews with Next.js App Router intercepted routes

---

## Architecture

**Backend:**  
- Node.js, Express.js 
- MongoDB with Mongoose ORM  
- Centralized error handling and input validation with `celebrate`  

**Frontend:**  
- Next.js 14 App Router  
- Server and Client components separation  
- React Query for data fetching and caching  
- Modern-normalize + CSS Modules for styling

---

## Technologies

| Layer      | Technologies |
|------------|--------------|
| Frontend   | Next.js, React, React Query |
| Backend    | Node.js, Express, MongoDB, Mongoose, Celebrate |
| Deployment | Render.com, Vercel.com |
| Other      | Cloudinary for media |

---

## Features

- User registration, login, logout
- DB sessions & refresh token authentication
- CRUD for posts and users
- Image uploads
- Real-time modals with intercepted routes
- Category-based filtering

---

## Technical Challenges Solved

- Handling secure JWT authentication and refresh tokens  
- Optimizing server/client rendering with Next.js App Router  
- Implementing modal previews without full page reload  
- Managing React Query cache efficiently  
- Configuring CORS and environment variables for multiple services  
- Deploying backend and frontend separately on Render  

---

## Getting Started

**Requirements:**
- Node.js >= 20
- npm
- MongoDB instance

**Steps:**
- git clone https://github.com/Diamond-FoxUA/codev1be-social-web
- cd codev1be-social
- npm install
- cp .env.example .env
# fill in your environment variables
- npm run dev