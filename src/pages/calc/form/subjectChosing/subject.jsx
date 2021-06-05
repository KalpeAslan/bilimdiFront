import React, {useEffect, useState} from "react"
import SubjectItem from './subjectItem.jsx'
import {List, makeStyles, Box, Typography} from "@material-ui/core"
import ModalFade from 'cpm/modalFade'
import {useDispatch, useSelector} from "react-redux"
import subjectsAll from 'services/calc/subjectsAll'
import classNames from "classnames"

const allSubjects = subjectsAll('ru')

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        transition: 'transform 0.4s',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
    listWrapper: {
        transition: 'transform 0.4s',
        transform: 'translateX(-320px)'
    },
    list: {
        width: 320,
        overflowY: 'auto',
        maxHeight: '80vh',
    },
}))
function getCombinedSubjects(firstSubject) {
    let combinedSubject = []
    firstSubject.share.forEach(shared => {
        allSubjects.filter(subject => {
            if (subject.short === shared) {
                combinedSubject.push(subject)
            }
        })
    })
    /*
    * Функци получает параметром первый выбранный предмет,
    * затем возвращает применимые ему комбанции предметов
    * type: Array<Object>*/
    return combinedSubject
}

export default function ({openModal, setOpenModal}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [secondSubjects, setSecondSubject] = useState([])
    const firstSubject = useSelector(state => state.calc.firstSubject)
    const secondSubject = useSelector(state => state.calc.secondSubject)
    const [showNextSubject, setShowNextSubject] = useState(false)
    const selectedSubjectIndexToChange = useSelector(state => state.calc.selectedSubjectIndexToChange)

    useEffect(() => {
        if(openModal === true && selectedSubjectIndexToChange !== null) {
            if(selectedSubjectIndexToChange === 0) {
                setShowNextSubject(false)
            }
        }
    }, [openModal])

    const clickFirstSubject = (subject) => {
        setShowNextSubject(true)
        const combinedSubjects = getCombinedSubjects(subject)
        setSecondSubject(getCombinedSubjects(subject))
        dispatch({type: 'firstSubject', value: subject})
        if(secondSubject !== null && !combinedSubjects.includes(secondSubject)) {
            dispatch({type: 'secondSubject', value: null})
        }
    }

    const clickSecondSubject = (subject) => {
        setOpenModal(false)
        dispatch({type: 'secondSubject', value: subject})
    }

    const firstSubjectsView = <Box width={320} display="flex" flexDirection="column"
                                   className={classNames({
                                       [classes.listWrapper]: showNextSubject
                                   })}>
        <Typography variant="h5" style={{padding: 16}}>
            Выбери первый предмет
        </Typography>
        <List className={classes.list}>
            {allSubjects.map(subject => {
                return <SubjectItem selected={firstSubject === subject} click={() => clickFirstSubject(subject)}
                                    key={subject.name} name={subject.name} icon={subject.icon} button/>
            })}
        </List>
    </Box>
    const secondSubjectsView = <Box display="flex" flexDirection="column" className={classNames({
        [classes.listWrapper]: showNextSubject
    })}>
        <Typography variant="h5" style={{padding: 16}}>
            Выбери второй предмет
        </Typography>
        <List className={classes.list}>
            {secondSubjects.map(subject => {
                return <SubjectItem selected={secondSubject === subject} click={() => clickSecondSubject(subject)}
                                    key={subject.name} name={subject.name} icon={subject.icon} button/>
            })}
        </List>
    </Box>

    return <ModalFade setOpenModal={setOpenModal} openModal={openModal}>
        <Box display="flex" width={320} className={classes.wrapper}>
            {firstSubjectsView}
            {secondSubjectsView}
        </Box>
    </ModalFade>
}