import axios from "axios";
import React, { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      console.log(config);
      return config;
    });

    //response interceptors
    const resInterseptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const statusCode = err.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterseptor);
    };
  }, [user, navigate, signOutUser]);
  return axiosSecure;
};

export default useAxiosSecure;
