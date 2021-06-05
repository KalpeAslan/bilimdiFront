import React, {Fragment, useEffect, useMemo, useState} from 'react'
import calc from 'services/calc'
import ProfCard from './profCard'
import axios from "axios"
import {useSelectorCalc} from "hooks/useSelector"

export default function () {
    const [profsStoreType, setProfsStoreType] = useState('allProfs')
    const [profsCount, setProfsCount] = useState(0)
    const [allProfs, setAllProfs] = useState({})
    const [filteredByScore, setFilteredByScore] = useState({})
    // get and set allProfs
    useEffect(async()=>{
        if(profsStoreType === 'allProfs') {
            const allProfsData = await calc.getAllProfs()
            setAllProfs(allProfsData.data)
        }
    },[])

    // watch to subject set
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    useEffect(() => {
        const isNullSubject = [firstSubject, secondSubject].some(subject => subject !== null)
        if (isNullSubject) {
            setProfsStoreType('bySubjProfs')
        } else {
            setProfsStoreType('allProfs')
        }
    },[firstSubject, secondSubject])


    const score = useSelectorCalc('score')
    useEffect(async () => {
        if (profsStoreType === 'bySubjProfs' || profsStoreType === 'byScoreProfs') {
            if (score) {
                const res = await axios.post('http://localhost:4000/getFilteredByScore', {
                    score,
                    filteredBySubjProfs: filteredBySubjProfs
                }).then(data=>{
                    return data.data
                })
                setFilteredByScore(res)
                setProfsStoreType('byScoreProfs')
            } else {
                setProfsStoreType('bySubjProfs')
            }
        }
    }, [score])


    const filteredBySubjProfs = useMemo(()=> {
        return calc.getFilteredBySubjProfs(allProfs)
    }, [firstSubject,secondSubject])


    // get profs by subject
    const getProfsByState = useMemo(()=>{
        let profsCountStart = 0;
        const profs = ()=>{
            switch (profsStoreType){
                case 'allProfs':
                    return allProfs
                case 'bySubjProfs':
                    return filteredBySubjProfs
                case 'byScoreProfs':
                    return filteredByScore
                default:
                    return allProfs
            }
        }

        const res =  Object.entries(profs()).map(([subject, values]) => {
            return values.map((value, i) => {
                profsCountStart++;
                return <ProfCard key={value.name + i} prof={value} subject={subject}/>
            })
        })
        setProfsCount(profsCountStart)
        return res
    },[allProfs,filteredBySubjProfs, filteredByScore,profsStoreType])



    // TODO закешировать данные, ибо функция calc.getFilteredBySubjProfs() вызывается 2 раза
    return <Fragment>
        <h2>{profsStoreType}</h2>
        <h1>Всего специальнсотей: {profsCount}</h1>
        {
            getProfsByState
        }

    </Fragment>
}