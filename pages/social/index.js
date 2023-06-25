import SocialLayout from '../../src/commons/layout/SocialIndex'
//ContentArea만 쓰면 NavBar등이 없어짐

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