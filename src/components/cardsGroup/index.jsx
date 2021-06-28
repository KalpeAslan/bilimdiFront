import React from "react"
import {Box, useMediaQuery, useTheme} from "@material-ui/core"

/**
 * HOC компонент, принимает компоненты Card**/

export default function ({children}) {
    const theme = useTheme()
    const isFullWidth = useMediaQuery(theme.breakpoints.down('md'))
    return <Box style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${isFullWidth ? '100%' : '400px'}, 1fr))`,
        gridAutoColumns: 'max-content',
        gridGap: '30px',
        justifyContent: 'space-between',
    }}>
        {children}
    </Box>
}