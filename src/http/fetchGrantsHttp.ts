import axios from "axios";

//Custom axios, for base url
const _axios = axios.create({
    baseURL: process.env.API_URL,
})

export const fetchGrantsHttp = {
    getAllProfs: (): Promise<any> => _axios.get('/getAllProfs'),
    getAllBranches: (): Promise<any> => _axios.get('/getBranches'),

    fetchProfsBySubjects: (firstSubject: string, secondSubject: string | null): Promise<any> => {
        return _axios.post('/fetchProfsBySubjects', {
            firstSubject,
            secondSubject
        })
    },
    //Выбор специальностей ТОЛЬКО по branches
    fetchProfsByBranches: (selectedBranch: string, firstSubject: string | null, secondSubject: string | null): Promise<any> => _axios.post('/fetchProfsByBranches', {
        selectedBranch,
        firstSubject,
        secondSubject
    }),

    fetchBranchesBySubjects(firstSubject: object, secondSubject: object): Promise<any> {
        return _axios.post(`/branches/_getBranchesBySubjects`, {
            firstSubject,
            secondSubject
        })
    }

}