import React, {useEffect, useMemo, useState} from 'react'
import {Box, CardActions, Divider, Typography} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import Button from "@material-ui/core/Button"
import calc from 'services/calc'
import {useDispatch} from "react-redux"
import {useSelectorCalc} from "../../../hooks/useSelector"
import Card from 'cpm/card'

export default function ({setSelectedGrantCode}) {
    const dispatch = useDispatch()
    const allGrants = useSelectorCalc('allGrants')
    const [loading, setLoading] = useState(false)
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
    useEffect(async () => {
        setLoading(true)
        // const res = await axios.post('http://localhost:4000/getFilteredByScore', {
        //     score,
        //     filteredBySubjProfs: filteredBySubjProfs
        // }).then(data=>{
        //     return data.data
        // })
        calc.getGrants().then(data => {
            setLoading(false)
            dispatch({type: 'allGrants', value: Object.assign(data, data)})
        })
    }, [])

    const handleBackButtonClick = () => {
        if (selectedVariantIndex !== 0) {
            setSelectedVariantIndex(selectedVariantIndex - 1)
        }
    }

    const handleNextButtonClick = () => {
        if (selectedVariantIndex + 1 === Math.round(Object.keys(allGrants).length / 4)) return false
        setSelectedVariantIndex(selectedVariantIndex + 1)
    }

    const grantsList = useMemo(() => {
        const grants = []
        const grantsKeys = Object.keys(allGrants)
        for (let i = selectedVariantIndex * 4; i < 4 * (selectedVariantIndex + 1); i++) {
            if (allGrants[grantsKeys[i]]) {
                grants.push(allGrants[grantsKeys[i]])
            }
        }
        console.log(grants)
        return grants
    }, [selectedVariantIndex, allGrants])


    const handleClick = (code) => {
        setSelectedGrantCode(code)
    }


    return <>
        <Typography variant="h2">
            Результаты
        </Typography>
        <Divider/>
        <Typography>
            100% Вероятность
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%">

            {loading && [1, 2, 3, 4].map(i => <Box key={'skeletonGrant' + i} variant="rect" width="100%" my={20 / 8}
                                                   style={{boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'}}>
                <Skeleton variant="text" width="50%"/>
                <Skeleton variant="text" width="70%"/>
                <Skeleton variant="text" width="30%"/>
                <Skeleton variant="text" width="50%"/>
            </Box>)}
            {loading || <Box display='flex' flexDirection='column' width='100%'>
                {
                    grantsList.map(grant => <Card>
                        <Typography variant="h5">
                            Область: Педагогические науки
                        </Typography>
                        <Typography variant="h6">
                            {`Специальность: ${grant.code} ${grant.name}`}
                        </Typography>
                        <Typography>
                            {`минимальный балл: ${grant.min ? grant.min : grant.minScores[0]}`}
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => handleClick(grant.code)}>Узнать больше</Button>
                        </CardActions>
                    </Card>)
                }
            </Box>}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {selectedVariantIndex !== 0 && <Button variant="outlined" onClick={handleBackButtonClick}>
                Назад
            </Button>}
            <Button variant="outlined" color="primary" onClick={handleNextButtonClick}>
                Посмотреть другой вариант
            </Button>
        </Box>
    </>
}