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
}
export default (state = defaultStore, action) => {
    /*
    * Функция позволяющая устанавливать динамически состояние
    * stateName - данный параметр - имя свойства для изменения*/
    const setState = (stateName) => {
        return {...state, [stateName]: action.value}
    }


    switch (action.type) {
        case 'firstSubject':
            return setState('firstSubject')
        case 'secondSubject':
            return setState('secondSubject')
        case 'selectedSubjectIndexToChange':
            return setState('selectedSubjectIndexToChange')
        case 'selectedStepIndex':
            return setState('selectedStepIndex')
        case 'score':
            return setState('score')
        case 'profs':
            return setState('profs')
        case 'branches':
            return setState('branches')
        case 'allProfs':
            return setState('allProfs')
        case 'selectedAreaIndex':
            return setState('selectedAreaIndex')
        case 'selectedAreaListIndex':
            return setState('selectedAreaListIndex')
        case 'allFilteredProfs':
            return setState('allFilteredProfs')
        case 'allBranches':
            return setState('allBranches')
        case 'selectedGrantCode':
            return setState('selectedGrantCode')
        case 'allGrants':
            return setState('allGrants')
        default:
            return state
    }
}