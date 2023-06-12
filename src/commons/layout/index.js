import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import TempBody from "../../components/tempbody/Body"
// 레이아웃 속성 (즉, head body navBar, footer 등등을 여기에 끌어와서 정의)
export default function Layout(props) {
    return (
        <>
            <div>{props.children}</div>
            <TempBody />
            {/* <Footer /> */}
        </>
    )
}