import { store } from 'store/';

class SystemServices {
    get getCurrentLanguage(): string {
        return store.getState().global.currentLanguage
    }

    setLanguage(language: string): void {
        localStorage.setItem('current-language', language)
    }
}


export const systemServices = new SystemServices()

export type ISystemServices = typeof systemServices;