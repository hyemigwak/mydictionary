import React from "react";
import _ from "lodash";
import {Spinner} from "../elements";

const InfinityScroll = (props) => {

    const {children, callNext, is_next, loading} = props; //프롭스 가져오자! 

    const _handleScroll = _.throttle(()=>{
        if(loading){
            return;
        }
        const {innerHeight} = window;
        const {scrollHeight} = document.body;
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        //도큐먼트 아래에 도큐먼트 있니? 있으면 스크롤탑 가져와 or 도큐먼트 바디 스크롤탑 가져와라
        //브라우저 호환땜시 뒷놈을 적어야한다

        if(scrollHeight - innerHeight - scrollTop < 200) {
            callNext();
        }
    },300)

    const handleScroll = React.useCallback(_handleScroll, [loading]); // 초기화 되는것 방지하는 메모이제이션! 재사용원츄, 두번째 배열은 의존상태값

    //스크롤 이벤트는 처음 로드가 되었을때 달아주어야해! -> useEffect
    React.useEffect(()=>{
        if(loading){
            return;
        }
        if(is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll",handleScroll); //useefftct에선 return으로 언마운트처리 = 클린업
    },[is_next, loading]); //is_next/loading이 바뀔때마다 useEffect가 실행. 만약 is_next가 false라면 구독 해제가 됨

    return(
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    chidern: null,
    callNext: () => {}, //다음꺼 부르는 함수
    is_next: false, //다음꺼 있니??
    loading: false, //지금 부르고 있니??
}


export default InfinityScroll;