import React from 'react'
import {ListItem, Typography} from "@material-ui/core"
import styled from "styled-components"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledListItem = styled(ListItem)`
  position: relative;
  box-sizing: border-box;
  padding: 8px 24px;
  width: 100%;
  margin: 10px 0;
  borderRadius: 4;
  &::before {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    content: '';
    background: url("${({icon}) => icon}") center / 30px no-repeat;
  }
`

export default function ({name, icon, click,editable, index}) {
    return <StyledListItem onClick={()=>click(index)} button icon={icon} >
        <Typography>{name}</Typography>
        {editable && <ExpandMoreIcon style={{marginLeft: editable &&'auto'}}/>}
    </StyledListItem>
}