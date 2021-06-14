import React, {useState, Fragment, useEffect} from 'react'
import {useSelectorCalc} from "hooks/useSelector"
import calc from 'services/calc'
import ListItemArrow from 'cpm/listElem'
import {useDispatch} from "react-redux"
import {Tabs, Tab, Box, makeStyles} from "@material-ui/core"
import Areas from "./Areas"
import ModalFade from 'cpm/ModalFade'

// TODO Area choosing tab

const useStyles = makeStyles((theme) => ({
    wrapper: {
        transition: 'transform 0.4s',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
}))

export default function () {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const selectedAreaIndex = useSelectorCalc('selectedAreaIndex')
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    useEffect(() => {
        calc.getBranchesBySubjects(firstSubject, secondSubject).then(res => {
            dispatch({
                type: 'allBranches', value: res
            })
        })

    }, [])

    const handleClick = (index) => {
        dispatch({type: 'selectedAreaListIndex', value: index})
        setOpenModal(true)
    }
    const branches = useSelectorCalc('branches')
    const profs = useSelectorCalc('profs')

    const getListByState = () => {
        try {
            return (selectedAreaIndex === 0 ? branches : profs).map((area, i) => {
                const title = area === null ? 'Выберите проффесию' : area
                return <ListItemArrow key={i} title={title} index={i} click={() => handleClick(i)}/>
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event, newValue) => {
        dispatch({type: 'selectedAreaIndex', value: newValue})
    }

    return <Fragment>
        <Tabs
            style={{
                width: '100%'
            }}
            value={selectedAreaIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Область" style={{width: '50%', maxWidth: '50%'}}/>
            <Tab label="Специальности" style={{width: '50%', maxWidth: '50%'}}/>
        </Tabs>
        {getListByState()}
        <ModalFade setOpenModal={setOpenModal} openModal={openModal}>
            <Box width={320} maxHeight='80vh' className={classes.wrapper}>
                <Areas selectedAreas={selectedAreaIndex === 0 ? branches : profs} setModal={setOpenModal}/>
            </Box>
        </ModalFade>

    </Fragment>
}