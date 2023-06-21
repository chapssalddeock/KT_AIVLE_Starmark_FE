import Layout from '../../src/commons/layout/index'
//import ContentArea from '../../src/components/ContentArea/ContentArea'
//ContentArea만 쓰면 NavBar등이 없어짐

import RequireAuth from '../../src/AuthContext/RequireAuth'

export default function Serviece() {
    return (
        <>
        <RequireAuth>
            <Layout>
            </Layout>
        </RequireAuth>
            
        </>

    )
}