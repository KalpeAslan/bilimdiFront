import React, {useEffect, Suspense, useState, useCallback, useMemo, useContext} from "react"
import {Box, Collapse, Divider, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"
import Info from 'cpm/info'
import {useSelectorCalc} from "../../hooks/useSelector"
import {Skeleton} from "@material-ui/lab"
import CheckBox from 'cpm/checkbox'
import {fetchGrantsHttp} from "../../http/fetchGrantsHttp"
import {useDispatch} from "react-redux"
import {ExpandLess, ExpandMore} from "@material-ui/icons"
import {useMediaQuery, useTheme} from "@material-ui/core"
import {useLocale, useTranslate} from "../../hooks/useLocale"

const SubjectChosing = React.lazy(() => import('cpm/subjectChosing'))
const ScoreInput = React.lazy(() => import('cpm/scoreInput'))
const AllProfs = React.lazy(() => import('cpm/all'))

export default function () {
    const globalClasses = useGlobalClasses()
    const profsCount = useSelectorCalc('profsCount')
    const [allBranches, setAllBranches] = useState([])
    const [openAreas, setOpenAreas] = useState(false)
    const dispatch = useDispatch()
    const isMd = useMediaQuery('(max-width: 880px)')
    const {currentLanguage} = useLocale()
    useEffect(() => {
        fetchGrantsHttp.getAllBranches(currentLanguage).then(data => {
            setAllBranches(data.data)
        })
    }, [currentLanguage])

    const [selectedBranch, setSelectedBranch] = useState(null)
    const handleChange = useCallback((value, selectedBranch) => {
        if (selectedBranch === value) {
            setSelectedBranch(null)
            fetchGrantsHttp.getAllProfs(currentLanguage).then(data => {
                dispatch({type: 'tempProfs', value: data.data})
            })
        } else {
            setSelectedBranch(value)
        }
    }, [])

    const handleCollapseClick = useCallback(() => {
        setOpenAreas(!openAreas)
    }, [openAreas])

    return <Box className={globalClasses.container}>
        <Typography variant="h3">
            {useTranslate('Специальности')}
        </Typography>
        <Divider style={{width: '100%', height: '2px', margin: '20px 0'}}/>
        <Box borderRadius={3}>
            <Suspense fallback={[1, 2].map(_ => <Skeleton width="100%" height={44}></Skeleton>)}>
                <SubjectChosing/>
            </Suspense>
            <Suspense fallback={<Skeleton width="100%" height={60}></Skeleton>}>
                <ScoreInput/>
            </Suspense>
        </Box>
        <Typography variant="h4" style={{display: 'inline-block', marginRight: 5}}>{useTranslate('Специальности')}</Typography>
        <Info>
            <Typography variant="h4">
                {useTranslate('Специальность')}
            </Typography>
            <Typography variant="subtitle1">
                {useTranslate('комплекс приобретённых путём специальной подготовки и опыта работы знаний, умений и навыков, необходимых для определённого вида деятельности в рамках той или иной профессии.')}
            </Typography>
        </Info>
        <Typography variant="h4"
                    style={{display: 'inline-block', float: 'right'}}>{profsCount} {useTranslate('Специальностей')}</Typography>
        <Grid container>
            <Suspense fallback={[1, 2, 3, 4].map(_ => <Skeleton height={20} width={120}></Skeleton>)}>
                <Grid item md={3} xs={12} style={{width: isMd ? '100%' : 'auto'}}>
                    {!isMd ? allBranches.map(branch => (
                            <div onClick={() => handleChange(branch, selectedBranch)}><CheckBox
                                active={selectedBranch === branch}>{branch}</CheckBox></div>)) :
                        <>
                            <ListItem style={{width: '100%', display: 'flex',justifyContent: 'center',padding: '10px 0', borderRadius: 4, border: '1px solid black', margin: '20px 0'}} button onClick={handleCollapseClick}>
                                <Typography variant={'subtitle1'} style={{textAlign:'center'}}>
                                    {useTranslate('Области специасльнотей')}
                                </Typography>

                                   {openAreas ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={openAreas} timeout="auto" unmountOnExit>
                                <List>
                                    {allBranches.map(branch => {
                                        return <ListItem selected={selectedBranch === branch} button
                                                         onClick={() => handleChange(branch, selectedBranch)}>
                                            <ListItemText>
                                                {branch}
                                            </ListItemText>
                                        </ListItem>
                                    })}
                                </List>
                            </Collapse>
                        </>
                    }
                </Grid>
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