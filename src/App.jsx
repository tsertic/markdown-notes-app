import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Editor from "./pages/Editor";
const App = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Navbar />{" "}
      <main className="container mx-auto  text-slate-900 dark:text-white">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <div className="p-4">
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="p-4">
                <Register />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
