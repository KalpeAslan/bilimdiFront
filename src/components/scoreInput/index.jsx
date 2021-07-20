import React from 'react'
import {TextField} from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux"
import {useTranslate} from "../../hooks/useLocale"

export default function ({isShowAlert}) {
    const dispatch = useDispatch()
    const score = useSelector(state => state.calc.score)
    const handleChange = (event) => {
        event.target.value = event.target.value.slice(0, 3)
        if(event.target.value.length !== 4) {
            dispatch({type: 'score', value: event.target.value})
        }
    }
    return <TextField error={isShowAlert} type="number" value={score}
                      onInput={handleChange}
                      style={{width: '100%', margin: '10px 0'}}
                      label={useTranslate('Введи свой балл')} variant="outlined"/>
}