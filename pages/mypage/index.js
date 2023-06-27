import MpContentArea from "../../src/components/ContentArea/MpContentArea"
import RequireAuth from '../../src/AuthContext/RequireAuth'


export default function MyPage() {
    return (
        <>
            <RequireAuth>
                <MpContentArea />
            </RequireAuth>

        </>

    )

}