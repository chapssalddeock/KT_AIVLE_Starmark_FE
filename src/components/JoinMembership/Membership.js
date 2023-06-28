import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { useState, useCallback } from 'react';
import { SignUpFrame, BackgroundPage, InputSpace, TitleSpace, SingUpTitle, AlertSpace } from "../../../styles/Membership_Emotion"

import AuthManager from "../../AuthContext/AuthManager";
import Agreement from '../Modal/Agreement';



const formItemLayout = {
  labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
  wrapperCol: { xs: { span: 24, }, sm: { span: 20, }, },
};

const emailItemLayout = {
  labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
  wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 15, offset: 0, }, },
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 10, }, },
};

const SignUp = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const { EmailCheck, Register } = AuthManager();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false); // 성공 실패 마크 표시 저장
  const [catchError, setCatchError] = useState(false); // 에러 메세지 받은 것 확인
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(async (values) => {
    try {
      await Register(values);
      onSubmit(); // 폼 제출 후 onSubmit 함수 호출
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const handleClose = () => {
    setErrorMessage(null);
  };

  const handleFocusChange = (focus) => {
    setIsFocused(focus);
    if (!focus) {
      form.validateFields(['email']);
    }
  };

  const validateEmail = async (_, value) => {
    if (!isFocused) {
      setIsFocused(true);
      setShowFeedback(false);
      setCatchError(false);
      if (!value) {
        return Promise.resolve();
      }
      try {
        await EmailCheck(value);
        setShowFeedback(true);
      } catch (error) {
        setShowFeedback(true);
        setCatchError(true);
        return Promise.reject(new Error(error.message));
      }
    }
    return Promise.resolve();
  };

  const validatePassword = async (_, value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;
    const specailChar = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]*$/;
    const notSpace = /^\S+$/;
    const charLength = /^.{8,16}$/;

    if (!value) {
      return Promise.resolve();
    }
    if (!notSpace.test(value)) {
      return Promise.reject(new Error('공백은 허용하지 않습니다'));
    }
    if (!charLength.test(value)) {
      return Promise.reject(new Error('비밀번호는 8이상 16이하로 작성해 주세요'));
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error('영문 대소문자, 숫자를 포함해야 합니다'));
    }
    if (!specailChar.test(value)) {
      return Promise.reject(new Error('특수문자는 !@#$%^&* 만 사용 가능합니다'));
    }

    return Promise.resolve();
  };



  // 약관동의 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };


  return (
    <BackgroundPage>
      <SignUpFrame>
        <AlertSpace>
          <>
            {errorMessage !== null && (
              <Alert
                message={errorMessage}
                type="error"
                closable
                afterClose={handleClose}
                showIcon
              />
            )}
          </>
        </AlertSpace>
        <TitleSpace>
          <SingUpTitle>
            SignUp
          </SingUpTitle>
        </TitleSpace>
        <InputSpace>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleSubmit}
            style={{ maxWidth: 600, }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: 'E-mail을 입력해 주세요' },
                { validator: validateEmail }
              ]}
              hasFeedback={showFeedback}
              validateStatus={showFeedback ? (catchError ? 'error' : 'success') : ''}
            >
              <Input allowClear onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'password를 입력해 주세요', },
                { validator: validatePassword }
              ]}
              hasFeedback
            >
              <Input.Password allowClear />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '비밀번호 확인 칸에 입력해 주세요',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
                  },
                }),
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="사용자가 사용할 별명"
              rules={[
                {
                  required: true,
                  message: 'Nickname을 입력해 주세요',
                  whitespace: true,
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('약관에 동의하셔야 가입가능 합니다')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="#" onClick={showModal}>agreement</a>
                {modalOpen && <Agreement modalOpen={modalOpen} setModalOpen={setModalOpen} />}
              </Checkbox>
              {/* 모달 관련 추가 */}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </InputSpace>
      </SignUpFrame>
    </BackgroundPage>
  );
};
export default SignUp;