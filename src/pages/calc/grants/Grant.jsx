import React, {useEffect, useMemo, useState} from "react"
import calc from 'services/calc'
import {Typography, Box, Tabs, Tab, Divider} from "@material-ui/core"
import Card from 'cpm/card'
import CardsGroup from 'cpm/cardsGroup'
import AboutProf from "./AboutProf"

const grantTable = [
    {
        title: 'Код',
        value: 'B001'
    },
    {
        title: 'Минимальный балл',
        value: 92
    },
    {
        title: 'Предметы',
        value: 'PhysMath'
    },
    {
        title: 'Область',
        value: 'Педогогические науки'
    }
]
export default function ({selectedGrantCode}) {
    const grant = calc.getAboutGrant(selectedGrantCode)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTabIndex(newValue)
    }


    const getComponentByTabIndex = useMemo(() => {
        console.log(grant)
        switch (selectedTabIndex) {
            case 0:
                if (grant.univers.length === 0) return <Typography>No universities</Typography>
                return <CardsGroup>
                    {grant.univers.map(university => <Card>
                        <Typography variant="subtitle1" children={university.name}/>
                        <Typography variant="subtitle2">
                            Минимальный балл для поступления:
                            {university.min}
                        </Typography>
                    </Card>)}
                </CardsGroup>
            case 1:
                return <AboutProf/>

        }
    }, [selectedTabIndex])

    return <>
        <Typography variant="h2">
            Педогогические науки
        </Typography>
        <Typography variant="h6">
            Педаго́гика — наука о воспитании и обучении человека, прежде всего в детско-юношеском возрасте. Предмет
            педагогики — целостный педагогический процесс направленного развития и формирования личности в условиях её
            воспитания, обучения и образования.
        </Typography>
        <Box display="flex" mt={4} justifyContent="space-between" alignItems="center" width="100%"
             style={{flexWrap: 'wrap'}}>
            {grantTable.map(item => <Box>
                <Typography variant="subtitle2" children={item.title}/>
                <Typography variant="subtitle1" children={item.value}/>
            </Box>)}
        </Box>
        <Divider style={{width: '100%', margin: '30px 0', height: '1px'}}/>
        <Box width="100%">
            <Tabs value={selectedTabIndex}
                  onChange={handleChange}
                  indicatorColor="primary"
                  style={{width: '100%'}}
            >
                <Tab label="Университеты" style={{width: '50%', maxWidth: '50%'}}/>
                <Tab label="Подробно о Спецальности" style={{width: '50%', maxWidth: '50%'}}/>
            </Tabs>
            <Divider style={{width: '100%', height: '1px'}}/>
        </Box>
        {getComponentByTabIndex}
    </>
}