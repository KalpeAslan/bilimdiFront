import { IHttpService } from './../http/httpService';
import {httpService} from "../http/httpService";

class GrantsService {
    constructor(private httpService: IHttpService) {
    }

    getAllProfs(): Promise<any> {
        return this.httpService.getPromise('/getAllProfs')
    }

    getAllBranches(): Promise<any> {
        return this.httpService.getPromise('/getBranches')
    }

    fetchProfsBySubjects(firstSubject: string, secondSubject: string | null): Promise<any> {
        return this.httpService.postPromise('/fetchProfsBySubjects', {
            firstSubject,
            secondSubject
        })
    }

//Выбор специальностей ТОЛЬКО по branches
    fetchProfsByBranches(selectedBranch: string, firstSubject: string | null, secondSubject: string | null): Promise<any> {
        return this.httpService.postPromise('/fetchProfsByBranches', {
            selectedBranch,
            firstSubject,
            secondSubject
        })
    }

    fetchBranchesBySubjects(firstSubject: object, secondSubject: object): Promise<any> {
        return this.httpService.postPromise(`/branches/getBranchesBySubjects`, {
            firstSubject,
            secondSubject
        })
    }

    postNewUser(values) {
        return this.httpService.postPromise('/postNewUser', values)
    }
}

export const fetchGrantsHttp = new GrantsService(httpService)
export type IGrantsService = typeof fetchGrantsHttp;

