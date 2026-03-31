# University GUI Programming Project Report
**Project:** Aarsan Store (Vue 3 E-Commerce SPA)

## Introduction
The Aarsan Store is a modern, Single Page Application built to simulate a premium e-commerce tech gadget marketplace. Designed with an emphasis on both aesthetic polish and robust architectural principles, the application provides a smooth user experience akin to modern, high-end retail applications.

## Project Objective
The central objective was to develop a fully functional frontend e-commerce interface using Vue 3 and TypeScript, demonstrating proficiency in component-based architecture, client-side routing, global state management, and modern CSS frameworks (Tailwind CSS) while adhering to strict code formatting and design standards.

## Features Implemented
- **Dynamic Product Rendering**: Sourced from DummyJSON REST APIs.
- **Client-Side Routing**: Navigating seamlessly between Home, Product Details, and Login views.
- **Global State Management**: Utilizing Pinia to manage asynchronous User Authentication and reactive Cart data.
- **Data Persistence**: LocalStorage implementation to retain cart selections and auth tokens across sessions.
- **Dynamic Search & Filtering**: Real-time querying by string match and categorized filtering.
- **Dark Mode**: Fully implemented system-aware and toggleable dark theme.
- **Responsive UI/UX**: Custom skeleton loaders, empty states, and error handling with fluid breakpoints.

## Architecture Summary
The application follows a strictly modular architecture:
- `views/` dictate the primary page layouts mapped to router end-points.
- `components/` handle highly reusable, stateless (or localized state) UI elements (e.g. `FilterBar`, `ProductCard`).
- `stores/` manage global business logic using the Pinia library (e.g. `mainStore`).
- `services/` encapsulate API communications using Axios, ensuring Vue components remain decoupled from HTTP complexities.
- `composables/` abstract specific Vue lifecycle operations like scroll locking or theme toggling.

## Component Hierarchy Summary
- **App.vue** (Root Layout)
  - **NavBar.vue** (Search, Nav, Auth Status, Theme Toggle)
  - **CartDrawer.vue** (Slide-out Cart Panel)
  - **RouterView** (Dynamic Page Content)
    - -> **HomeView.vue** (Hero Banner + FilterBar.vue + ProductCard.vue grid)
    - -> **ProductDetailView.vue** (Deep-dive item inspection)
    - -> **LoginView.vue** (Authentication Sandbox)

## API Usage Summary
The application connects to `https://dummyjson.com` for rapid mock data ingestion. Axios is pre-configured with a base URL, and specific wrapper functions export typed promises:
- `fetchProducts(limit, skip)`
- `fetchProductById(id)`
- `searchProducts(query)`
- `fetchCategories()`
- `fetchProductsByCategory(category)`

## TypeScript Usage Summary
Strict TypeScript configurations are enforced. The application boasts zero `any` types. All API payloads map directly to strongly typed models (`Product`, `User`, `CartItem`) stored centrally in `src/types/index.ts`. All Vue composition hooks (ref, computed) are explicitly typed, and `try/catch` error objects are guarded as `unknown` and verified via `instanceof Error`.

## Advanced Features Added
- **Global Theme Persistence**: Dark/Light mode tracking via deep Tailwind integration.
- **Deep Linking**: Direct URL manipulation (`/products/:id` and query string states) mapping smoothly via Vue Router.
- **Micro-Animations**: Hover delays, opacity transitions, cart counting badges, and custom grid loaders.

## Conclusion
The outcome is a highly responsive and maintainable SPA. By leveraging the Composition API and Pinia alongside a strict TypeScript compiler, the project successfully fulfills the criteria of a high-grade GUI Programming assignment, delivering flawless data handling alongside an exceptionally polished user interface.
