import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sugarytestapi.azurewebsites.net", 
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("accessTokenExpiresAt");

  if (accessToken && expiresAt && new Date(expiresAt) <= new Date()) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await axios.post(
          "https://sugarytestapi.azurewebsites.net/AdminAccount/RefreshToken",
          { refreshToken }
        );

        const {
          Token,
          RefreshToken,
          AccessTokenExpiresAt,
          RefreshTokenExpiresAt,
        } = refreshResponse.data;

        localStorage.setItem("accessToken", Token);
        localStorage.setItem("refreshToken", RefreshToken);
        localStorage.setItem("accessTokenExpiresAt", AccessTokenExpiresAt);
        localStorage.setItem("refreshTokenExpiresAt", RefreshTokenExpiresAt);

        processQueue(null, Token);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token) => {
          config.headers["Authorization"] = `Bearer ${token}`;
          resolve(config);
        },
        reject: (err) => reject(err),
      });
    });
  }


  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
}),
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const refreshResponse = await axios.post(
            "/AdminAccount/RefreshToken", // your actual endpoint
            { refreshToken }
          );

          const { Token, RefreshToken } = refreshResponse.data;

          localStorage.setItem("accessToken", Token);
          localStorage.setItem("refreshToken", RefreshToken);

          processQueue(null, Token);

          originalRequest.headers["Authorization"] = `Bearer ${Token}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

export default axiosInstance;
