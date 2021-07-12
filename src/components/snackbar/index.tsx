import React from "react";
import {Snackbar} from "@material-ui/core";
import useScroll from 'hooks/useScroll'


interface SnackbarProps {
    handleClick: void,
    breakpoint: string | number
}

export default function ({handleClick, breakpoint}): React.FC<SnackbarProps> {
    const isBreakpoint = useScroll(breakpoint)
    return <Snackbar open autoHideDuration={6000}
    message={}>

    </Snackbar>
}