import { useRouter } from "next/router"

// 레이아웃 import 및 구성 정의
import NavBar2 from "../../components/NavBar/NavBar2"
import ContentArea from "../../components/ContentArea/ContentArea"


// 어느 페이지에서 없애는 조건부 렌더링을 할 건지 경로 정의
const HiddenMain = [
    "/",
]

const HiddenJoin = [
    "/join",
]

const HiddenSocial = [
    "/social",
]


export default function Layout(props) {
    const router = useRouter()
    const isOpenMain = HiddenMain.includes(router.asPath)
    const isOpenJoin = HiddenJoin.includes(router.asPath)


    return (
        <>
            {!isOpenMain && <NavBar2 />}
            <div>{props.children}</div>
            {!isOpenMain && !isOpenJoin && <ContentArea />}
        </>
    )
}