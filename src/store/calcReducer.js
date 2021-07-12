import {keys} from "@material-ui/core/styles/createBreakpoints"

const emptyArr = () => {
    return Array.from({length: 4}).fill(null)
}

const defaultStore = {
    firstSubject: null,
    secondSubject: null,
    selectedSubjectIndexToChange: null,
    selectedStepIndex: 0,
    score: null,
    /**
     * Выбранные областьи/специльности
     */
    selectedAreas: emptyArr(),
    allProfs: {},
    allBranches: [],
    allFilteredProfs: [],
    /**
     * Индекс области или специальности
     * 0 - облатсь
     * 1 - специальности*/
    selectedAreaIndex: 0,
    selectedAreaListIndex: null,
    profs: emptyArr(),
    branches: emptyArr(),
    selectedGrantCode: null,
    allGrants: [],
    profsCount: 0,
    tempProfs: []
}
export default (state = defaultStore, action) => {
    /*
    * Функция позволяющая устанавливать динамически состояние
    * stateName - данный параметр - имя свойства для изменения*/
    const setState = (stateName) => {
        return {...state, [stateName]: action.value}
    }
    return Object.keys(defaultStore).reduce((acc,key,index, arr)=>{
        if(key === action.type) {
            acc.res = setState(key)
            arr.splice(1)
            return acc
        }
        return acc
    },{res: state}).res
}
