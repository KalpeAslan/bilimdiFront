import axios from "axios";
import calcStore from 'store/'

class Calc {

    private filteredBySubjProfs: Object = {}

    getAllProfs() {
        return axios.get('http://localhost:4000/allProfs')
    }

    getFilteredBySubjProfs(): Object {
        const firstSubject = calcStore.getState().calc.firstSubject
        const secondSubject = calcStore.getState().calc.secondSubject
        const allProfs: Object = calcStore.getState().calc.allProfs
        this.filteredBySubjProfs = Object.entries(allProfs).reduce((acc, [subjectKey, profsValue]) => {
            if ((firstSubject !== null && secondSubject !== null)) {
                const firstSubjectShort: string = firstSubject.short.toLowerCase()
                const secondSubjectShort: string = secondSubject.short.toLowerCase()
                const isSubjInlcudes = (subj1: string, subj2: string): Boolean => {
                    return subjectKey.toLowerCase().includes(subj1 + subj2)
                }
                if (isSubjInlcudes(firstSubjectShort, secondSubjectShort) || isSubjInlcudes(secondSubjectShort, firstSubjectShort)) {
                    acc[subjectKey] = profsValue
                }
            } else {
                [firstSubject, secondSubject].filter(subj => subj !== null).forEach(subj => {
                    if (subjectKey.toLowerCase().includes(subj.short.toLowerCase())) {
                        acc[subjectKey] = profsValue
                    }
                })
            }
            return acc
        }, {})
        return this.filteredBySubjProfs
    }

    // TODO фильтрация професии по баллам
    // getFilteredByScore(score: number): Object {
    //     const res =  Object.entries(this.filteredBySubjProfs).reduce((acc, [keySubj, profsValue]) => {
    //         profsValue = profsValue.filter(prof => Number(prof.min) < score)
    //         acc[keySubj] = profsValue
    //         return acc
    //     }, {})
    //     console.log(res)
    //     return res
    // }
}

export default new Calc()