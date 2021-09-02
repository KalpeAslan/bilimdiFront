import { IGrantsService, fetchGrantsHttp } from './grants/grantsService';
import { systemServices, ISystemServices } from './system/systemService';
import { httpService, IHttpService } from './http/httpService';

export const DIContainer = {
    systemServices,
    httpService,
    fetchGrantsHttp
}
export type IDIContainer = typeof DIContainer