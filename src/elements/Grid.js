import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {is_flex, width, padding, margin, bg, children} = props; //props로 설정해준 값 가져오기!! 

    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
    };
    return(
        <React.Fragment>
            <GridBox {...styles}>{children}</GridBox>
        </React.Fragment>
    );
};

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
}
//props로 넘어오는 것들
//패딩을 넓이에 포함하겠니(box-sizing) / ok -> border-box
const GridBox = styled.div`
    width: ${(props) => props.width}; 
    height: 100%;
    box-sizing: border-box; 
    ${(props) => (props.padding? `padding: ${props.padding};` : "")};
    ${(props) => (props.margin? `margin: ${props.margin};` : "")};
    ${(props) => (props.bg? `background-color: ${props.bg};` : "")};
    ${(props) => props.is_flex? `display: flex; align-items: center; justify-content: space-between;`: ""}

`;



export default Grid;