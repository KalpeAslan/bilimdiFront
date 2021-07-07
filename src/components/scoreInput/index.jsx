import React, {useRef} from 'react'
import {TextField, useMediaQuery, Slider, useTheme} from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux"

export default function ({isShowAlert}) {
    const theme = useTheme()
    const ref = useRef()
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'))
    const dispatch = useDispatch()
    const score = useSelector(state => state.calc.score)
    const handleChange = (event) => {
        event.target.value = event.target.value.slice(0, 3)
        if(event.target.value.length !== 4) {
            dispatch({type: 'score', value: event.target.value})
        }
    }
    return <React.Fragment>
        {!isMobile ? <TextField error={isShowAlert} type="number" value={score}
                                onInput={handleChange}
                                style={{width: '100%', margin: '10px 0'}}
                                label="Введи свой балл" variant="outlined"/> :
            <input type="range" min={50} value={score} max={150}
                   onChange={(event) => handleChange(event)}></input>}
    </React.Fragment>
}