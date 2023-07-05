// 레이아웃 import 및 구성 정의
import NavBar2 from "../../components/NavBar/NavBar2"
import SocialCotentArea from "../../components/ContentArea/SocialCotentArea"


export default function SocialLayout(props) {

    return (
        <>
            <NavBar2 />
            <div>{props.children}</div>
            <SocialCotentArea />
        </>
    )
}