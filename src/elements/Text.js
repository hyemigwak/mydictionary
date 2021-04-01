import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { bold, color, size, children, verticalAlign} = props;
  
    const styles = {
        bold: bold,
        color: color,
        size: size,
        verticalAlign: verticalAlign,
    };
    return (
        <P {...styles}>
            {children}
        </P>
    )
};
Text.defaultProps = {
    children: null,
    bold: false,
    color: "#222831",
    size: "14px",
    verticalAlign: false,
}

const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold? "600" : "400")};
    vertical-align: ${(props) => props.verticalAlign? `vertical-align: bottom;`: ""}
`;

export default Text;
