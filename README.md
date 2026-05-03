# Aarz Store - Premium Tech Essentials

## Project Overview
Aarz Store is a modern, responsive Single Page Application (SPA) built for purchasing premium tech gadgets. It seamlessly integrates a rich product catalog with dynamic filtering, real-time search, cart management, user authentication simulation, and a dark mode interface.

## Features
- **Product Catalog & Detail View**: Browse a responsive grid of products sourced from a mock API. Click any product to view detailed specifications, image galleries, and pricing.
- **Dynamic Search & Filtering**: Instantly search for gadgets or filter by specific categories retrieved dynamically from the backend.
- **Shopping Cart**: Add, remove, and update quantities via a slide-over cart drawer that calculates totals in real-time.
- **State Persistence**: Your cart and login sessions are automatically saved to `localStorage`, persisting your data across page reloads.
- **Authentication**: A simulated login flow with error handling and visual feedback.
- **Dark Mode Support**: A polished, modern dark mode implementation that respects user preferences.
- **Responsive Design**: Carefully crafted layouts utilizing Tailwind CSS ensuring the app looks beautiful on mobile, tablet, and desktop devices.

## Technologies Used
- **Vue 3**: Composition API & `<script setup>` syntax
- **TypeScript**: Strict typing with zero `any` usage for robust code
- **Vite**: Ultra-fast frontend tooling
- **Pinia**: Intuitive, flexible, type-safe state management
- **Vue Router**: Client-side routing for SPA views
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI styling
- **Axios**: Promised-based HTTP client for API requests

## Folder Structure
```
src/
├── assets/          # Static assets like images and global CSS
├── components/      # Reusable UI components (ProductCard, NavBar, CartDrawer)
├── composables/     # Shared Vue composition functions (useDarkMode, useScrollLock)
├── router/          # Vue Router configuration and route definitions
├── services/        # API integration (axios instances and fetch wrappers)
├── stores/          # Pinia state management (mainStore)
├── types/           # Global TypeScript interfaces and type definitions
├── views/           # Top-level page components (Home, Login, ProductDetail)
├── App.vue          # Root application component
└── main.ts          # Application entry point & plugin initialization
```

## Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GUI-Mini-Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Run Steps
Start the local development server:
```bash
npm run dev
```
Open the provided local URL (typically `http://localhost:5173`) in your web browser.

## Major Components
- **HomeView**: The landing page displaying the hero banner, category filters, and a responsive product grid.
- **ProductDetailView**: A dedicated page displaying comprehensive product information, galleries, and "Add to Cart" functions.
- **LoginView**: Simulates a secure user authentication portal.
- **mainStore**: The overarching Pinia store responsible for coordinating User Auth and Shopping Cart state globally.
