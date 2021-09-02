import React, { useCallback, useEffect, useMemo, useState, Suspense } from 'react'
import { useSelectorCalc } from "hooks/useSelector"
import { useDispatch } from "react-redux"
import { Box, Grid, Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

// import {fetchGrantsHttp} from "../../services/grants/grantsService"
import { useLocale } from "../../hooks/useLocale"
import { useInjection } from "../../hooks/useInjection"

const Locale = React.lazy(() => import('cpm/locale/index'))
const ProfCard = React.lazy(() => import('cpm/card'))

export default function ({ selectedBranch, setAllBranches }) {
    const profs = useSelectorCalc('tempProfs')
    const [loading, setLoading] = useState(false)
    const firstSubject = useSelectorCalc('firstSubject')
    const secondSubject = useSelectorCalc('secondSubject')
    const score = useSelectorCalc('score')
    const dispatch = useDispatch()
    const { currentLanguage } = useLocale()

    const setProfs = useCallback((profs) => {
        dispatch({ type: 'tempProfs', value: profs })
    }, [])
    const { fetchGrantsHttp } = useInjection()

    useEffect(() => {
        fetchGrantsHttp.getAllProfs().then(data => {
            setProfs(data)
        })
    }, [currentLanguage])

    useEffect(() => {
        const isSubjectsEmpty = firstSubject === null && secondSubject === null
        if (isSubjectsEmpty && !!selectedBranch) {
            fetchGrantsHttp.fetchProfsByBranches(selectedBranch, firstSubject, secondSubject).then(data => {
                setProfs(data)
            })
        } else if (!isSubjectsEmpty && selectedBranch === null) {
            fetchGrantsHttp.fetchProfsBySubjects(firstSubject.short, secondSubject !== null ? secondSubject.short : null)
                .then(data => {
                    setProfs(data)
                })
            fetchGrantsHttp.fetchBranchesBySubjects(firstSubject, secondSubject).then(data => {
                setAllBranches(data)
            })
        } else if (!isSubjectsEmpty && !!selectedBranch) {
            fetchGrantsHttp.fetchProfsByBranches(selectedBranch, firstSubject.short, secondSubject !== null ? secondSubject.short : null)
                .then(data => {
                    setProfs(data)
                })
            fetchGrantsHttp.fetchBranchesBySubjects(firstSubject, secondSubject).then(data => {
                setAllBranches(data)
            })
        }
    }, [selectedBranch, firstSubject, secondSubject])


    const GridProfCards = useCallback((cardBody, key) => {
        return <Grid item style={{ width: '100%' }} md={6} xs={12}><Suspense
            fallback={<Skeleton width={210} height={100}></Skeleton>}>
            <ProfCard key={key}
                children={cardBody} />
        </Suspense></Grid>
    }, [])

    const profsByState = useMemo(() => {
        let profsCount = 0
        const profsCards = profs.map((prof, i) => {
            if (prof.hasOwnProperty('min') && score && score < +prof.min.trim()) return null
            profsCount++
            const cardBody = <>
                <Typography variant="h6">
                    <Locale str={'Специальность'} />: {prof.name}
                </Typography>
                <Typography>
                    <Locale str={'Предмет'} />: {prof.subjects}
                </Typography>
                <Typography>
                    <Locale str={'минимальный балл'} />:
                    {prof.min}
                </Typography>
            </>
            return GridProfCards(cardBody, prof.name + i)
        })
        dispatch({ type: 'profsCount', value: profsCount })
        return profsCards
    }, [profs, score])

    return <Grid container spacing={3}>
        {loading && <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {[1, 2, 3, 4].map(_ => <Skeleton style={{ marginRight: 20 }} width={400} height={180} />)}
        </Box>}
        {
            profsByState
        }
    </Grid>
}