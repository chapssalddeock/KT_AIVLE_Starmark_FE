import {
  Outer, ActiveInner2, ActiveInner3, ActiveInner4, UnderNavInner, Divider,
  PageBackGround, Temp, Wave, PageDark, Title, Content, FirstImg,
  SecondImg, SecondTitle, SecondContent, ThirdImg, ThirdTitle, ThirdContent, SquareParent, Square
} from "../../../styles/PageScroll_Emotion";
import LoginPage from "../SignIn/Login_Protect";
import { useEffect, useRef, useState } from "react";
import NavBar from '../NavBar/NavBar';
import 'animate.css';

const DIVIDER_HEIGHT = 3;

const LoginPageWithScrollToTop = ({ scrollToTop }) => (
  <LoginPage scrollToTop={scrollToTop} />
);

export default function PageScroll() {
  const outerDivRef = useRef();

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      //스크롤 내림
      if (deltaY > 0) {
        // console.log(scrollTop);
        // console.log(pageHeight); // 722
        //1 page
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // console.log("1page,down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT, //721.99999
            left: 0,
            behavior: "smooth"
          });
        }
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2page
          // console.log("2 page down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth"
          });
        }
        else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 3page
          // console.log("3 page down");
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
          // console.log("2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // console.log("3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
        else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // console.log("4페이지, up");
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
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSignIn = () => {
    outerDivRef.current.scrollTo({
      top: outerDivRef.current.scrollHeight, // [ActiveInner4]의 위치로 이동
      left: 0,
      behavior: "smooth",
    });
  };

  // add
  const [isFadeIn, setIsFadeIn] = useState(true);

  const handleAnimationEnd = () => {
    setIsFadeIn((prevIsFadeIn) => !prevIsFadeIn);
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

        {/* <FirstImg></FirstImg>

        <Title>
          오늘도 <br /> 헤메는 <br /> 당신을 위해
        </Title>

        <Content>
          저장한 북마크 기록을 보면서 왜 자신이 저장했는지 이유를 <br />찾았던 적이 있으신가요?
          잊고 있던 북마크들을 정리하면서 <br />필요한 북마크들을 손쉽게 찾아보세요
        </Content> */}

      </UnderNavInner>
      <Divider className="Divider"></Divider>
      <ActiveInner2 className="Inner" >
        <SecondImg></SecondImg>

        <SecondTitle>
          정리된 북마크를 <br /> 태그를 통해 <br /> 사용해 보세요
        </SecondTitle>

        <SecondContent>
          자신이 저장해 놓은 북마크들을 starmark에 업로드 해보세요 <br />
          업로드 하면 사용자가 올리신 북마크들의 주제에 따라 각각 태그들을 추출합니다.
          추출된 태그를 사용해서 북마크를 검색해 필요한 북마크를 빠르게 찾아보세요
        </SecondContent>

      </ActiveInner2>
      <Divider className="Divider"></Divider>
      <ActiveInner3 className="Inner" >
        <ThirdImg></ThirdImg>

        <ThirdTitle>
          사람들과 <br /> 서로의 북마크를 <br /> 공유해보세요
        </ThirdTitle>

        <ThirdContent>
          자신이 저장한 북마크들과 태그들을 다른 사용자와 공유해 보세요
          좋은 태그를 가지고 있는 사용자를 팔로우하고 팔로우한 사용자의 좋은 정보들을 사용해 보세요
          다른 사람들과 공유하면서 좋은 정보를 찾아가세요
        </ThirdContent>

      </ActiveInner3>
      <Divider className="Divider"></Divider>
      
      <ActiveInner4 className="Inner">
        
          <Square>
          <LoginPageWithScrollToTop scrollToTop={scrollToTop} />
          </Square>
       
        
      </ActiveInner4>
      
    </Outer>

  );
}








// import { Outer, ActiveInner2, ActiveInner3, ActiveInner4, UnderNavInner, Divider } from "../../../styles/PageScroll_Emotion";
// import LoginPage from "../Login/Login_Protect";
// import { useEffect, useRef } from "react";
// import NavBar from '../NavBar/NavBar';


// const DIVIDER_HEIGHT = 3;

// const LoginPageWithScrollToTop = ({ scrollToTop }) => (
//   <LoginPage scrollToTop={scrollToTop} />
// );

// export default function PageScroll() {
//   const outerDivRef = useRef();

//   useEffect(() => {
//     const wheelHandler = (e) => {
//       e.preventDefault();
//       const { deltaY } = e;
//       const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
//       const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

//       //스크롤 내림
//       if (deltaY > 0) {
//         // console.log(scrollTop);
//         // console.log(pageHeight); // 722
//         //1 page
//         if (scrollTop >= 0 && scrollTop < pageHeight) {
//           // console.log("1page,down");
//           outerDivRef.current.scrollTo({
//             top: pageHeight + DIVIDER_HEIGHT, //721.99999
//             left: 0,
//             behavior: "smooth"
//           });
//         }
//         else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
//           // 2page
//           // console.log("2 page down");
//           outerDivRef.current.scrollTo({
//             top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
//             left: 0,
//             behavior: "smooth"
//           });
//         }
//         else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
//           // 3page
//           // console.log("3 page down");
//           outerDivRef.current.scrollTo({
//             top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
//             left: 0,
//             behavior: "smooth"
//           });
//         }
//       }
//       //스크롤 올림
//       else {
//         if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
//           // console.log("2페이지, up");
//           outerDivRef.current.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: "smooth",
//           });
//         }
//         else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
//           // console.log("3페이지, up");
//           outerDivRef.current.scrollTo({
//             top: pageHeight + DIVIDER_HEIGHT,
//             left: 0,
//             behavior: "smooth",
//           });
//         }
//         else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
//           // console.log("4페이지, up");
//           outerDivRef.current.scrollTo({
//             top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
//             left: 0,
//             behavior: "smooth",
//           });
//         }
//       }
//     };

//     const outerDivRefCurrent = outerDivRef.current;
//     outerDivRefCurrent.addEventListener("wheel", wheelHandler);

//     return () => {
//       outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
//     };
//   }, []);

//   const scrollToTop = () => {
//     outerDivRef.current.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <Outer ref={outerDivRef} className="outer">
//       <NavBar />
//       <UnderNavInner className="Inner"></UnderNavInner>
//       <Divider className="Divider"></Divider>
//       <ActiveInner2 className="Inner" ></ActiveInner2>
//       <Divider className="Divider"></Divider>
//       <ActiveInner3 className="Inner" ></ActiveInner3>
//       <Divider className="Divider"></Divider>
//       <ActiveInner4 className="Inner" bgColor={"#b6d8f2"}>

//         <LoginPageWithScrollToTop scrollToTop={scrollToTop} />
//       </ActiveInner4>
//     </Outer>
//   );
// }