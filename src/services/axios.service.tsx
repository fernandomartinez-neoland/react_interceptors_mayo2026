import axios from "axios";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("este es el interceptor");

    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado. Redirigiendo al login...");

      localStorage.removeItem("token");

      // Solución: Usar Vanilla JS para redirigir
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
