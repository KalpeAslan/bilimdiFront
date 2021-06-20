import React, {Fragment, useEffect, useMemo, useState} from 'react'
import calc from 'services/calc'
import ProfCard from 'cpm/card'
import axios from "axios"
import {useSelectorCalc} from "hooks/useSelector"
import {useDispatch} from "react-redux"
import {Box, Typography} from "@material-ui/core"
import Info from 'cpm/info'
import CardsGroup from 'cpm/cardsGroup'

const allProfStyle = {
    width: '100%',
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fill, minmax(400px, 1fr))',
    'grid-auto-columns': 'max-content',
    'grid-gap': '30px',
    'justify-content': 'space-between',
}


export default function () {
    const [profsStoreType, setProfsStoreType] = useState('allProfs')
    const [profsCount, setProfsCount] = useState(0)
    const [allProfs, setAllProfs] = useState({})
    const allFilteredProfs = useSelectorCalc('allFilteredProfs')
    const dispatch = useDispatch()
    useEffect(async () => {
        if (profsStoreType === 'allProfs') {
            const allProfsData = await calc.getAllProfs()
            setAllProfs(allProfsData.data)
        }
    }, [])

    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    useEffect(() => {
        const isNullSubject = [firstSubject, secondSubject].some(subject => subject !== null)
        if (isNullSubject) {
            setProfsStoreType('bySubjProfs')
        } else {
            setProfsStoreType('allProfs')
        }
    }, [firstSubject, secondSubject])


    const score = useSelectorCalc('score')
    useEffect(async () => {
        if (profsStoreType === 'bySubjProfs' || profsStoreType === 'byScoreProfs') {
            if (score) {
                const res = await axios.post('http://localhost:4000/getFilteredByScore', {
                    score,
                    filteredBySubjProfs: filteredBySubjProfs
                }).then(data => {
                    return data.data
                })
                dispatch({type: 'allFilteredProfs', value: res})
                setProfsStoreType('byScoreProfs')
            } else {
                setProfsStoreType('bySubjProfs')
            }
        }
    }, [score])


    const filteredBySubjProfs = useMemo(() => {
        return calc.getFilteredBySubjProfs(allProfs)
    }, [firstSubject, secondSubject])


    const getProfsByState = useMemo(() => {
        let profsCountStart = 0
        const profs = () => {
            switch (profsStoreType) {
                case 'allProfs':
                    return allProfs
                case 'bySubjProfs':
                    return filteredBySubjProfs
                case 'byScoreProfs':
                    return allFilteredProfs
                default:
                    return allProfs
            }
        }
        const res = <CardsGroup>
            {Object.entries(profs()).map(([subject, values]) => {
                return values.map((value, i) => {
                    profsCountStart++
                    const cardBody = <>
                        <Typography variant="h6">
                            Специальность: {value.name}
                        </Typography>
                        <Typography>
                            Предмет:
                            {subject}
                        </Typography>
                        <Typography>
                            минимальный балл:
                            {value.min}
                        </Typography>
                    </>
                    return <ProfCard key={value.name + i} children={cardBody}/>
                })
            })}
        </CardsGroup>
        setProfsCount(profsCountStart)
        return res
    }, [allProfs, filteredBySubjProfs, allFilteredProfs, profsStoreType])


    // TODO закешировать данные, ибо функция calc.getFilteredBySubjProfs() вызывается 2 раза
    return <Fragment>
        <Typography variant="h4">{profsStoreType}</Typography>
        <Typography variant="h4">Всего специальнсотей: {profsCount}</Typography>
        <Info/>
        {
            getProfsByState
        }

    </Fragment>
}