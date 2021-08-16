import React, {useEffect} from "react"
import Form from './form'
import AllProfs from '../../components/allProfs'
import Grants from './grants'
import Info from 'cpm/info'
import {useSelectorCalc} from "../../hooks/useSelector"
import {Box, Typography, useMediaQuery, useTheme} from "@material-ui/core"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"


export default function () {
    const selectedStepIndex = useSelectorCalc('selectedStepIndex')
    const globalClasses = useGlobalClasses()
    const profsCount = useSelectorCalc('profsCount')
    const theme = useTheme()
    const isSm = !useMediaQuery(theme.breakpoints.up('sm'))
    useEffect(()=> {
        alert(isSm)
    }, [isSm])
    return <Box className={globalClasses.container}>
        {selectedStepIndex !== 3 ? <>
            <Form/>
            {!isSm && <>
                <Typography variant="h4" style={{display: 'inline-block', marginRight: 5}}>Специальности</Typography>
                <Info/>
            </>}
            <Typography variant="h4"
                        style={{display: 'inline-block', float: 'right'}}>{profsCount} Специальностей</Typography>
            <AllProfs/>
        </> : <Grants/>}
    </Box>

}