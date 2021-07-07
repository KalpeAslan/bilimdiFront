import axios from "axios";
import store from 'store/'


type grantsByBranches = Array<object>

class Calc {

    private filteredBySubjProfs: Object = {}

    public getAllProfs(): Promise<any> {
        return axios.get('http://localhost:4000/allProfs')
    }

    public getFilteredBySubjProfs(allProfs: Object): Object {
        const firstSubject = store.getState().calc.firstSubject
        const secondSubject = store.getState().calc.secondSubject
        console.log(allProfs)
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


        if (firstSubject || secondSubject)

            return axios.post(`${process.env.API_URL}/branches/postBranches`, {
                full: firstSubject.short.toLowerCase() + secondSubject.short.toLowerCase(),
                reverse: secondSubject.short.toLowerCase() + firstSubject.short.toLowerCase(),
            }).then(data => {
                return data.data
            })
    }


    public _getBranchesBySubjects(firstSubject: string, secondSubject: string) {
        return axios.post(`${process.env.API_URL}/branches/_getBranchesBySubjects`, {
            firstSubject,
            secondSubject
        })
    }

    /*
    * запрос на сервер для грантов*/

    async getGrants(): Promise<grantsByBranches> {
        const myStore = store.getState().calc
        const selectedAreaIndex = myStore.selectedAreaIndex
        const selectedAreas = myStore[selectedAreaIndex === 0 ? 'branches' : 'profs']
        return await axios.post(`${process.env.API_URL}/branches/setProfsByBraches`, {
            score: myStore.score,
            branches: selectedAreas,
            subjects: myStore.firstSubject.short.toLowerCase() + myStore.secondSubject.short.toLowerCase()
        }).then(data => {
            return data.data
        })
    }

    /**
     * Func возвращающая информацию о гранте
     * На оснавании его коде
     * code - код Выбранной специальности
     * */
    public getAboutGrant(code: string): Object {
        return store.getState().calc.allGrants[code]
    }

    public getProfsBySelectedBranch(allProfs: Object, selectedBranch: string, firstSubject: object | null, secondSubject: object | null): Array<object> {
        return Object.keys(allProfs).reduce((acc, subjectKey) => {
            Object.keys(allProfs[subjectKey]).forEach(branchKey => {
                if (branchKey === selectedBranch) Object.entries(allProfs[subjectKey][branchKey]).forEach(([codeProf, prof]) => {
                    if (!firstSubject && !secondSubject) return acc.push(prof)
                    const firstSubjectShort = firstSubject.short.toLowerCase()
                    if (firstSubject && !secondSubject && subjectKey.includes(firstSubjectShort)) return acc.push(prof)
                    if (firstSubject && secondSubject && (subjectKey === firstSubjectShort + secondSubject.short.toLowerCase()
                        || subjectKey === secondSubject.short.toLowerCase() + firstSubjectShort)) return acc.push(prof)
                })
            })
            return acc
        }, [])
    }

}

export default new Calc()