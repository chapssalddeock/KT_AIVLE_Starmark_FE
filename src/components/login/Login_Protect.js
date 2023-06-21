import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop }
  from "../../../styles/Login_Emotion"
import { Form, Input, message } from 'antd';

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
const LOGIN_URL = 'api/token2/';

import DataPOST from "../../api/AxiosPOST";

// add
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const LoginPage = ({ scrollToTop }) => {
  const { setAuth } = useAuth();
  
  const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
  const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성
  const [form] = Form.useForm();
  const router = useRouter();
  
  const handleSubmit = async (values) => {
    const jsonData = { email: values.email, password: values.password };
    const accessToken = '';
    const response = await DataPOST('api/token2/', jsonData, accessToken);

    if (response.error) {
      // Handle error message
      // console.log(response.error);
      // console.log(response?.error?.data?.error[0].message);
      if (response?.error?.data){
        setErrMsg(response?.error?.data?.error[0].message);
      } else {
        setErrMsg(response?.error);
      }
    } else {
      // Handle response data
      // console.log(response.data);
      accessToken = response?.data?.access;
      const accessExpire = response?.data?.access_expires;
      const refreshToken = response?.data?.refresh;
      const refreshExpire = response?.data?.refresh_expires;
      setAuth({ accessToken, refreshToken, accessExpire, refreshExpire });
      form.resetFields();
      setSuccess(true);
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
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          </TitleSpace>
          <InputSpace>
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