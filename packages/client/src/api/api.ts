import axios, { AxiosInstance, AxiosRequestConfig} from "axios";

const axiosParams = {
  baseURL: "http://localhost:3000",
}

const axiosInstance: AxiosInstance = axios.create(axiosParams)

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config: AxiosRequestConfig = {}) => axios.get(url, config),
    post: (url: string, body: object = {}, config: AxiosRequestConfig = {}) => axios.post(url, body, config),
    put: (url: string, body: object = {}, config: AxiosRequestConfig = {}) => axios.put(url, body, config),
    patch: (url: string, body: object = {}, config: AxiosRequestConfig = {}) => axios.patch(url, body, config),
    delete: (url: string, config: AxiosRequestConfig = {}) => axios.delete(url, config),
  }
}

export default api(axiosInstance)