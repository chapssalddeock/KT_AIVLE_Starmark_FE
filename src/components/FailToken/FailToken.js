// Complete.js
import React from "react";
import { BackgroundPage, MainBlock, AlertPart, Content, ButtonBlock, BgLayout } from "../../../styles/Complete_Emotion";
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import useAuth from '../../AuthHooks/useAuth';

const FailToken = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    setAuth(null);
    localStorage.removeItem("TokenData");
    console.log(auth);
  }, []);

  return (
    <BgLayout>
      <BackgroundPage>
        <MainBlock>
          <AlertPart>로그인 만료</AlertPart>
          <Content>
            로그인이 만료되었습니다.<br/>
            다시 로그인 해주세요
          </Content>
          <ButtonBlock>
            <Button type="primary" block onClick={() => router.push('/')}
            style={{ width: '100%', height: '60%', backgroundColor: 'white', 
            color: 'black', fontWeight: 'bold', borderRadius: '20px',
            boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)', fontSize: '1.8vmin'}}
            >
              Go to Home
            </Button>
          </ButtonBlock>
        </MainBlock>
      </BackgroundPage>
    </BgLayout>
  );
};

export default FailToken;