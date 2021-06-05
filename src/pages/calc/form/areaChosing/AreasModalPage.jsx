import React, {Fragment} from "react"
import {useSelectorCalc} from "../../../../hooks/useSelector"
import {ListItem} from "@material-ui/core"



//TODO AreasModalPage
/*
* Сделать страницу модалки для каждого area, ввиде бесконечного слайдера
* */
export default function ({areas, setSelectedArea}){
    const selectedAreaIndex = useSelectorCalc('selectedAreaIndex')
    const selectedAreas = useSelectorCalc('selectedAreas')
    return <Fragment>
        {/*Generate 4 pages*/}
        {selectedAreas.map(selectedArea=>{
            //Generate areas(branches/profs)
        })}
    </Fragment>
}