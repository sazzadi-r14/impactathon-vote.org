export default {
    FRONTEND_URL: import.meta.env.PROD ? "" : "http://localhost:4321",
    BACKEND_URL: import.meta.env.PROD ? "" : "http://localhost:8080",
    PROD: import.meta.env.PROD,
  };
  