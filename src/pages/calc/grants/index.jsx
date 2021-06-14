import React, {useMemo, useState} from "react"
import {Container} from "@material-ui/core"
import Results from './Results'
import Grant from './Grant'
import {useSelectorCalc} from "../../../hooks/useSelector"

export default function () {
    const [selectedGrantCode, setSelectedGrantCode] = useState(null)

    return <Container
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        {selectedGrantCode === null ? <Results setSelectedGrantCode={setSelectedGrantCode}/> : <Grant selectedGrantCode={selectedGrantCode}/>}
    </Container>
}

