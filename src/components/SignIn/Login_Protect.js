// ////////////////////////////////////////// 수정본
import {
  CustomerPage, TitleSpace, LoginTitle, AlertSpace,
  ButtonDesign, InputSpace, CustomForm, GoRegister
} from "../../../styles/Login_Emotion"
import { Form, Input, Spin, Alert, Button } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthManager from "../../AuthContext/AuthManager";

const LoginPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { LogIn, AlertComponent } = AuthManager();
  const [ errorMessage, setErrorMessage] = useState(null);
  

  // 로딩 스피너
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (values) => {
    try {
      setLoading(true); // 로딩 시작
      await LogIn(values);
      setLoading(false); // 로딩 종료
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setErrorMessage(error.message);
      setLoading(false); // 로딩 종료
    }
  }

  // Alert Error MEssage handle
  const handleClose = () => {
    setErrorMessage(null);
  };

  const handleRegisterClick = () => {
    router.push('/join'); // '/register'로 라우팅
  };

  return (
    <>
      <CustomerPage>
        <TitleSpace>
          <LoginTitle>
            LOG IN
          </LoginTitle>
          <AlertSpace>
              {errorMessage !== null && (
                <Alert
                  message={errorMessage}
                  type="error"
                  closable
                  afterClose={handleClose}
                  showIcon
                  style={{ width: '100%', height: '100%', fontSize: '1.9vmin' }}
                />
              )}
          </AlertSpace>
        </TitleSpace>
        <InputSpace>
          <CustomForm
            form={form}
            labelCol={{ span: 24, offset: 0 }}
            wrapperCol={{ span: 24, }}
            style={{ maxWidth: 800, }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                required
                style={{ width: '100%', height: '5vh', marginBottom: '1vh', fontSize: '2vmin' }} // Input 컴포넌트의 너비 조정
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                required
                style={{ width: '100%', height: '5vh', marginBottom: '2vh', fontSize: '2vmin' }}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 0, span: 24, }}
            >
              <Button 
                type="primary" 
                htmlType="submit" 
                 className="login-form-button"
                 style={{ width: '100%', height: '5vh', marginBottom: '2vh', fontSize: '2vmin' }}
                 >
                Sign in
              </Button>
              <GoRegister>
              아직 회원이 아닌가요? <a href="#" onClick={handleRegisterClick} style={{ textDecoration: 'none' }}> 회원가입</a>
              </GoRegister>
            </Form.Item>

          </CustomForm>
        </InputSpace>
      </CustomerPage>
      {loading && (<div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
      }}>
        <Spin spinning={loading} size="large" ></Spin>
      </div>)}

    </>
  );


};

export default LoginPage;





// // ////////////////////////////////////////// 원본
// import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop } from "../../../styles/Login_Emotion"
// import { Form, Input } from 'antd';
// import { UserOutlined, LockOutlined } from "@ant-design/icons";


// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import useAuth from "../../AuthHooks/useAuth";

// import AuthManager from "../../AuthContext/AuthManager";



// const LoginPage = ({ scrollToTop }) => {


//   const { setAuth } = useAuth();

//   const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
//   const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성
//   const [form] = Form.useForm();
//   const router = useRouter();

//   const { LogIn, AlertComponent } = AuthManager();
//   const [errorMessage, setErrorMessage] = useState(null);


//   const handleSubmit = async (values) => {
//     try {
//       await LogIn(values);
//     } catch (error) {
//       console.log(error);
//       setErrorMessage(error.message);
//       // 에러 메세지 추가 작업
//     }
//   }

//   return (
//         <CustomerPage>
//           <TitleSpace>
//             <LoginTitle>
//               로그인
//             </LoginTitle>
//           </TitleSpace>
//           <InputSpace>
//           {errorMessage && (
//           <AlertComponent type="error" closable afterClose={() => setErrorMessage(null)} />
//         )}
//             <Form
//               form={form}
//               labelCol={{ span: 7, offset: 0 }}
//               wrapperCol={{ span: 16, }}
//               style={{ maxWidth: 600, }}
//               autoComplete="off"
//               onFinish={handleSubmit}

//             >
//               <Form.Item
//                 name="email"
//                 rules={[
//                   { type: 'email', message: 'The input is not valid E-mail!' },
//                   { required: true, message: 'Please input your E-mail!' },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Email"
//                   required
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[
//                   { required: true, message: 'Please input your password!' },
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   placeholder="Password"
//                   required
//                 />
//               </Form.Item>
//               <Form.Item
//                 wrapperCol={{
//                   offset: 0,
//                   span: 16,
//                 }}
//               >
//                 <ButtonDesign type="primary" htmlType="submit" className="login-form-button">
//                   Sign in
//                 </ButtonDesign>
//                 Or <a href="">register Account</a>
//               </Form.Item>
//             </Form>
//           </InputSpace>
//           <TopScroll>
//             <ClickToTop onClick={scrollToTop}>맨 위로 이동</ClickToTop>
//           </TopScroll>


//         </CustomerPage>
//   );


// };

// export default LoginPage;
