import Layout from '../../src/commons/layout/index'
//import ContentArea from '../../src/components/ContentArea/ContentArea'
//ContentArea만 쓰면 NavBar등이 없어짐

import RequireAuth from '../../src/components/RequireAuth'


export default function Social() {
    return (
        <>
            <RequireAuth>
                <Layout>
                </Layout>
            </RequireAuth>
        </>

    )
}


