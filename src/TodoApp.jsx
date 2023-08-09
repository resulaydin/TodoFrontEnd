import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Logout from "./pages/Logout";
import LoginPage from "./pages/LoginPage";
import Welcome from "./pages/Welcome";
import TodoList from "./components/TodoList";
import Error from "./pages/Error";
import AuthContext, { useAuth } from "./security/AuthContext";
import Todo from "./components/Todo";
import TodoFormik from "./components/TodoFormik";

const TodoApp = () => {
  const AuthenticationRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
      return children;
    }
    return <Navigate to="/login" />;
  };
  const { isLoggedIn } = useAuth();
  return (
    <div className="container">
      <Header />
      <Routes>
        {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}

        <Route
          path="/todos"
          element={
            <AuthenticationRoute>
              <TodoList />
            </AuthenticationRoute>
          }
        />

        <Route
          path="/todo/:id"
          element={
            <AuthenticationRoute>
              <Todo />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/todoFormik"
          element={
            <AuthenticationRoute>
              <TodoFormik />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthenticationRoute>
              <Logout />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/welcome/:username"
          element={
            <AuthenticationRoute>
              <Welcome />
            </AuthenticationRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default TodoApp;
