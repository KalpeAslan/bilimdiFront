import React, {useState} from 'react'
import {useSelectorCalc} from "hooks/useSelector"
import ListItemArrow from 'cpm/listElem'

// TODO Area choosing tab
export default function () {
    const areas = useSelectorCalc('areas')
    const [openModal, setOpenModal] = useState(false)
    const click = async (i)=> {
        setOpenModal(true)
     }

    return areas.map((area,i)=>{
        if(area.selectedArea === null) return <ListItemArrow key={i} title='Выберите проффесию' index={i} click={()=> click(i)}/>
    })
}