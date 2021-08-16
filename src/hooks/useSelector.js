import {useSelector} from "react-redux"

export const useSelectorCalc = (optionName) => {
    return useSelector(state => state.calc[optionName])
}


export const useSelectorGlobal = (optionName) => {
    return useSelector(state => state.global[optionName])
}