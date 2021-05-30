import React, {useEffect, useState} from 'react'
import calc from 'services/calc'
import ProfCard from './profCard'
import {useDispatch} from "react-redux"
import axios from "axios"
import {useSelectorCalc} from "hooks/useSelector"

export default function (){
    const dispatch = useDispatch()
    const [profsStoreType, setProfsStoreType] = useState('allProfs')
    const [profs, setProfs] = useState({})

    useEffect(async()=> {
        const allProfs = await calc.getAllProfs()
        dispatch({type: 'allProfs', value:allProfs.data})
    },[])

    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    useEffect(()=>{
        const nullSubjects = [firstSubject, secondSubject].some(subject=> subject !== null)
        if(nullSubjects) {
            setProfsStoreType('bySubjProfs')
        } else {
            setProfsStoreType('allProfs')
        }
    }),[firstSubject,secondSubject]


    const score = useSelectorCalc('score')
    useEffect(()=> {
        if(profsStoreType === 'bySubjProfs'){
            if(score) {
                setProfsStoreType('byScoreProfs')
            } else {
                setProfsStoreType('bySubjProfs')
            }
        }
    },[score])

    const allProfs = useSelectorCalc('allProfs')

    // useEffect(async ()=> {
    //     switch (profsStoreType){
    //         case 'allProfs':
    //             return setProfs(allProfs)
    //         case 'bySubjProfs':
    //             return setProfs(calc.getFilteredBySubjProfs())
    //         case 'byScoreProfs':
    //             const res = await axios.post('http://localhost:4000/getFilteredByScore',{
    //                 score,
    //                 filteredBySubjProfs: calc.getFilteredBySubjProfs()
    //             }).then(res =>  {
    //                 return res.data
    //             })
    //             return setProfs(res)
    //     }
    // },[profsStoreType, allProfs])

    // TODO закешировать данные, ибо функция calc.getFilteredBySubjProfs() вызывается 2 раза
    return Object.entries(profs).map(([subject, values])=>{
        return values.map((value,i)=>{
            return <ProfCard key={value.name + i} prof={value} subject={subject}/>
        })
    })
}