import React from 'react';
import { Context } from "../contexts/TeaContext";
import {Link} from "react-router-dom"
import styled from "styled-components";
const TeaWrapper = styled.div`
 border: 1px solid red;
 display: flex;
 flex-flow: row wrap;
`
const TeaDiv = styled.div`
margin: 20px;
margin-top: 14px;
`
const TeaName = styled.h2`
text-align: center;

`
const TeaImg = styled.img`
 width: 200px;
 height: 200px;
 border-radius: 7px;
`
const Teas = props => {
    return (
        <Context.Consumer>
            {data => {
                if (!data.state.teas) {
                    return <h3>Loading</h3>
                }else {
                return (
                    <TeaWrapper>
                    {data.state.teas.map(tea => (
                        <TeaDiv>
                        <TeaName>{tea.name}</TeaName>
                        <TeaImg src={tea.message} alt="tea" onClick={(e) => props.history.push(`/teas/${tea.id}`)}/>
                        </TeaDiv>
                        )
                        )}                 
                    </TeaWrapper>
                )
                }
            }}
        </Context.Consumer>
    )
}

export default Teas;