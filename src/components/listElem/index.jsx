import React from 'react'
import {ListItem,ListItemIcon} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/*
* Компонент элеемнт списка
* */


export default function ({title, index,click}) {
    return <ListItem style={{display:'flex', justifyContent: 'space-between', width: '100%'}} onClick={click}
                     key={index} button>{title}<ListItemIcon><ExpandMoreIcon />
    </ListItemIcon></ListItem>
}