import React from "react"
import {Box, Divider, makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    bullet: {
        margin: '20px 0',
        '&::before': {
            content: "''",
            display: 'inline-block',
            marginRight: 20,
            background: theme.palette.primary.main,
            borderRadius: '50%',
            ...theme.mixins.size(7),
        }
    }
}))


export default function () {
    const classes = useStyles()
    const responsibilities = [
        'Изучает реакцию растений, животных и морских видов на паразитов.',
        'Подготавливает технические и исследовательские отчеты, например, отчеты о воздействии на окружающую среду, и сообщает результаты отдельным лицам в промышленности, правительстве или широкой общественности.',
        'Развивает и поддерживает связи и плодотворные рабочие отношения с группами и отдельными лицами, учреждениями и общественностью для целей стимулирования совместных стратегий управления или для целей разработки информации и интерпретации результатов.',
        'Собирает и анализирует биологические данные о взаимоотношениях между организмами и окружающей их средой.',
        'Программирует и использует компьютеры для хранения, обработки и анализа данных.',
        'Руководит биологическими техниками, технологами и прочими учеными.'
    ]

    return <Box py={5}>
        <Typography variant="h3" style={{marginBottom: 10}}>
            Чем занимается Биолог
        </Typography>
        <Typography variant="h6">
            Исследует или изучает основные принципы жизни растений и животных, такие как происхождение, взаимоотношения,
            развитие, анатомия и функции.
        </Typography>
        <Divider style={{width: '100%', margin: '20px 0'}}/>
        <Typography variant="h3">
            Обязности Биолога
        </Typography>
        <>
            {responsibilities.map(item => <Typography key={item} variant="h6" className={classes.bullet} children={item}/>)}
        </>
    </Box>
}