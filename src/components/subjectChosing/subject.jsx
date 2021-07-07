import React, {useEffect, useState} from "react"
import SubjectItem from './subjectItem.jsx'
import {List, makeStyles, Box, Typography, IconButton} from "@material-ui/core"
import ModalFade from 'cpm/modalFade'
import {useDispatch, useSelector} from "react-redux"
import subjectsAll from 'services/calc/subjectsAll'
import {ArrowBackIos} from "@material-ui/icons"

const allSubjects = subjectsAll('ru')
const modalWidth = 500
const md = 1000

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: modalWidth,
        [theme.breakpoints.down(md)]: {
            width: '80vw',
        },
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        '*': {
            transform: `translateX(-${modalWidth}px)`,
        }
    },
    listWrapper: {
        transition: 'transform 0.4s',
        transform: `translateX(-${modalWidth}px)`,
        [theme.breakpoints.down(md)]: {
            transform: 'translateX(-80vw)',
        },
    },
    list: {
        width: modalWidth,
        [theme.breakpoints.down(md)]: {
            width: '80vw',
        },
        overflowY: 'auto',
        maxHeight: '80vh',
    },
    modalTitle: {
        textAlign: 'center',
        padding: theme.spacing(2)
    }
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
    const [translateX, setTranslateX] = useState(0)
    const selectedSubjectIndexToChange = useSelector(state => state.calc.selectedSubjectIndexToChange)

    useEffect(() => {
        if (openModal === true && selectedSubjectIndexToChange !== null) {
            if (selectedSubjectIndexToChange === 0) {
                setTranslateX(0)
            }
        }
    }, [openModal])

    const clickFirstSubject = (subject) => {
        setTranslateX(500)
        const combinedSubjects = getCombinedSubjects(subject)
        setSecondSubject(getCombinedSubjects(subject))
        dispatch({type: 'firstSubject', value: subject})
        if (secondSubject !== null && !combinedSubjects.includes(secondSubject)) {
            dispatch({type: 'secondSubject', value: null})
        }
    }

    const clickSecondSubject = (subject) => {
        setOpenModal(false)
        dispatch({type: 'secondSubject', value: subject})
    }

    const clickBackButton = () => {
        setTranslateX(0)
    }


    return <ModalFade setOpenModal={setOpenModal} openModal={openModal}>
        <Box display="flex" className={classes.wrapper}>
            <Box display="flex" flexDirection="column"  style={{transition: 'transform 0.4s',transform: `translateX(-${translateX}px)`}}>
                <Typography variant="h5" className={classes.modalTitle}>
                    Выбери первый предмет
                </Typography>
                <List className={classes.list}>
                    {allSubjects.map(subject => {
                        return <SubjectItem selected={firstSubject === subject} click={() => clickFirstSubject(subject)}
                                            key={subject.name} name={subject.name} icon={subject.icon} button/>
                    })}
                </List>
            </Box>
            <Box display="flex" flexDirection="column" style={{transition: 'transform 0.4s', transform: `translateX(-${translateX}px)`}}>
                <Box>
                    <IconButton onClick={clickBackButton} style={{float: 'left'}}>
                        <ArrowBackIos/>
                    </IconButton>
                    <Typography variant="h5" className={classes.modalTitle}>
                        Выбери второй предмет
                    </Typography>
                </Box>
                <List className={classes.list}>
                    {secondSubjects.map(subject => {
                        return <SubjectItem selected={secondSubject === subject}
                                            click={() => clickSecondSubject(subject)}
                                            key={subject.name} name={subject.name} icon={subject.icon} button/>
                    })}
                </List>
            </Box>
        </Box>
    </ModalFade>
}