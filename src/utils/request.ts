import Axios, { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';

const request = Axios.create()

request.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data;
  }
});

export interface RequestInstance {
  (config: AxiosRequestConfig): any;
  (url: string, config?: AxiosRequestConfig): any;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = T> (config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

export default request as RequestInstance