import '../styles/globals.css'
//import Layout from "../src/commons/layout";
import 'bootstrap/dist/css/bootstrap.min.css';;

import { AuthProvider } from "../src/AuthContext/AuthProvider";

// 레이아웃으로 감싸주면 전체 적용인데 페이지별로 공통 요소가 크지 않아서 수정
// 실질적으로 서비스가 굴러가는 서비스 페이지와 마이페이지 정도에 레이아웃 사용
export default function App({ Component, pageProps }) {
  return (<>
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>

  </>);
}
