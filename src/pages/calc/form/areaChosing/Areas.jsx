import React, {Fragment, useEffect, useMemo} from "react"
import {useSelectorCalc} from "../../../../hooks/useSelector"
import {ListItem, makeStyles, Typography} from "@material-ui/core"
import {useDispatch} from "react-redux"
const modalWidth = 500
const md = 1000
const useStyles = makeStyles((theme)=>({
    list: {
        width: modalWidth,
        [theme.breakpoints.down(md)]: {
            width: '80vw',
        },
    },
    modalTitle: {
        textAlign: 'center',
        padding: theme.spacing(2)
    }
}))


export default function ({setModal, selectedAreas, setAreas}) {
    const classes = useStyles()
    const selectedAreaIndex = useSelectorCalc('selectedAreaIndex')
    const selectedAreaListIndex = useSelectorCalc('selectedAreaListIndex')
    const dispatch = useDispatch()
    const handleClick = (selectedArea) => {
        const type = selectedAreaIndex === 0 ? 'branches' : 'profs'
        dispatch({type: type, value:  selectedAreas.map((item, i) => {
                if(i === selectedAreaListIndex) {
                    return selectedArea
                }
                return item
            })})
        setModal(false)
    }
    const allBranches = useSelectorCalc('allBranches')
    const allFilteredProfs = useSelectorCalc('allFilteredProfs')

    const areas = useMemo(()=>{
        if(selectedAreaIndex === 0){
            return allBranches
        }
        return allFilteredProfs[Object.keys(allFilteredProfs)[0]].map(prof=>{
            return `${prof.code} ${prof.name}`
        })
     return allFilteredProfs
    },[selectedAreaIndex, allBranches, allFilteredProfs])
    return <Fragment>
        <Typography variant='h6' className={classes.modalTitle}>
            {selectedAreaIndex === 0 ? 'Выбери область' : 'Выбери специальность'}
        </Typography>
        {areas.map(selectedArea => {
            if (selectedAreas.includes(selectedArea)) return null
            return <ListItem className={classes.list} onClick={() => handleClick(selectedArea)} button>
                {selectedArea}
            </ListItem>
        })}
    </Fragment>
}