import Layout from '../../src/commons/layout/index'
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