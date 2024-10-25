import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosParams: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
};

export const axiosInstance: AxiosInstance = axios.create(axiosParams);

export const axiosPrivateInstance: AxiosInstance = axios.create({ withCredentials: true, ...axiosParams });
