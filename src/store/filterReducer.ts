import {fetchGrantsHttp} from "../http/fetchGrantsHttp";

interface Subject {
    name: string,
    short: string,
    share: Array<string>,
    icon: any,
}
interface FilterReducer {
    firstSubject: Subject | null,
    secondSubject: Subject | null,
    score: number | null,
    currentArea: string,
    currentLanguage: string,
    profs: []
}


const defaultStore: FilterReducer = {
    firstSubject: null,
    secondSubject: null,
    score: null,
    currentArea: 'all',
    currentLanguage: 'kz',
    profs: []
}

const {fetchBranchesBySubjects,fetchProfsBySubjects, fetchProfsByBranches} = fetchGrantsHttp

const FilterReducer = (state = defaultStore, action: any) => {
    const {currentArea, firstSubject, secondSubject} = state
    switch (action.type) {
        case 'profsByBranches':
            fetchProfsByBranches(currentArea, firstSubject.short, secondSubject.short)
                .then(data => ({...state, profs: data.data}))
            break;
        case 'profsBySubjects':
            fetchProfsBySubjects(firstSubject.short, secondSubject !== null ? secondSubject.short : null)
                .then(data => ({...state, profs: data.data}))
            break;
        case 'branchesBySubjects':
            fetchGrantsHttp.fetchBranchesBySubjects(firstSubject, secondSubject)
                .then(data => ({...state, profs: data.data}))
    }
}