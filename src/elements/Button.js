import React from "react";
import styled from "styled-components";


const Button = (props) => {
    const {text, _onClick, is_float, margin, width, padding, children} = props;

    if(is_float){
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
            </React.Fragment>
    
        );
    }
    const styles = {
        text:text,
        width: width,
        padding: padding,
        margin: margin,
    }

    return(
        <React.Fragment>
            <ElButton onClick={_onClick} {...styles}>{children}</ElButton>
        </React.Fragment>
    )
};


Button.defaultProps = {
    children: null,
    text:false,
    _onClick: () => {},
    is_float: false,
    margin: false,
    width: '100%',
    padding: "12px 0px",
};

const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: #696969;
    color: #ffffff;
    padding: ${(props) => props.padding};
    border: none;
    ${(props) => (props.margin? `margin: ${props.margin}`:'')}

`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #696969;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    border: none;
    border-radius: 50px;
    vertical-align: middle;
`;

export default Button;