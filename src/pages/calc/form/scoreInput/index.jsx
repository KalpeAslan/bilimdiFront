import React from 'react'
import {TextField, useMediaQuery, Slider} from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux"
export default function ({isShowAlert}) {
    const isMobile = useMediaQuery('(min-width:600px)')
    const dispatch = useDispatch()
    const score = useSelector(state => state.calc.score)
    const handleChange = (event, newValue) => {
        dispatch({type: 'score', value: newValue})
    }
    return <React.Fragment>
        {isMobile ? <TextField error={isShowAlert} type="number" value={score} onChange={(e)=> handleChange(e,e.target.value)}
                               style={{width: '100%'}}
                               label="Введи свой балл" variant="outlined"/> :
        <Slider min={50} value={score} max={150} valueLabelDisplay="auto" onChange={handleChange}></Slider>}
    </React.Fragment>
}