import SocialLayout from '../../src/commons/layout/SocialIndex'
import RequireAuth from '../../src/AuthContext/RequireAuth'


export default function Social() {
    return (
        <>
            <RequireAuth>
                <SocialLayout>
                </SocialLayout>
            </RequireAuth>
        </>

    )
}