import RequireAuth from '../../src/AuthContext/RequireAuth'
import MpLayout from '../../src/commons/layout/MyIndex'

export default function MyPage() {
    return (
        <>
            <RequireAuth>
                <MpLayout />
            </RequireAuth>

        </>

    )

}