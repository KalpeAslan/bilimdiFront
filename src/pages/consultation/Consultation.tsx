import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslate} from "../../hooks/useLocale";
import {
    Box,
    Button,
    Fade,
    Grid,
    Icon,
    makeStyles,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import discountImg from 'icons/discount.png'
import coolImg from 'images/cool.png'
import {Container} from "../../components/Container/Container";
import {useGlobalClasses} from 'hooks/useGlobalClasses'
import starImg from 'images/star.png'
import planImg from 'images/profit/plan.png'
import statisticsImg from 'images/profit/statistics.png'
import readImg from 'images/profit/read.png'
import timeImg from 'images/time.png'
import MobileStepper from '@material-ui/core/MobileStepper';
import {AccountBalance, Equalizer, KeyboardArrowLeft, KeyboardArrowRight, People, Timeline} from "@material-ui/icons";
import {HourglassEmpty} from '@material-ui/icons'
import {useFormik} from "formik";
import * as yup from 'yup'
import Alert from '@material-ui/lab/Alert';
import {AlertTitle} from "@material-ui/lab";
import {fetchGrantsHttp} from "../../http/fetchGrantsHttp";
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    section: {
        width: '100%',
        padding: 60,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        }
    },
    alert: {
        position: 'fixed',
        top: '100px',
        zIndex: 1,
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    discount: {
        background: '#fff705',
        padding: 8,
        color: "black",
        borderRadius: 7,
        display: 'inline-flex',
        alignItems: 'center',
        ['&::before']: {
            content: '""',
            display: 'inline-block',
            background: `url(${discountImg}) center / 24px no-repeat`,
            width: 24,
            height: 24
        }
    },
    button: {
        width: 210,
        margin: '20px 0'
    },
    star: {
        position: 'absolute',
        width: 32,
        height: 32
    },
    profit: {
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(117,124,232,1) 0%, rgba(0,212,255,1) 100%)',
    },
    mobileStepper: {
        position: 'absolute',
        background: 'none',
        width: '100%',
        color: 'white',
        maxWidth: 400,
        minWidth: 200,
        bottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center'
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        }
    },
    trustItem: {
        width: 300,
        height: 200,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px'
    },
    imgWrapper: {
        width: 500,
        justifyContent: 'center',
        '& img': {
            height: 375
        },
        [theme.breakpoints.down('sm')]: {
            width: 250,
            '& img': {
                height: 200
            }
        },
    },
    formContainer: {
        background: theme.palette.primary.light,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'white',
        padding: '20px',
        width: '80vw',
        position: 'relative',
        borderRadius: 7,
        paddingTop: 40,
        [theme.breakpoints.up('sm')]: {
            width: 600
        },
    }
}))


interface UserForm {
    name: string,
    phone: number | string,
    email: string
}


let interval

