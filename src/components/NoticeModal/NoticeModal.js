import React from "react";
import { ModalContent } from '../../../styles/nav_emotion'

// 모달 컴포넌트
const NoticeModal = (clickNoticeModal) => {

    return (
        <>

            <ModalContent>
                <p>크롤링 완료!</p>
            </ModalContent>
        </>
    );

};
// const NoticeModal = (props) => {
//     // 전달받은 state 함수
//     const { clickModal } = props

//     return (

//         < div onClick={clickModal} >
//             <ModalContent>
//                 <p>크롤링 완료!</p>
//             </ModalContent>
//         </div >

//     )

// };
export default NoticeModal;
