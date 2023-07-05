import {
  CustomerPage, LeftRibbonBadge, RibbonText, TitleSpace, LoginTitle, AlertSpace,
  ButtonDesign, InputSpace, CustomForm, CustomInput, CustomInputPassword, OtherText, GoRegister
} from "../../../styles/Login_Emotion"
import { Form, Input, Spin, Alert, Button } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthManager from "../../AuthContext/AuthManager";

const LoginPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { LogIn } = AuthManager();
  const [ errorMessage, setErrorMessage] = useState(null);
  
  const handleSubmit = async (values) => {
    try {
      await LogIn(values);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Alert Error MEssage handle
  const handleClose = () => {
    setErrorMessage(null);
  };

  const handleRegisterClick = () => {
    router.push('/join'); 
  };

  return (
    <CustomerPage>
      <LeftRibbonBadge text={<RibbonText>StarMark</RibbonText>} placement="start"/>
      <TitleSpace>
        <LoginTitle>
          로그인
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
            label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>이메일</span>}
            rules={[
              { type: 'email', message: <OtherText>유효하지 않는 이메일 입니다</OtherText> },
              { required: true, message: <OtherText>이메일을 입력해 주세요</OtherText> },
            ]}
            style={{ width: '100%', height: '12vh', marginBottom: '0vh' }}
          >
            <CustomInput allowClear
              prefix={<UserOutlined />}
              placeholder="Email"
              required
              inputbackgroundcolor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
            fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>비밀번호</span>}
            rules={[
              { required: true, message: <OtherText>비밀번호를 입력해 주세요</OtherText> },
            ]}
            style={{ width: '100%', height: '12vh', marginBottom: '2vh', marginTop: '1vh'}}
          >
            <CustomInputPassword allowClear
              prefix={<LockOutlined />}
              placeholder="Password"
              required
              inputbackgroundcolor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
              fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 0, span: 24, }}
          >
            <Button 
              type="primary" 
              htmlType="submit" 
                className="login-form-button"
                style={{ width: '30%', height: '100%', float: 'right', backgroundColor: 'white', 
                color: 'black', fontSize: '2vmin', fontWeight: 'bold', borderRadius: '20px',
                boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)'}} 
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
  );
};

export default LoginPage;