import { ISystemServices } from './../system/systemService';
import axios from "axios";
import { systemServices} from "../system/systemService";

const http = axios.create({
    baseURL: process.env.API_URL,
})


class HttpService {

    constructor(private systemServices: ISystemServices) {
    }

    getPromise(url: string, options?): Promise<any> {
        return http.get(url + '?lang=' + this.systemServices.getCurrentLanguage, options).then(res => res.data)
    }

    postPromise(url: string, body: {}, options?): Promise<any> {
        return http.post(url + '?lang=' + this.systemServices.getCurrentLanguage, body, options).then(res => res.data)
    }
}

export const httpService = new HttpService(systemServices)
export type IHttpService = typeof httpService