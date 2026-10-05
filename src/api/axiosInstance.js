import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://music-playlist-organizer-backend-1.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);

    // If you later use authentication/token:
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Response Error:", error.response.status);

      if (error.response.status === 401) {
        alert("Unauthorized. Please login again.");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
      }

      if (error.response.status === 404) {
        alert("Requested data not found.");
      }

      if (error.response.status >= 500) {
        alert("Server error. Please try again later.");
      }
    } else {
      alert("Unable to connect to the server.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;