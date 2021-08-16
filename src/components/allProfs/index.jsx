import React, {useEffect, useMemo, useState} from 'react'
import calc from 'services/calc'
import ProfCard from 'cpm/card'
import axios from "axios"
import {useSelectorCalc} from "hooks/useSelector"
import {useDispatch} from "react-redux"
import {Box, Grid, Typography} from "@material-ui/core"
import {Skeleton} from "@material-ui/lab"
import {fetchGrantsHttp} from "../../services/grants/grantsService"


export function AllProfs({selectedBranch}) {
    const [profsStoreType, setProfsStoreType] = useState('allProfs')
    const [allProfs, setAllProfs] = useState({})
    const allFilteredProfs = useSelectorCalc('allFilteredProfs')
    const [loading, setLoading] = useState(false)
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
                setLoading(true)
                const res = await axios.post('http://localhost:4000/getFilteredByScore', {
                    score,
                    filteredBySubjProfs: filteredBySubjProfs
                }).then(data => {
                    setLoading(false)
                    return data.data
                })
                dispatch({type: 'allFilteredProfs', value: res})
                setProfsStoreType('byScoreProfs')
            } else {
                setProfsStoreType('bySubjProfs')
            }
        }
    }, [score])


    useEffect(() => {
        if (selectedBranch) {
            setProfsStoreType('bySelectedBranch')
        }
    }, [selectedBranch])

    const [filteredBySelectedBranch, setFilteredBySelectedBranch] = useState([])
    useEffect(async () => {
        const res = await fetchGrantsHttp.getAllProfs().then(data => data)
        console.log(res)
        setFilteredBySelectedBranch(calc.getProfsBySelectedBranch(res, selectedBranch))
    }, [selectedBranch])

    const filteredBySubjProfs = useMemo(() => {
        return calc.getFilteredBySubjProfs(allProfs)
    }, [firstSubject, secondSubject])

    const getProfsByState = useMemo(() => {
        let profsCountStart = 0
        function resultBySubject(arr) {
            const view = Object.entries(arr).map(([subject, values]) => {
                return values.map((value, i) => {
                    profsCountStart = profsCountStart +1
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
                    return <Grid item style={{width: '100%'}} md={6} xs={12}><ProfCard key={value.name + i}
                                                                                       children={cardBody}/></Grid>
                })
            })
            dispatch({type: 'profsCount', value: profsCountStart})
            return view
        }

        const profs = () => {
            switch (profsStoreType) {
                case 'allProfs':
                    return allProfs
                case 'bySubjProfs':
                    return filteredBySubjProfs
                case 'byScoreProfs':
                    return allFilteredProfs
                case 'bySelectedBranch':
                    return filteredBySelectedBranch
                default:
                    return allProfs
            }
        }

        const res = () => {
            if (profsStoreType !== 'bySelectedBranch') return resultBySubject(profs())
            const view =  filteredBySelectedBranch.map((prof, i) => {
                profsCountStart++
                const cardBody = <>
                    <Typography variant="h6">
                        Специальность: {prof.name}
                    </Typography>
                    <Typography>
                        минимальный балл:
                        {prof.min}
                    </Typography>
                </>
                return <Grid item style={{width: '100%'}} md={6} xs={12}><ProfCard key={prof.name + i}
                                                                                   children={cardBody}/></Grid>
            })
            dispatch({type: 'profsCount', value: profsCountStart})
            return view
        }
        return res()
    }, [allProfs, filteredBySubjProfs, allFilteredProfs,filteredBySelectedBranch, profsStoreType])


    // TODO закешировать данные, ибо функция calc.getFilteredBySubjProfs() вызывается 2 раза
    return <Grid container spacing={3} >
        {loading && <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {[1, 2, 3, 4].map(_ => <Skeleton style={{marginRight: 20}} width={400} height={180}/>)}
        </Box>}
        {
            getProfsByState
        }
    </Grid>
}