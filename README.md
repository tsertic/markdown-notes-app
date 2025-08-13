# Markdown Notes App

A responsive, real-time Markdown notes application built with React and Firebase. This project features secure user authentication, a cloud-stored notes database, and a live-preview editor, all packaged within a simple UI that supports dark mode and is fully dockerized for easy setup.

## Features

- **🔐 Secure Authentication:** Sign up and log in using Email/Password or a Google account via Firebase Authentication.
- **📝 Real-Time CRUD:** Create, read, update, and delete notes instantly. All changes are synced in real-time across your devices thanks to Firestore.
- **✒️ Markdown Editor:** Write notes in a clean editor with a side-by-side live preview. Supports GitHub Flavored Markdown (tables, checklists, etc.).
- **☁️ Cloud Storage:** Your notes are securely stored in a personal Firestore subcollection, accessible only by you.
- **🌓 Dark/Light Mode:** A sleek theme toggle to switch between dark and light modes. Your preference is saved locally.
- **📱 Responsive Design:** A mobile-first UI that works beautifully on any screen size, from phones to desktops.
- **🐳 Dockerized:** The entire application can be built and run with a single command using Docker Compose, ensuring a consistent environment.

## Built With

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Backend & DB:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown)
- **Containerization:** [Docker](https://www.docker.com/)

---

## 🚀 Getting Started

There are two ways to run this project locally: using Docker (recommended for a quick setup) or by setting up the local development environment.

### 1. Environment Variables

Both methods require you to set up your own Firebase credentials.

1.  Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2.  Enable **Authentication** (Email/Password and Google providers).
3.  Enable **Firestore Database**.
4.  Go to **Project Settings** > **General** and register a new web app to get your `firebaseConfig` keys.
5.  In the root of this project, create a file named `.env`.
6.  Copy the contents of `env.example` (or the block below) into `.env` and fill in the values with your Firebase keys.

```
# .env

VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 2. Running with Docker (Recommended)

This is the easiest way to get the application running, as it handles all dependencies within a container.

**Prerequisites:**

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/)

**Steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/markdown-notes-app.git
   cd markdown-notes-app
   ```
2. Create and populate your `.env` file as described in the **Environment Variables** section above.

3. Build and run the container using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. The application will be available at **`http://localhost:8080`**.

### 3. Local Development Setup (Without Docker)

Use this method if you want to modify the code and see changes with hot-reloading.

**Prerequisites:**

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/)

**Steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/markdown-notes-app.git
   cd markdown-notes-app
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Create and populate your `.env` file as described in the **Environment Variables** section above.

4. Start the development server:
   ```bash
   npm run dev
   ```
5. The application will be available at **`http://localhost:5173`** (or another port if 5173 is busy).

## Deployment

This application is ready for deployment on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

1.  Push your project to a GitHub repository.
2.  Connect your repository to Vercel or Netlify.
3.  Set up the **environment variables** (e.g., `VITE_FIREBASE_API_KEY`) in the project settings on the hosting platform.
4.  The platform will automatically build and deploy the site. The standard build command (`npm run build`) and output directory (`dist`) should work without changes.
