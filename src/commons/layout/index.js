import { useRouter } from "next/router"

// 레이아웃 import 및 구성 정의
import NavBar from "../../components/navbar/NavBar"
import NavBar2 from "../../components/navbar/NavBar2"
import ContentArea from "../../components/ContentArea/ContentArea"


// 어느 페이지에서 없애는 조건부 렌더링을 할 건지 경로 정의
const Hidden = [
    "/", "/join"
]


export default function Layout(props) {
    const router = useRouter()
    const isOpen = Hidden.includes(router.asPath)

    return (
        <>
            {isOpen && <NavBar />}
            {!isOpen && <NavBar2 />}
            <div>{props.children}</div>
            {!isOpen && <ContentArea />}
        </>
    )
}