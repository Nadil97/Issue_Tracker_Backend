# Issue Tracker - Frontend

A professional, responsive, and feature-rich frontend for the Issue Tracking System, built with **React**, **TypeScript**, and **Vite**.

## 🚀 Features
- **Dashboard**: High-level overview of issue statistics and real-time updates.
- **Issue Management**: Create, edit, and delete issues with ease.
- **Advanced Assignments**: Assign multiple team members to a single issue using a custom, creative multi-select UI.
- **Permissions-Aware**: Smart UI that hides/shows actions based on user roles (Creator vs. Assignee).
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Clean Architecture**: Follows best practices with reusable UI components and specialized services.

## 🛠️ Technology Stack
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
The application uses a centralized constants file for API configuration.
- Open `src/utils/constants.ts`.
- Ensure `API_BASE_URL` points to your backend (currently set to the production Netlify endpoint).

### Running Locally
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🏗️ Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` folder, ready to be deployed to Netlify, Vercel, or any static hosting provider.

## 📂 Project Structure
- `src/components/ui`: Reusable UI elements (Buttons, Inputs, Modals, MultiSelect).
- `src/components/issues`: Issue-specific components like forms and lists.
- `src/pages`: Main page components for routing.
- `src/services`: API communication services.
- `src/hooks`: Custom React hooks for business logic.
- `src/utils`: Helper functions and global constants.

## 🤝 Contribution
1. Create a new branch for your feature.
2. Ensure code follows the established ESLint and Prettier rules.
3. Submit a Pull Request for review.
