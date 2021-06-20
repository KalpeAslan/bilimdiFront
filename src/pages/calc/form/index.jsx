import React, {useEffect, useMemo, useState} from 'react'
import {makeStyles, Stepper, Step, StepButton, Box, Button, Fade, List} from '@material-ui/core'
import SubjectChoosing from './subjectChosing'
import AreaChoosing from './areaChosing'
import ScoreInput from './scoreInput/'
import {useDispatch} from "react-redux"
import {useSelectorCalc} from "hooks/useSelector"
import classNames from "classnames"
import {Alert, AlertTitle} from "@material-ui/lab"
import {Redirect} from 'react-router-dom'

const formWidth = '100%'

const useStyles = makeStyles((theme) => ({
    root: {
        width: formWidth,
        padding: 20,
        background: 'white',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid rgba(0, 0, 0, 0.12)'
    },
    alert: {
        position: 'absolute',
        top: '100px',
        zIndex: '1',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    calcInner: {
        overflowX: 'hidden',
        width: '100%',
        transition: 'transform 0.4s'
    },
}))

function getSteps() {
    return ['Выберите предмет', 'Введи свой балл', 'Выбери специлаьность']
}

let interval

export default function () {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isShowAlert, setIsShowAlert] = useState(false)
    const selectedStepIndex = useSelectorCalc('selectedStepIndex')
    const steps = getSteps()
    const getComponentByStep = useMemo(() => {
        switch (selectedStepIndex) {
            case 0:
                return <SubjectChoosing/>
            case 1:
                return <ScoreInput isShowAlert={isShowAlert}/>
            case 2:
                return <AreaChoosing/>
        }
    }, [selectedStepIndex])

    useEffect(() => {
        if (isShowAlert) {
            interval = setTimeout(() => {
                setIsShowAlert(false)
            }, 3000)
        } else {
            clearInterval(interval)
        }
    }, [isShowAlert])

    const setSelectedStepIndex = (index) => {
        dispatch({type: 'selectedStepIndex', value: index})
    }
    /*
    * Validating Steps
    * Begin*/
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    const score = useSelectorCalc('score')
    const [alertForm, setAlertForm] = useState({})
    const branches = useSelectorCalc('branches')
    const profs = useSelectorCalc('profs')
    const selectedAreaIndex = useSelectorCalc('selectedAreaIndex')
    const validateNextStepButton = () => {
        switch (selectedStepIndex) {
            case 0:
                if (firstSubject === null || secondSubject === null) {
                    setAlertForm({
                        title: 'Заполните все предметы',
                        desc: 'Для участие в ЕНТ заполните все предметы'
                    })
                    return setIsShowAlert(true)
                }
                return setSelectedStepIndex(selectedStepIndex + 1)
            case 1:
                if (score < 50 || score > 150) {
                    setAlertForm({
                        title: 'Введите балл от 50 до 150',
                        desc: 'Для получения гранта на ЕНТ, вам необходимо набрать от 50 баллов'
                    })
                    return setIsShowAlert(true)
                }
                return setSelectedStepIndex(selectedStepIndex + 1)
            case 2:
                const isBranch = selectedAreaIndex === 0
                const selectedArea = isBranch ? branches : profs
                if (selectedArea.every(area => area === null)) {
                    setAlertForm({
                        title: `Выберите хотя бы 1 ${isBranch ? 'область' : 'специальность'}`,
                        desc: `Для получения гранта на ЕНТ, вам необходимо набрать от 50 баллов`
                    })
                    return setIsShowAlert(true)
                }
                return setSelectedStepIndex(selectedStepIndex + 1)
        }
    }
    const alertScore = <Fade in={isShowAlert} timeout={500} className={classNames(classes.alert)}>
        <Alert severity="warning" onClose={() => setIsShowAlert(false)}>
            <AlertTitle style={{fontWeight: 'bold'}}>{alertForm.title}</AlertTitle>
            {alertForm.desc}
        </Alert>
    </Fade>
    /*
        * Validating Steps
        * End*/

    return (
        <Box className={classes.root}>
            {alertScore}
            <Stepper alternativeLabel nonLinear>
                {steps.map((label, index) => {
                    return <Step key={label}>
                        <StepButton onClick={() => setSelectedStepIndex(index)} active={selectedStepIndex === index}>
                            {label}
                        </StepButton>
                    </Step>
                })}
            </Stepper>
            <Box className={classes.calcInner}>
                {getComponentByStep}
            </Box>
            <Button variant="contained" color="primary" children="Следущий шаг"
                    onClick={validateNextStepButton}
                    style={{
                        width: '100%',
                        padding: '10px 0',
                        fontSize: 20,
                        fontWeight: 1000
                    }}/>
            {selectedStepIndex === 3 && <Redirect push to="/grants"/>}
        </Box>
    )
}


