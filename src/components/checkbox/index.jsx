import React from "react"
import styled from "styled-components"

const Checkbox = styled.div`
  padding: 5px;
  margin: 10px;
  border: ${props => props.active ? '1px solid #3d3bff' : '1px solid black'};
  border-radius: 15px;
  color: ${props => props.active ? 'white' : 'black'};
  text-align: center;
  background: ${props => props.active ? '#3d3bff' : 'white'};
  transition: background-color 0.2s ease-in-out, transform 0.015s ease-in-out;
  cursor: pointer;

  &:hover {
    color: white;
    border: 1px solid #3d3bff;
    background: #3d3bff;
  }

  &:active {
    border: 1px solid #2716c0;
    background: #2716c0;
    transform: translateY(2px);
  }
`


export default function ({active, children}) {
    return <Checkbox active={active}>
        {children}
    </Checkbox>
}