import React, {useCallback, useEffect, useMemo, useState, Suspense} from 'react'
import calc from 'services/calc'
import {useSelectorCalc} from "hooks/useSelector"
import {useDispatch} from "react-redux"
import {Box, Grid, Typography} from "@material-ui/core"
import {Skeleton} from "@material-ui/lab"

const ProfCard = React.lazy(() => import('cpm/card'))
import {fetchGrantsHttp} from "../../http/fetchGrantsHttp"

export default function ({selectedBranch, setAllBranches}) {
    const [profs, setProfs] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    const score = useSelectorCalc('score')

    useEffect(() => {
        fetchGrantsHttp.getAllProfs().then(data => {
            setProfs(data.data)
        })
    }, [])

    useEffect(()=> {
        const isSubjectsEmpty = firstSubject === null && secondSubject === null;
        if(isSubjectsEmpty && !!selectedBranch) {
            fetchGrantsHttp.fetchProfsByBranches(selectedBranch, firstSubject, secondSubject).then(data => {
                setProfs(data.data)
            })
        } else if(!isSubjectsEmpty && selectedBranch === null){
            fetchGrantsHttp.fetchProfsBySubjects(firstSubject.short, secondSubject !== null ? secondSubject.short : null)
                .then(data => {
                    setProfs(data.data)
                })
            fetchGrantsHttp.fetchBranchesBySubjects(firstSubject, secondSubject).then(data => {
                setAllBranches(data.data)
            })
        } else if(!isSubjectsEmpty && !!selectedBranch) {
            fetchGrantsHttp.fetchProfsByBranches(selectedBranch, firstSubject.short, secondSubject !== null ? secondSubject.short : null).then(data => {
                setProfs(data.data)
            })
            fetchGrantsHttp.fetchBranchesBySubjects(firstSubject, secondSubject).then(data => {
                setAllBranches(data.data)
            })
        }
    },[selectedBranch, firstSubject, secondSubject])


    const GridProfCards = useCallback((cardBody, key) => {
        return <Grid item style={{width: '100%'}} md={6} xs={12}><Suspense
            fallback={<Skeleton width={210} height={100}></Skeleton>}>
            <ProfCard key={key}
                      children={cardBody}/>
        </Suspense></Grid>
    }, [])

    const profsByState = useMemo(() => {
        let profsCount = 0
        const profsCards = profs.map((prof,i) => {
            if(prof.hasOwnProperty('min') && score && score < +prof.min.trim()) return null
            profsCount++
            const cardBody = <>
                <Typography variant="h6">
                    Специальность: {prof.name}
                </Typography>
                <Typography>
                    Предмет:
                </Typography>
                <Typography>
                    минимальный балл:
                    {prof.min}
                </Typography>
            </>
            return GridProfCards(cardBody, prof.name + i)
        })
        dispatch({type: 'profsCount', value: profsCount})
        return profsCards
    }, [profs, score])

    return <Grid container spacing={3}>
        {loading && <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {[1, 2, 3, 4].map(_ => <Skeleton style={{marginRight: 20}} width={400} height={180}/>)}
        </Box>}
        {
            profsByState
        }
    </Grid>
}