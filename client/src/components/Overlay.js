import React from 'react';
import image from '../../images/store2.png';
import styled from 'styled-components';
const Style = styled.div`
    .jumbotron{
        background: url(${image}) no-repeat center;
        background-size: cover;
        height: 300px;
    }
    .container{
        text-align: center;
        background-color: white;
        color: black;
        opacity: 0.7;
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .container h2 {
        text-decoration: underline;
    }
`;

const Overlay = ({children, paragraph, header}) => <Style>
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h2>{ header }</h2>
            <p>{ paragraph }</p>
        </div>
    </div>
    {
        children
    }
</Style>

export default Overlay;
