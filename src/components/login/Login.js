import { CustomerPage, TitleSpace, LoginTitle, ButtonDesign, InputSpace, TopScroll, ClickToTop }
  from "../../../styles/Login_Emotion"
import { Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const LoginPage = ({ scrollToTop }) => {
  return (
    <CustomerPage>
      <TitleSpace>
        <LoginTitle>
          로그인
        </LoginTitle>
      </TitleSpace>
      <InputSpace>
        <Form
          name="basic"
          labelCol={{ span: 7, offset: 0 }}
          wrapperCol={{ span: 16, }}
          style={{ maxWidth: 600, }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 3,
              span: 20,
            }}
          >
            <ButtonDesign type="primary" htmlType="submit" className="login-form-button">
              Log in
            </ButtonDesign>
            Or <a href="">register now!</a>
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