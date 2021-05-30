import {useSelector} from "react-redux"

export const useSelectorCalc = (optionName) => {
    return useSelector(state => state.calc[optionName])
}