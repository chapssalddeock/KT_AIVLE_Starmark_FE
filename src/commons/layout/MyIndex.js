import NavBar2 from "../../components/NavBar/NavBar2"
import MpCotentArea from "../../components/ContentArea/MpContentArea"


export default function MpLayout(props) {

    return (
        <>
            <NavBar2 />
            <div>{props.children}</div>
            <MpCotentArea />
        </>
    )
}