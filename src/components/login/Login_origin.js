import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop }
  from "../../../styles/Login_Emotion"
import { Form, Input } from 'antd';


import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthContext/AuthProvider";
import axios from "../../Axios/axios";
// import axios from 'axios';
const LOGIN_URL = 'api/token2/';

import { UserOutlined, LockOutlined } from "@ant-design/icons";


const LoginPage = ({ scrollToTop }) => {
  const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
  const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성
  const [form] = Form.useForm();

  // 잘못된 아이디, 비밀번호를 입력받아 놓고 에러 메세지 반환
  // useEffect(() => {
  //   setErrMsg('');
  // }, [form.getFieldValue("email"), form.getFieldValue("password")]);

  

  const handleSubmit = async (values) => {
    try{
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: values.email, password: values.password }),
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true, // 현재 이 코드때문에 cors 오류가 났다
        }
      );
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }


    console.log(values);
    console.log(values.email);

    form.resetFields();

    // setAuth({ ...values, roles, accessToken });

    
}


  return (
    <CustomerPage>
      <TitleSpace>
        <LoginTitle>
          로그인
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </LoginTitle>
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
              {type: 'email', message: 'The input is not valid E-mail!'},
              {required: true, message: 'Please input your E-mail!'},
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
              {required: true, message: 'Please input your password!'},
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