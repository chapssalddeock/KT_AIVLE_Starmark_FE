import { Button, Checkbox, Form, Input } from 'antd';
import { useState, useCallback } from 'react';
import { SignUpFrame, BackgroundPage, InputSpace, TitleSpace, SingUpTitle } from "../../../styles/Membership_Emotion"

import AuthManager from "../../AuthContext/AuthManager";

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

const SignUp = () => {
  const [form] = Form.useForm();

  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isUse, setIsUse] = useState(false);

  const {EmailCheck, Register } = AuthManager();
  const [errorMessage, setErrorMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false); // 성공 실패 마크 표시 저장
  const [catchError, setCatchError] = useState(false); // 에러 메세지 받은 것 확인
  const [inputValue, setInputValue] = useState('');
  const [validationTriggered, setValidationTriggered] = useState(false);

  const handleSubmit = async (values) => {
    try {
      Register(values);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      // 에러 메세지 추가 작업
    }
  }

  

  const validateEmail = useCallback(async (_, value) => {
    setShowFeedback(false);
    setCatchError(false);
  
    try {
      await EmailCheck(value);
      setShowFeedback(true);
    } catch (error) {
      setShowFeedback(true);
      setCatchError(true);
      return Promise.reject(new Error(error.message));
    }
  }, []);
  
  
  
  

  
  
  return (
    <BackgroundPage>
      <SignUpFrame>
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
                // { type: 'email', message: 'The input is not valid E-mail!', },
                { required: true, message: 'Please input your E-mail!', },
                { validator: validateEmail } // add
              ]}
              hasFeedback={showFeedback}
              validateStatus={
                showFeedback
                  ? (catchError ? 'error' : 'success')
                  : ''
              }
              help={showFeedback ? (catchError ? null : '비밀번호 유효') : null}
            >
              <Input autoFocus />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
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



// import React, { useState } from 'react';
// import { Form, Input } from 'antd';
// import AuthManager from "../../AuthContext/AuthManager";

// const MyForm = () => {
//   const [form] = Form.useForm();
//   const [isFocused, setIsFocused] = useState(false);
//   const {EmailCheck, Register } = AuthManager();

//   const handleFocusChange = (focus) => {
//     setIsFocused(focus);
//     if (!focus) {
//       form.validateFields(['fieldName']);
//     }
//   };

//   const validateInput = async (_, value) => {
//     if (!isFocused) {
//       // Perform your validation logic here

//       try {
//               await EmailCheck(value);
//               console.log("post");
//             } catch (error) {
//               console.log(error);
              
//               return Promise.reject(new Error(error.message));
//             }
//       if (!value) {
//         return Promise.reject(new Error('Input is required'));
//       }
//     }
//     return Promise.resolve();
//   };

//   return (
//     <Form form={form}>
//       <Form.Item
//         name="fieldName"
//         label="Field Label"
//         rules={[
//           {
//             validator: validateInput,
//           },
//         ]}
//       >
//         <Input onFocus={() => handleFocusChange(true)} onBlur={() => handleFocusChange(false)} />
//       </Form.Item>
//     </Form>
//   );
// };

// export default MyForm;




