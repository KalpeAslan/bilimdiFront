import axios from "axios";
import store from 'store/'

const http = axios.create({
    baseURL: process.env.API_URL
})

export class HttpService {

    get currentLanguage(): string {
        return store.getState().global.currentLanguage
    }

    getPromise(url: string, options?): Promise<any> {
        return http.get(url + '?lang=' + this.currentLanguage, options).then(res => res.data)
    }

    postPromise(url: string, body: {}, options?): Promise<any> {
        return http.post(url + '?lang=' + this.currentLanguage, body, options).then(res => res.data)
    }
}
