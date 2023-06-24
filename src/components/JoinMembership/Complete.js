import { BackgroundPage, MainBlock, AlertPart, Content, ButtonBlock } 
from "../../../styles/Complete_Emotion";

import { Button } from 'antd';
import { useRouter } from 'next/router';

const Complete = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/');
    };

    return (
        <BackgroundPage>
            <MainBlock>
                <AlertPart>
                    회원가입 완료
                </AlertPart>
                <Content>
                    이제 홈 화면으로 돌아가 편리한 북마크 정리 생활을 시작하세요!
                </Content>
                <ButtonBlock>
                    <Button block onClick={handleButtonClick}>
                        Go to Home
                    </Button>
                </ButtonBlock>
            </MainBlock>
        </BackgroundPage>
    )
}

export default Complete;