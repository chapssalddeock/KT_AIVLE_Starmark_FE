import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop }
  from "../../../styles/Login_Emotion"
import { Form, Input } from 'antd';

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthContext/AuthProvider";
import axios from 'axios';
import { useRouter } from "next/router";
// import axios from "../../api/axios";
// const LOGIN_URL = 'api/token2/';


const LoginPage = ({ scrollToTop }) => {
  const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
  const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성
  const [form] = Form.useForm();
  const router = useRouter();

  // 잘못된 아이디, 비밀번호를 입력받아 놓고 에러 메세지 반환
  // useEffect(() => {
  //   setErrMsg('');
  // }, [form.getFieldValue("email"), form.getFieldValue("password")]);



  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/proxy', {
        email: values.email,
        password: values.password,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log(response.data);
      const accessToken = response?.data?.access;
      setAuth({ ...values, accessToken });
      console.log({ ...values, accessToken });
      form.resetFields();
      setSuccess(true);

    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
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