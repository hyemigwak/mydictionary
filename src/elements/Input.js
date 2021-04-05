import React from "react";
import styled from "styled-components";
import Text from "./Text";
import Grid from "./Grid";

const Input = (props) => {

    const {label, placeholder, _onChange, value} = props;

    return (
        <React.Fragment>
            <Text>{label}</Text>
            <ElInput placeholder={placeholder} onChange={_onChange} value={value}/>
        </React.Fragment>
    )
};

Input.defaultProps = {
    label:"",
    placeholder: "텍스트를 입력해주세요!",
    _onChange: () => {},
    value: "",
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 15px 4px;
    box-sizing: border-box;
    
`;

export default Input;
