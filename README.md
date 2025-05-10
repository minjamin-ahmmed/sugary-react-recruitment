# Sugary React Recruitment Project

A polished and fully functional React application built as part of the Sugary recruitment task.

## 🚀 Live Demo

> **[🔗 Live Site](https://authentication-system-with-react.netlify.app/)** 

---

## 📋 Task Overview

Build a React application with the following core features:

### 🔐 Authentication System

- **Login functionality** with secure token storage.
- **Refresh token handling** to maintain authenticated sessions.

### 📊 Dashboard Page

- A **dashboard** that is only accessible after login.
- Displays a **list of materials** fetched from an external API.
- Implements **lazy loading** to improve performance and user experience.

### 💅 UI/UX and Design

- Modern, clean, and responsive UI.
- Built with **Tailwind CSS** for fast, scalable styling.
- Thoughtful component design and UX-focused interactions.

---

## 🛠️ Technologies Used

- **React.js** – Frontend framework
- **React Router DOM** – Routing
- **Axios** – HTTP client
- **Tailwind CSS** – Utility-first CSS framework
- **React Toastify** – User-friendly toast notifications
- **Lucide Icons** – Icon library
- **Custom Lazy Loader** – For efficient scroll loading
- **Skeleton Loader** – For better loading UX

---

## 📷 Preview

### 🏠 Home Page  
![Home Page Screenshot](./assets/home-page.png)  
_Modern responsive homepage featuring navigation, hero section, and key features._

---

### 🔐 Login Page  
![Login Page Screenshot](./assets/login-page.png)  
_Clean login form with secure authentication and responsive layout._

---

### 📊 Dashboard Page  
![Dashboard Screenshot](./assets/dashboard.png)  
_Interactive dashboard displaying materials, statistics, and filterable tags._

---


## 📂 Project Structure

```bash
src/
├── Components/           # Shared UI components (SkeletonLoader, etc.)
├── Pages/
│   ├── Dashboard/        # Main dashboard logic & MaterialCard
│   ├── Home/             # Home page (public)
│   └── Login/            # Login page & form logic
├── routes/               # Route configuration and private route handling
├── utils/
│   └── encodeFilter.js   # Utility for encoding API filters
├── api/                  # Axios instance with interceptors
├── assets/               # Static files and media
├── App.jsx               # Main App component
├── main.jsx              # ReactDOM rendering
├── App.css               # Global styles
└── index.css             # Tailwind base styles
```
