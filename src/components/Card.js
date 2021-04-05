import React from "react";
import {useDispatch} from "react-redux";
import {Button, Grid, Text, Input} from "../elements";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import post, {actionCreators as postActions} from "../redux/modules/post";
import {history} from "../redux/configureStore";

const Card = (props) => {
    const dispatch = useDispatch();
    const {word, description, example} = props;
    const post_id = props.id

    const deletePost = () => {
        dispatch(postActions.deletePostFB(post_id))
    }

    return (
        <React.Fragment>
            <Grid padding="16px" bg="#ffffff" margin="10px 0px">
                <Text size="12px" bold>Word</Text>
                <Text>{word}</Text>
                <Text size="12px" bold>Description</Text>
                <Text>{description}</Text>
                <Grid is_flex>
                    <Grid>
                        <Text size="12px" bold>Example</Text>
                        <Text color="#8b2fbb">{example}</Text>
                    </Grid>
                    <CreateIcon onClick={()=>{
                        history.push(`/write/${props.id}`);
                    }}/>
                    <DeleteIcon
                        onClick={deletePost}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Card.defaultProps = {
    word:"amy",
    description: "만 20세 신대방 거주 여성",
    example: "amy가 수면 부족 상태이다",
};


export default Card;





 


