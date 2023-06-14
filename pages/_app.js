import '../styles/globals.css'
import Layout from "../src/commons/layout";
import 'bootstrap/dist/css/bootstrap.min.css';

// 레이아웃으로 감싸주면 전체 적용
export default function App({ Component, pageProps }) {
  return (<>

        <Layout>
          <Component {...pageProps} />
        </Layout>
  </>);
}
