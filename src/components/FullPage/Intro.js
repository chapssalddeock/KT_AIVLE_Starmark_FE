import {
  Outer, ActiveInner2, ActiveInner3, ActiveInner4, UnderNavInner, Divider,
  PageBackGround, Temp, Wave, PageDark, Title, Content,
  FrameWrapper, ImgFrame,  TitleFrame, ContentFrame, 
  SecondImg, SecondTitle, SecondContent, 
  ThirdImg, ThirdTitle, ThirdContent, TagImgFrame, TagImg, 
  Square, RectangleImg, Bubble
} from "../../../styles/PageScroll_Emotion";
import LoginPage from "../SignIn/Login_Protect";
import { useEffect, useRef, useState } from "react";
import NavBar from '../NavBar/NavBar';
import 'animate.css';
import ScrollToTopButton from './ScrollToTopButton';

const DIVIDER_HEIGHT = 3;

export default function PageScroll() {
  const outerDivRef = useRef();
  const [visible, setVisible] = useState(false); // visible 상태와 업데이트 함수

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      //스크롤 내림
      if (deltaY > 0) {
        //1 page
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT, //721.99999
            left: 0,
            behavior: "smooth"
          });
        }
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2page
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth"
          });
        }
        else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 3page
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth"
          });
        }
      }
      //스크롤 올림
      else {
        if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
        else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const scrollToTop = () => {
    outerDivRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Top 버튼용도 useEffect
  useEffect(() => {
    // 스크롤 이벤트를 추가하여 버튼을 표시하거나 숨깁니다.
    const handleScroll = () => {
      const scrollTop = outerDivRef.current.scrollTop;
      setVisible(scrollTop > 300); // 스크롤 위치에 따라 버튼 표시 여부 결정
    };

    const divElement = outerDivRef.current; // div 요소를 변수에 할당

    if (divElement) {
      divElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleSignIn = () => {
    outerDivRef.current.scrollTo({
      top: outerDivRef.current.scrollHeight, // [ActiveInner4]의 위치로 이동
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Outer ref={outerDivRef} className="outer">
      <NavBar onSignIn={handleSignIn} />

      <UnderNavInner className="Inner">
        <PageBackGround>
          <Temp/>
          <Wave>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </Wave>
          <PageDark>
            <Title>
              오늘도 북마크를 헤메는 당신을 위해
            </Title>
            <Content>
              수많은 북마크들 중에서 당신에게 필요한 것들을 찾아줍니다<br/>
              starmark를 통해 효율적인 북마크 관리를 시작해 보세요
            </Content>
          </PageDark>
        </PageBackGround>
      </UnderNavInner>

      <Divider className="Divider"></Divider>

      <ActiveInner2 className="Inner" >
        <ImgFrame>
          <SecondImg />
        </ImgFrame>
        <FrameWrapper>
          <TitleFrame>
            <SecondTitle>
              정리된 북마크를 <br /> 태그를 통해 <br /> 사용해 보세요
            </SecondTitle>
          </TitleFrame>
          <ContentFrame>
            <SecondContent>
              자신이 저장해 놓은 북마크들을 starmark에 업로드 해보세요 <br />
              업로드 하면 사용자가 올리신 북마크들의 주제에 따라 각각 태그들을  <br />추출합니다.
              추출된 태그를 사용해서 북마크를 검색해 필요한 북마크를  <br />빠르게 찾아보세요
            </SecondContent>
          </ContentFrame>
        </FrameWrapper>

      </ActiveInner2>

      <Divider className="Divider"></Divider>

      <ActiveInner3 className="Inner" >
        <FrameWrapper>
          <TitleFrame>
            <ThirdTitle>
              사람들과 <br /> 서로의 북마크를 <br /> 공유해보세요
            </ThirdTitle>
          </TitleFrame>
          <ContentFrame>
            <ThirdContent>
              자신이 저장한 북마크들과 태그들을 다른 사용자와 공유해 보세요. <br />
              좋은 태그를 가지고 있는 사용자를 팔로우하고 팔로우한 사용자의  <br />좋은 정보들을 사용해 보세요
              다른 사람들과 공유하면서  <br />좋은 정보를 찾아가세요
            </ThirdContent>
          </ContentFrame>
        </FrameWrapper>
        <ImgFrame>
          <ThirdImg />
        </ImgFrame>
      </ActiveInner3>

      <Divider className="Divider"></Divider>
      
      <ActiveInner4 className="Inner">
        <TagImgFrame><TagImg></TagImg></TagImgFrame>

        <Square>
          <RectangleImg></RectangleImg>
          <Bubble></Bubble>
          <LoginPage />
        </Square>
      </ActiveInner4>
      <ScrollToTopButton visible={visible} scrollToTop={scrollToTop}/>

    </Outer>

  );
}