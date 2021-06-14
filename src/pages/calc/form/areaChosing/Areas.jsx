import React, {Fragment, useEffect, useMemo} from "react"
import {useSelectorCalc} from "../../../../hooks/useSelector"
import {ListItem, Typography} from "@material-ui/core"
import {useDispatch} from "react-redux"

export default function ({setModal, selectedAreas, setAreas}) {
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
        <Typography>
            {selectedAreaIndex === 0 ? 'область' : 'специальность'}
        </Typography>
        {areas.map(selectedArea => {
            if (selectedAreas.includes(selectedArea)) return null
            return <ListItem onClick={() => handleClick(selectedArea)} button>
                {selectedArea}
            </ListItem>
        })}
    </Fragment>
}