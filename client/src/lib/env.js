export default {
    FRONTEND_URL: import.meta.env.PROD ? "https://impactathon-vote-org.vercel.app" : "http://localhost:4321",
    BACKEND_URL: import.meta.env.PROD ? "https://impactathon-vote-org.onrender.com" : "http://localhost:3000",
    PROD: import.meta.env.PROD,
  };
  