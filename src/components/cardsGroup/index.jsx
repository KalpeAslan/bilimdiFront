import React from "react"
import {Box, useMediaQuery} from "@material-ui/core"

/**
 * HOC компонент, принимает компоненты Card**/

export default function ({children}) {
    const isFullWidth = useMediaQuery('(max-width: 880px)')
    return <Box style={{
        width: '100%',
        display: 'grid',
        'grid-template-columns': `repeat(auto-fill, minmax(${isFullWidth ? '100%' : '400px'}, 1fr))`,
        'grid-auto-columns': 'max-content',
        'grid-gap': '30px',
        'justify-content': 'space-between',
    }}>
        {children}
    </Box>
}