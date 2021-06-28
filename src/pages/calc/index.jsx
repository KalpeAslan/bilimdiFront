import React, {useState} from "react"
import Form from './form'
import AllProfs from '../../components/allProfs'
import Grants from './grants'
import Info from 'cpm/info'
import {useSelectorCalc} from "../../hooks/useSelector"
import {Typography} from "@material-ui/core"

export default function () {
    const selectedStepIndex = useSelectorCalc('selectedStepIndex')
    const profsCount = useSelectorCalc('profsCount')
    return <>
        {selectedStepIndex !== 3 ? <>
            <Form/>
            <Typography variant="h4" style={{display: 'inline-block', marginRight: 5}}>Специальности</Typography>
            <Info/>
            <Typography variant="h4"
                        style={{display: 'inline-block', float: 'right'}}>{profsCount} Специальностей</Typography>
            <AllProfs/>
        </> : <Grants/>}
    </>

}