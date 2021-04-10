import React, { useRef } from "react";
import {Button, Grid, Text, Input} from "../elements";
import {useDispatch, useSelector} from "react-redux";
import post, {actionCreators as postActions} from "../redux/modules/post";
import {history} from "../redux/configureStore";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list);
    
    const post_id = props.match.params.id;
    const is_edit = post_id? true : false;
    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;

    const [word, setWord] = React.useState(_post? _post.word : ""); //초기값으로 _post.word값 설정
    const [description, setDesc] = React.useState(_post? _post.description : "");
    const [example, setExam] = React.useState(_post? _post.example : "");

    React.useEffect(()=>{
        if(is_edit && !_post){ //리덕스에서 데이터를 가져오니 새로고침하면 날아간다. 그럴경우에는 뒤로가기 처리 해준다!()
            console.log("포스트정보없움 무야호");
            history.goBack();
            return;
        }
    },[])

    const setPost = () => {
        if(!word || !description || !example){
            window.alert("모두 입력해주세요!");
            return;
        }
        dispatch(postActions.addPostFB(word,description,example));
        console.log("무야호");
    };

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id,{word:word, description:description, example:example}))
    }


    return(
        <React.Fragment>
            <div style={{width: "30%", margin:"200px auto"}}>
                <Grid padding="16px" bg="#f4d5d5">
                    <Grid>
                        <Text bold size="30px">
                            {is_edit? "단어 수정하기" : "단어 추가하기"}</Text>
                    </Grid>
                    <Grid bg="#ffffff">
                        <Text bold size="12px">이름</Text>
                        <Input placeholder="이름을 입력해주세요!" value={word}
                        _onChange={(e) => {
                            setWord(e.target.value);
                        }}></Input>
                    </Grid >
                    <Grid bg="#ffffff">
                        <Text bold size="12px">설명</Text>
                        <Input placeholder="설명을 입력해주세요!" value={description}
                        _onChange={(e)=>{
                            setDesc(e.target.value);
                        }}></Input>
                    </Grid>
                    <Grid bg="#ffffff">
                        <Text bold size="12px">하고싶은말</Text>
                        <Input placeholder="하고싶은말을 입력해주세요!" value={example} _onChange={(e)=>{
                            setExam(e.target.value);
                        }}></Input>
                    </Grid>
                    {is_edit? (<Button margin="15px 0px" _onClick={editPost}>수정하기</Button>
                    ):(
                    <Button margin="15px 0px" _onClick={setPost}>추가하기</Button>)}
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default PostWrite;