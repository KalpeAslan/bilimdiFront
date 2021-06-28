import React, {useEffect, Suspense, useState, useCallback, useMemo} from "react"
import {Box, Divider, Grid, Typography} from "@material-ui/core"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"
import SubjectChosing from 'cpm/subjectChosing'
import Info from 'cpm/info'
import {useSelectorCalc} from "../../hooks/useSelector"
import axios from "axios"
import {Skeleton} from "@material-ui/lab"
import CheckBox from 'cpm/checkbox'
import ScoreInput from 'cpm/scoreInput'

const AllProfs = React.lazy(() => import('cpm/allProfs'))

export default function () {
    const globalClasses = useGlobalClasses()
    const profsCount = useSelectorCalc('profsCount')
    const [allBranches, setAllBranches] = useState([])
    useEffect(async () => {
        await axios.get(`${process.env.API_URL}/getBranches`).then(data => {
            setAllBranches(data.data)
        })
    }, [])

    const [selectedBranch, setSelectedBranch] = useState(null)
    const handleChange = useCallback((value) => {
        setSelectedBranch(value)
    }, [])
    return <Box className={globalClasses.container}>
        <Typography variant="h3">
            Специальности
        </Typography>
        <Divider style={{width: '100%', height: '2px', margin: '20px 0'}}/>
        <Box borderRadius={3}>
            <SubjectChosing/>
            <ScoreInput/>
        </Box>
        <Typography variant="h4" style={{display: 'inline-block', marginRight: 5}}>Специальности</Typography>
        <Info>
            <Typography variant='h4'>
                Специальность
            </Typography>
            <Typography variant='subtitle1'>
                комплекс приобретённых путём специальной подготовки и опыта работы знаний, умений и навыков, необходимых для определённого вида деятельности в рамках той или иной профессии.
            </Typography>
        </Info>
        <Typography variant="h4"
                    style={{display: 'inline-block', float: 'right'}}>{profsCount} Специальностей</Typography>
        <Grid container>
            <Suspense fallback={[1, 2, 3, 4].map(_ => <Skeleton height={20} width={120}></Skeleton>)}>
                <Grid item md={3} xs={12}>{allBranches.map(item => {
                    return <div onClick={() => handleChange(item)}><CheckBox
                        active={selectedBranch === item}>{item}</CheckBox></div>
                })}</Grid>
            </Suspense>
            <Grid item md={9}>
                <Suspense fallback={<Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    {[1, 2, 3, 4].map(_ => <Skeleton style={{marginRight: 20}} width={400} height={180}/>)}
                </Box>}>
                    <AllProfs selectedBranch={selectedBranch}/>
                </Suspense>
            </Grid>
        </Grid>


    </Box>
}