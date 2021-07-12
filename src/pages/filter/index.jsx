import React, {useEffect, Suspense, useState, useCallback, useMemo, useContext} from "react"
import {Box, Divider, Grid, Typography} from "@material-ui/core"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"
import Info from 'cpm/info'
import {useSelectorCalc} from "../../hooks/useSelector"
import {Skeleton} from "@material-ui/lab"
import CheckBox from 'cpm/checkbox'
import {fetchGrantsHttp} from "../../http/fetchGrantsHttp"
import {useDispatch} from "react-redux"

const SubjectChosing = React.lazy(() => import('cpm/subjectChosing'))
const ScoreInput = React.lazy(() => import('cpm/scoreInput'))
const AllProfs = React.lazy(() => import('cpm/all'))

export default function () {
    const globalClasses = useGlobalClasses()
    const profsCount = useSelectorCalc('profsCount')
    const [allBranches, setAllBranches] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        fetchGrantsHttp.getAllBranches().then(data => {
            setAllBranches(data.data)
        })
    }, [])

    const [selectedBranch, setSelectedBranch] = useState(null)
    const handleChange = useCallback((value, selectedBranch) => {
        if(selectedBranch === value) {
            setSelectedBranch(null)
            fetchGrantsHttp.getAllProfs().then(data => {
                dispatch({type: 'tempProfs', value: data.data})
            })
        } else {
            setSelectedBranch(value)
        }
    }, [])
    return <Box className={globalClasses.container}>
        <Typography variant="h3">
            Специальности
        </Typography>
        <Divider style={{width: '100%', height: '2px', margin: '20px 0'}}/>
        <Box borderRadius={3}>
            <Suspense fallback={[1,2].map(_ => <Skeleton width='100%' height={44}></Skeleton>)}>
                <SubjectChosing/>
            </Suspense>
            <Suspense fallback={<Skeleton width='100%' height={60}></Skeleton> }>
                <ScoreInput/>
            </Suspense>
        </Box>
        <Typography variant="h4" style={{display: 'inline-block', marginRight: 5}}>Специальности</Typography>
        <Info>
            <Typography variant="h4">
                Специальность
            </Typography>
            <Typography variant="subtitle1">
                комплекс приобретённых путём специальной подготовки и опыта работы знаний, умений и навыков, необходимых
                для определённого вида деятельности в рамках той или иной профессии.
            </Typography>
        </Info>
        <Typography variant="h4"
                    style={{display: 'inline-block', float: 'right'}}>{profsCount} Специальностей</Typography>
        <Grid container>
            <Suspense fallback={[1, 2, 3, 4].map(_ => <Skeleton height={20} width={120}></Skeleton>)}>
                <Grid item md={3} xs={12}>{allBranches.map(branch => {
                    return <div onClick={() => handleChange(branch, selectedBranch)}><CheckBox
                        active={selectedBranch === branch}>{branch}</CheckBox></div>
                })}</Grid>
            </Suspense>
            <Grid item md={9}>
                <Suspense fallback={<Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    {[1, 2, 3, 4].map(_ => <Skeleton style={{marginRight: 20}} width={400} height={180}/>)}
                </Box>}>
                    <AllProfs selectedBranch={selectedBranch} setAllBranches={setAllBranches}/>
                </Suspense>
            </Grid>
        </Grid>


    </Box>
}