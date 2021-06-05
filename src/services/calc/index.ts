import axios from "axios";
import calcStore from 'store/'

class Calc {

    private filteredBySubjProfs: Object = {}

    public getAllProfs() {
        return axios.get('http://localhost:4000/allProfs')
    }

    private grants: Array<object> = []

    public getFilteredBySubjProfs(allProfs: Object): Object {
        const firstSubject = calcStore.getState().calc.firstSubject
        const secondSubject = calcStore.getState().calc.secondSubject
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


    public getBranchesBySubjects(firstSubject: object, secondSubject: object) {
        return axios.post(`${process.env.API_URL}/branches/postBranches`, {
            full: firstSubject.short.toLowerCase() + secondSubject.short.toLowerCase(),
            reverse: secondSubject.short.toLowerCase() + firstSubject.short.toLowerCase(),
        }).then(data => {
           return Object.keys(data.data)
        })
    }




    /*
    * Вычислить гранты*/

    private computeGrantsByAreas(selectedAreas) {
        return Object.keys(this._branches).map((key, i) => {
            const area = this._branches[key]
            //Проверка на выбранную область
            if (key === selectedAreas) {
                const score = calcStore.getState().calc.score
            }
        })
    }
}

export default new Calc()