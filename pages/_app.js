import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from "../src/AuthContext/AuthProvider"
import '../styles/Sidebar.css'
import '../styles/Animation.css'
import Head from 'next/head'


export default function App({ Component, pageProps }) {
  return (<>
    <AuthProvider>
      <Head>
        <title>STARMARK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </AuthProvider>

  </>);
}
