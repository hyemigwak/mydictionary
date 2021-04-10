import React from "react";
import Card from "../components/Card";
import {Grid, Text} from "../elements";
import {actionCreators as postActions} from "../redux/modules/post";
import {useSelector, useDispatch} from "react-redux";
import { history } from "../redux/configureStore";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from "styled-components";
import InfinityScroll from "../shared/InfinityScroll";


const Post = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=>state.post.list);

    //무한스크롤을 위해 state에서 가져왔어효
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);
    
    React.useEffect(()=>{
        dispatch(postActions.getPostFB());
    },[])

    return (
    <div style={{width: "30%", margin:"0 auto"}}>
        <Grid padding="16px" bg="#f4d5d5">
            <Grid>
                <Text bold size="30px">My Dictionary</Text>
            </Grid>
            {/* <Card/> */}
            <InfinityScroll callNext={()=>{
                dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next? true : false}
            loading={is_loading}
            
            >
                {post_list.map((p,idx)=>{
                    return <Card key={p.id}{...p}/> //card의 모든 정보 = ...p, map에는 key가 필요해요!
                })}
                <Btn>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon onClick={()=>{history.push('/write');}}/>
                    </Fab>
                </Btn>
            </InfinityScroll>
        </Grid>

    </div>
    );
}

const Btn = styled.div`
    position: absolute;
    top: 4%;
    left: 60%;
`;


export default Post;