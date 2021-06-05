import React, {useState} from 'react'
import {List} from "@material-ui/core"
import SubjectItem from "./subjectItem"
import Subjects from "./subject"
import ListItemArrow from 'cpm/listElem'
import {useDispatch} from "react-redux"
import subjectsAll from 'services/calc/subjectsAll'
import {useSelectorCalc} from "hooks/useSelector"

export default function (){
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    const handleModal = (i)=> {
        setOpenModal(!openModal)
        dispatch({type:'selectedSubjectIndexToChange', value: i})
    }

    return <React.Fragment>
        <List style={{width: '100%'}}>
            {[firstSubject,secondSubject].map((subject,i) => {
                if(!subject) return <ListItemArrow index={i} title='Предмет не выбран' click={()=>handleModal(i)}/>
                return <SubjectItem index={i} name={subject.name} icon={subject.icon} click={handleModal} editable={true}/>
            })
            }
        </List>
        <Subjects openModal={openModal} setOpenModal={setOpenModal} subjects={subjectsAll('ru')}/>
    </React.Fragment>
}