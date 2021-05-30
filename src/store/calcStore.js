
const defaultStore = {
    firstSubject: null,
    secondSubject:null,
    selectedSubjectIndexToChange: null,
    selectedStepIndex: 0,
    score: null,
    areas:  Array.from({length: 4}, (_, i) => {
        return {
            selectedArea: null
        }
    }),
    allProfs: {}
}
export default (state = defaultStore, action)=>{
    /*
    * Функция позволяющая устанавливать динамически состояние
    * stateName - данный параметр - имя свойства для изменения*/
    const setState = (stateName) => {
        return {...state, [stateName]: action.value}
    }
    switch (action.type){
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
        case 'area':
            return setState('area')
        case 'profs':
            return setState('profs')
        case 'allProfs':
            return setState('allProfs')
        default:
            return state
    }
}