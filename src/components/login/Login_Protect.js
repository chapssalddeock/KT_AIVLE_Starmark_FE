import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop } from "../../../styles/Login_Emotion"
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";


import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DataPOST from "../../Axios/AxiosPOST";
import useAuth from "../../AuthHooks/useAuth";

import AuthManager from "../../AuthContext/AuthManager";



const LoginPage = ({ scrollToTop }) => {


  const { setAuth } = useAuth();
  
  const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
  const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성
  const [form] = Form.useForm();
  const router = useRouter();

  const { LogIn, AlertComponent } = AuthManager();
  const [errorMessage, setErrorMessage] = useState(null);

  
  const handleSubmit = async (values) => {
    try {
      await LogIn(values);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      // 에러 메세지 추가 작업
    }
  }

  useEffect(() => {
    if (success) {
      router.push("/service");
    }
  }, [success]);


  return (
        <CustomerPage>
          <TitleSpace>
            <LoginTitle>
              로그인
            </LoginTitle>
          </TitleSpace>
          <InputSpace>
          {errorMessage && (
          <AlertComponent type="error" closable afterClose={() => setErrorMessage(null)} />
        )}
            <Form
              form={form}
              labelCol={{ span: 7, offset: 0 }}
              wrapperCol={{ span: 16, }}
              style={{ maxWidth: 600, }}
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
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <ButtonDesign type="primary" htmlType="submit" className="login-form-button">
                  Sign in
                </ButtonDesign>
                Or <a href="">register Account</a>
              </Form.Item>
            </Form>
          </InputSpace>
          <TopScroll>
            <ClickToTop onClick={scrollToTop}>맨 위로 이동</ClickToTop>
          </TopScroll>


        </CustomerPage>
  );


};

export default LoginPage;