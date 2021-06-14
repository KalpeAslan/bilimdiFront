import React from 'react'
import {Backdrop, Fade, Modal} from "@material-ui/core"

export default function ({setOpenModal, openModal, children}){
     return <Modal
        aria-labelledby="transition-modal-title"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openModal}>
            {children}
        </Fade>
    </Modal>
}