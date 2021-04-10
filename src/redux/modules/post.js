import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {firestore} from "../../shared/firebase"
import { size } from "lodash";

//action 타입 생성
const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

//action 생성 함수 생성
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post_list, paging) => ({ post_list,paging }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//state 만들기
const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false, 
};

//firebase 연결.............후
const deletePostFB = (post_id) => {
    return function(dispatch, getState, {history}){
        if(!post_id){
            return;
        }
        const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        console.log(_post);

        const postDB = firestore.collection("post");
        postDB.doc(post_id).delete().then(()=>{
            console.log("파이어베이스에서 지웠다능 꺄륵")
            dispatch(deletePost(post_id));
            history.replace("/");
        }).catch((error) => {
            console.error("파이어베이스 에러가 났다!", error);
        });

    }
}


const editPostFB = (post_id = null, post = {}) => {
    return function(dispatch, getState, {history}){
        if(!post_id){
            console.log("포스트없다 무야호!");
            return;
        }
        const _post_idx = getState().post.list.findIndex(p => p.id === post_id); //post index찾기
        const _post = getState().post.list[_post_idx]; //post 그거 한 개 찾기

        const postDB = firestore.collection("post");
        postDB.doc(post_id).update(post).then(()=>{
            dispatch(editPost(post_id,post)) //{...post} 써도 post랑 똑같다
            history.replace("/");
        })
    }
}

const addPostFB = (word,description,example) => {
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        const _post = {
            word: word,
            description: description,
            example: example,
        }
        console.log(_post);
        postDB.add(_post).then((doc)=> {
            let post = {..._post, id:doc.id};
            console.log(post);
            dispatch(addPost(post));
            history.replace("/");
        })
        .catch((err) => {
            console.log("작성에 실패했어요!", err);
        });
    }
}

const getPostFB = (start = null, size = 3) => {
    return function (dispatch, getState, {history}){

        //시작점은 있으나 next가 없으면 굳이 아래 함수 실행할 필요 없으므로 return하자
        let _paging = getState().post.paging;
        if(_paging.start && !_paging.next){
            return;
        }

        dispatch(loading(true)); //게시물 가지고 오자마자 loading처리가 필요하다!! true = 로딩즁
        const postDB = firestore.collection("post");

        //무한스크롤 준비(word 오름차순으로 가져오고 size보다 1개 더 가져오자 but 리덕스에는 size만큼만 넣겠다)
        let query = postDB.orderBy("word");

        //시작점 정보가 있다면, 거기부터 가져오기
        if(start){
            query = query.startAt(start); //start점에 넣어주기
        }

        query.limit(size + 1).get().then(docs => {
            let post_list = [];

            //페이징 정보쓰기
            let paging = {
                start: docs.docs[0], //처음꺼는 독스의 0번째, size+1만큼 길이가 된다면 마지막꺼가 next가 됨, 길이안되면 다음꺼 없다
                next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
                size: size,
            }

            docs.forEach((doc) => {
                post_list.push({...doc.data(),id:doc.id});
            })
            //push로 모든 데이터 들어갔는데 우리는 size만큼만 넣고싶으니까 마지막놈 빼주기 pop
            post_list.pop();

            dispatch(getPost(post_list,paging));
        });
        
        return;
        
        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                post_list.push({...doc.data(),id:doc.id});
            })
            dispatch(getPost(post_list));
        })
    }
}

//리듀서 만들기
export default handleActions(
    {
        [ADD_POST]:(state,action) => produce(state, (draft) => {
           draft.list.unshift(action.payload.post); //맨앞에 추가하기
        }),
        
        [GET_POST]:(state,action) => produce(state,(draft) => { //firestore에서 넘어온 리스트로 갈아껴주기
            draft.list.push(...action.payload.post_list);
            draft.paging = action.payload.paging; //페이징도 넘어갔으
            draft.is_loading = false; //다 불러왔으니 이제 false가 된다
        }),

        [EDIT_POST]:(state,action) => produce(state,(draft) => {
            //몇번째껄 수정해야하는지 알아야함 findIndex 배열 뒤져서 찾아냄
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            draft.list[idx] = {...draft.list[idx], ...action.payload.post}; //하나만 수정될 수 있어서? 스프레드 문법
        }),

        [DELETE_POST]:(state,action) => produce(state,(draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            draft.list.splice(idx,1); //splice에는 index값만 들어가야한다. 전체 객체가 들오가면 안돼!!!! 
        }),

        [LOADING]:(state,action) => produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading; //export 해줄 필요 없음 트루폴스라
        })

    }, initialState 
    

);


//actioncreators 보내주자 잘가라 친구들아 
const actionCreators = {
    addPost,
    getPost,
    editPost,
    deletePost,
    getPostFB,
    addPostFB,
    editPostFB,
    deletePostFB,
};
  
export { actionCreators };