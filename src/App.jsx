import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken, tokenKey } from "./Pages/Login/Auth/Auth";
import Layout from "./Pages/Layout/Layout";
import Login from "./Pages/Login/Login";

function App() {
  const navigate = useNavigate();
  const token = getToken(tokenKey);

  useEffect(() => {
      if (!token) {
          navigate("/login");
      }
  }, [navigate, token]);

  return token ? <Layout><Outlet /></Layout> : <Login />; 
}

export default App;