export const Consultation: React.FC<React.ReactChildren> = ({children}) => {
    const classes = useStyles()
    const globalClasses = useGlobalClasses()
    const theme = useTheme();
    const profit = [
        {
            title: useTranslate('Полную информацию о ВУЗах и специальностях'),
            subtitle: useTranslate('Подробнее расскажем про ваши карьерные перспективы, и том, как выпуститься с предложением о работе'),
            imgName: planImg
        },
        {
            title: useTranslate('Больше шансов поступить на грант'),
            subtitle: useTranslate('Рекомендации по выбору специальностей так, чтобы повысить вероятность поступления на грант, исходя из опыта 2020 и результатов ЕНТ 2021'),
            imgName: statisticsImg
        },
        {
            title: useTranslate('Детальный разбор вашей ситуации'),
            subtitle: useTranslate('Индивидуальный подход, который поможет вам выработать стратегию для успешного поступления'),
            imgName: readImg
        }
    ]
    const [currentProfitSectionIndex, setCurrentProfitSectionIndex] = useState<number>(0)
    const [showAlert, setShowAlert] = useState(false)


    const inputForms = [
        {
            id: 'sName',
            label: useTranslate('Введите свое имя')
        },
        {
            id: 'sPhone',
            label: useTranslate('Введите свой номер телефона')
        },
        {
            id: 'sEmail',
            label: useTranslate('Введите свой email')
        }
    ]


    useEffect(() => {
        if (showAlert) {
            interval = setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        } else {
            clearInterval(interval)
        }
    }, [showAlert])

    const alertMessage = <Fade in={showAlert} timeout={500} className={classes.alert}>
        <Alert severity="success" onClose={() => setShowAlert(false)}>
            <AlertTitle style={{fontWeight: 'bold'}}>{useTranslate('Спасибо за заявку!')}</AlertTitle>
            {useTranslate('С вами в ближайщее время свяжится наш консультант!')}
        </Alert>
    </Fade>


    const handleNext = useCallback(() => {
        if (currentProfitSectionIndex === 2) return setCurrentProfitSectionIndex(0)
        setCurrentProfitSectionIndex(translateX => translateX + 1)
    }, [currentProfitSectionIndex])

    const handleBack = useCallback(() => {
        if (currentProfitSectionIndex === 0) return setCurrentProfitSectionIndex(2)
        setCurrentProfitSectionIndex(translateX => translateX - 1)
    }, [currentProfitSectionIndex])


    const trust = [
        {
            text: useTranslate('Более 1 года занимаемся вопросами поступления в КЗ вузы'),
            icon: <HourglassEmpty/>
        },
        {
            text: useTranslate('Мы эксперты в сфере образования, с большим опытом работы в образовательной сфере'),
            icon: <Timeline/>
        },
        {
            text: useTranslate('Более 1000 консультаций о поступлении для выпускников'),
            icon: <People/>
        },
        {
            text: useTranslate('Наша миссия увеличить число поступающих в ВУЗы осознанно, владея необходимой информацией.'),
            icon: <AccountBalance/>
        },
        {
            text: useTranslate('У нас имеется статистика, нужные данные и другие источники, которые помогают нам успешно прогнозировать шансы абитуриентов на получения гранта'),
            icon: <Equalizer/>
        }
    ]

    const handleFilterLinkClick = useCallback(() => {

    }, [])

    const formik = useFormik({
        initialValues: {
            sName: '',
            sPhone: '',
            sEmail: ''
        },
        validationSchema: yup.object().shape({
            sName: yup.string(useTranslate('Введите свое имя')).required(useTranslate('Поле для имени не модет быть пустым')),
            sPhone: yup.string(useTranslate('Введите свой номер телефона')).required(useTranslate('Поле для телефона не модет быть пустым')),
            sEmail: yup.string(useTranslate('Введите свой email')).email(useTranslate('Введите корректный email'))
        }),
        onSubmit: (values) => {
            fetchGrantsHttp.postNewUser(values).then(data => {
                setShowAlert(true)
            })
        }
    })

    const handleGetConsClick = useCallback(() => {
        window.scroll({top: document.querySelector('body').scrollHeight - 300, left: 0, behavior: 'smooth'})
    }, [])

    return <>
        <Container>
            {alertMessage}
            <section className={classes.section}>
                <Box display='flex' justifyContent='flex-end'>
                <span className={classes.discount}>
                    {useTranslate('Получи скидку в 50% до 24 июля!')}
                </span>
                </Box>
                <Box>
                    <Typography variant='h2' children={useTranslate('Выбирай правильное будущее!')}/>
                    <Typography variant='subtitle1'
                                children={useTranslate('Образовательная платформа для казахстанских абитуриентов')}/>
                    <Box mt={5}>
                        <Button variant="outlined" onClick={handleGetConsClick} color="primary"
                                style={{marginBottom: 30}}>
                            {useTranslate('Получить консультацию')}
                        </Button>
                    </Box>
                </Box>
            </section>
        </Container>
        <section className={classes.profit}>
            <Box position={'relative'} overflow={'hidden'}>
                <Typography variant={'h3'}
                            style={{textAlign: 'center', color: 'white', marginTop: 40, textAlign: 'center'}}
                            children={useTranslate('Что вы получаете на консультации?')}/>
                <Box className={classes.flexCenter} width={'300%'} overflow={'hidden'}>
                    {profit.map(({title, subtitle, imgName}, index) =>
                        <Box key={title + index} display='flex'
                             flexWrap={'wrap'}
                             style={{
                                 transform: `translateX(${-currentProfitSectionIndex + '00%'})`,
                                 transition: 'transform 0.4s'
                             }}
                             justifyContent='center' width={'100%'} pb={10} alignItems='center'>
                            <Box style={{color: 'white', maxWidth: 455, padding: 20}}>
                                <Typography variant='h5' style={{color: '#ffea00'}} children={index + 1}/>
                                <Typography variant='h4' style={{margin: '20px 0'}} children={title}/>
                                <Typography variant='subtitle1' children={subtitle}/>
                            </Box>
                            <Box className={classes.imgWrapper} justifyContent={'center'}>
                                <img src={imgName} alt={title}/>
                            </Box>
                        </Box>)}
                </Box>
                <MobileStepper
                    variant="progress"
                    steps={3}
                    position="static"
                    className={classes.mobileStepper}
                    activeStep={currentProfitSectionIndex}
                    nextButton={
                        <Button size="small" style={{color: 'white'}} onClick={handleNext}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                        </Button>
                    }
                    backButton={
                        <Button size="small" style={{color: 'white'}} onClick={handleBack}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                        </Button>
                    }
                />
            </Box>
        </section>

        <section style={{padding: '50px 0'}}>
            <Typography variant={'h3'} style={{textAlign: 'center'}}>
                {useTranslate('Почему мы?')}
            </Typography>
            <Grid container style={{padding: '0 60px'}} alignItems={'center'} justify={'center'}>
                {trust.map(trustItem => {
                    return <Grid item md={4} xs={3} className={classes.trustItem}>
                        <Icon>
                            {trustItem.icon}
                        </Icon>
                        <Typography variant={'subtitle1'} children={trustItem.text}/>
                    </Grid>
                })}
            </Grid>
        </section>
        <Box bgcolor='#8ae1f2'>
            <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'
                 className={globalClasses.container}>
                <img src={timeImg} width={240} loading='lazy' alt="Cool Cat"/>
                <Box display='flex' flexDirection='column' alignItems='center' position='relative'>
                    <Typography variant='h4' style={{textAlign: 'center'}}>
                        {useTranslate('Подбери себе ГРАНТ бесплатно на нашей платформе!')}
                    </Typography>
                    <Link to={'/filter'}>
                        <Button variant="contained" color="primary"  className={classes.button}>
                            {useTranslate('Подобрать грант')}
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
        <section className={classes.formContainer}>
            <Typography variant={'h3'} children={useTranslate('Успей подать заявку до 24 июля и получи скидку в 50%!')}
                        style={{margin: '40px 0', textAlign: 'center', padding: 20}}/>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Typography variant={'subtitle1'} children={useTranslate('Поможем в выборе!')}/>
                <Typography variant={'subtitle2'}>
                    {useTranslate('Если у вас есть вопросы о формате или вы не знаете что выбрать, оставьте свой номер: мы позвоним, чтобы ответить на все ваши вопросы.')}
                </Typography>
                {inputForms.map(inputForm => {
                    return <TextField id={inputForm.id}
                                      name={inputForm.id}
                                      style={{width: '100%', margin: '20px 0'}}
                                      key={inputForm.id}
                                      variant={'outlined'}
                                      type={inputForm.id === 'sPhone' ? 'phone' : 'text'}
                                      value={formik.values[inputForm.id]}
                                      onChange={formik.handleChange}
                                      error={formik.touched[inputForm.id] && Boolean(formik.errors[inputForm.id])}
                                      label={inputForm.label}
                                      helperText={formik.touched[inputForm.id] && formik.errors[inputForm.id]}
                    />
                })}
                <Button variant="contained" color="primary" type='submit' style={{width: '100%'}}>
                    {useTranslate('Отправить заявку!')}
                </Button>
            </form>
        </section>
    </>
}