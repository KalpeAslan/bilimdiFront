import React, {Fragment} from "react"
import Form from './form'
import AllProfs from './allProfs'
import Grants from './grants'
import Grant from "./grants/Grant"
import {useSelectorCalc} from "../../hooks/useSelector"

export default function () {
    const selectedStepIndex = useSelectorCalc('selectedStepIndex')
    const res = <Fragment>
        {selectedStepIndex !== 3 ? <Fragment>
            <Form/>
            <AllProfs/>
        </Fragment> : <Grants/>}
    </Fragment>
    return res

}