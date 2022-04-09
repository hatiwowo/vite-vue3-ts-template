import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import netconfig from '@/config/netconfig';

function showMessage(message: string, type: MsgType = 'info') {
    console.log(message, type);
    return;
}

class Requestor {
    private instance: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
        this.instance.interceptors.request.use(this.reqInterceptor, (err: AxiosError) => {
            return Promise.reject(err);
        });
        this.instance.interceptors.response.use(this.resInterceptor, (err: AxiosError) => {
            const { response } = err;
            if (response) {
                showMessage(response.data);
                return Promise.reject(response.data);
            }
            return Promise.reject(err);
        });
    }
    private reqInterceptor(config: AxiosRequestConfig) {
        return config;
    }
    private resInterceptor(response: AxiosResponse) {
        const res = response.data;
        const code = response.data.code;
        let result;
        switch (code) {
            case 200:
                delete res.code;
                result = res;
                break;
            default:
                showMessage(res);
                result = Promise.reject(res);
                break;
        }
        return result;
    }
    private errorHandler(err: AxiosError) {
        return Promise.reject(err.message || err);
    }
    get<T = any>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): TO<T> {
        if (params) {
            config = config ? config : ({} as AxiosRequestConfig);
            config.params = params;
        }
        return this.preRequest(url, 'get', config);
    }
    post<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): TO<T> {
        return this.preRequest(url, 'post', config, data);
    }
    put<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): TO<T> {
        return this.preRequest(url, 'put', config, data);
    }
    delete<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): TO<T> {
        return this.preRequest(url, 'delete', config, data);
    }
    upload<T = any>(url: string, file: File | FormData): TO<T> {
        return this.post(url, file, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    private preRequest<T>(url: string, method: string, config?: AxiosRequestConfig, data?: unknown): TO<T> {
        config = config ? config : ({} as AxiosRequestConfig);
        Object.assign(config, { url, method, data });
        return this.request(config);
    }
    request<T>(config: AxiosRequestConfig): TO<T> {
        return new Promise((resolve, reject) => {
            this.instance(config).then((res) => {
                resolve(res as unknown as TO<T>);
            }, reject);
        });
    }
}

const http = new Requestor({
    baseURL: netconfig.baseURL,
    timeout: netconfig.timeout
});

export default http;
