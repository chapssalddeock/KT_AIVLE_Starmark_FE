import { Button, Checkbox, Form, Alert, } from 'antd';
import { useState, useCallback } from 'react';
import { SignUpFrame, BackgroundPage, IMGFrame, InputImg, RegisterFrame, InputSpace, TitleSpace, SingUpTitle, AlertSpace,
  CustomForm, CustomInput, CustomInputPassword, OtherText, LeftRibbonBadge, RibbonText, GoHome, GoButton
} from "../../../styles/Membership_Emotion"

import AuthManager from "../../AuthContext/AuthManager";
import Agreement from '../Modal/Agreement';
import { useRouter } from 'next/router';


const formItemLayout = {
  labelCol: { span: 24 }, // label의 컬럼 설정
  wrapperCol: { span: 24 }, // Input의 컬럼 설정
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0, } },
};

const SignUp = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const { EmailCheck, Register } = AuthManager();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false); // 성공 실패 마크 표시 저장
  const [catchError, setCatchError] = useState(false); // 에러 메세지 받은 것 확인
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const handleGoToHome = () => {
    router.push('/');
  };

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
        return Promise.reject(<OtherText>{error.message}</OtherText>);
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
      return Promise.reject(<OtherText>공백은 허용하지 않습니다</OtherText>);
    }
    if (!charLength.test(value)) {
      return Promise.reject(<OtherText>비밀번호는 8이상 16이하로 작성해 주세요</OtherText>);
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(<OtherText>영문 대소문자, 숫자를 포함해야 합니다</OtherText>);
    }
    if (!specailChar.test(value)) {
      return Promise.reject(<OtherText>특수문자는 !@#$%^&* 만 사용 가능합니다</OtherText>);
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
        <IMGFrame><InputImg></InputImg></IMGFrame>
      <RegisterFrame>
      <SignUpFrame>
      <LeftRibbonBadge text={<RibbonText>StarMark</RibbonText>} placement="start"/>
        <TitleSpace>
        <AlertSpace>
          {errorMessage !== null && (
            <Alert
              message={errorMessage}
              type="error"
              closable
              afterClose={handleClose}
              showIcon
            />
          )}
        </AlertSpace>
          <SingUpTitle>
            회원가입
          </SingUpTitle>
        </TitleSpace>
        <InputSpace>
          <CustomForm
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleSubmit}
            style={{ maxWidth: 600, }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>이메일</span>}
              rules={[
                { required: true, message: <OtherText>E-mail을 입력해 주세요</OtherText>},
                { validator: validateEmail }
              ]}
              hasFeedback={showFeedback}
              validateStatus={showFeedback ? (catchError ? 'error' : 'success') : ''}
              style={{ width: '100%', height: '12vh', marginBottom: '0vh' }}
            >
              <CustomInput allowClear onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} 
              inputBackgroundColor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
              fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>비밀번호</span>}
              rules={[
                { required: true, message: <OtherText>password를 입력해 주세요</OtherText> },
                { validator: validatePassword }
              ]}
              hasFeedback
              style={{ width: '100%', height: '12vh', marginBottom: '0vh', }}
            >
              <CustomInputPassword allowClear 
              inputBackgroundColor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
              fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>비밀번호 확인</span>}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: <OtherText>비밀번호 확인 칸에 입력해 주세요</OtherText>,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(<OtherText>비밀번호가 일치하지 않습니다</OtherText>);
                  },
                }),
              ]}
              style={{ width: '100%', height: '12vh', marginBottom: '0vh', }}
            >
              <CustomInputPassword allowClear 
              inputBackgroundColor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
              fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
              />
            </Form.Item>
            <Form.Item
              name="nickname"
              label={<span style={{ fontSize: '2vmin', fontWeight: 'bold' }}>닉네임</span>}
              tooltip={<OtherText>사용자가 사용할 별명</OtherText>}
              rules={[
                {
                  required: true,
                  message: <OtherText>Nickname을 입력해 주세요</OtherText>,
                  whitespace: true,
                },
              ]}
              style={{ width: '100%', height: '12vh', marginBottom: '0vh', }}
            >
              <CustomInput allowClear 
              inputBackgroundColor="#cae6fe"
              style={{ width: '100%', height: '5vh', marginBottom: '0vh', 
              fontSize: '2vmin', backgroundColor: '#cae6fe', borderRadius: '30px' }}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(<OtherText>약관에 동의하셔야 가입가능 합니다</OtherText>),
                },
              ]}
              {...tailFormItemLayout}
              style={{ textAlign: 'left' }}
            // 스타일 추가 
            >
              <Checkbox>
                <OtherText>약관을 읽고 <a href="#" onClick={showModal}>약관 동의</a> 하였습니다.</OtherText>
                {modalOpen && <Agreement modalOpen={modalOpen} setModalOpen={setModalOpen} />}
              </Checkbox>
          
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{ float: 'right', backgroundColor: 'white', 
              color: 'black', fontWeight: 'bold', borderRadius: '20px',
              boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)'}} 
              
              type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </CustomForm>
        </InputSpace>
      </SignUpFrame>
      <GoHome><GoButton onClick={handleGoToHome}>Back to Home</GoButton></GoHome>
      </RegisterFrame>
    </BackgroundPage>
  );
};
export default SignUp;