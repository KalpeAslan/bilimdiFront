import React from "react"
import ModalFade from 'cpm/ModalFade'
import {Box, makeStyles} from "@material-ui/core"
const useStyles = makeStyles((theme)=> ({
    wrapper: {

    }
}))


export default function ({setOpenModal, openModal}){
    const classes = useStyles()
    const firstAreaView = <Box>
    </Box>
    return <ModalFade setOpenModal={setOpenModal} openModal={openModal}>
        <Box className={classes.wrapper}>
            {firstAreaView}
        </Box>
    </ModalFade>
}