import { Outer, ActiveInner2, ActiveInner3, ActiveInner4, UnderNavInner, Divider, 
  PageBackGround, Wave, PageDark, Title, Content } from "../../../styles/PageScroll_Emotion";
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
        {/* <h1 class="animate__animated animate__bounce">An animated element</h1>

        <div
          id="animatedDiv"
          className={`animate__animated animate__${isFadeIn ? 'fadeInUp' : 'fadeOutUp'}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <p>애니메이션 콘텐츠</p>
        </div> */}

        <PageBackGround>
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
      <ActiveInner2 className="Inner" ></ActiveInner2>
      <Divider className="Divider"></Divider>
      <ActiveInner3 className="Inner" ></ActiveInner3>
      <Divider className="Divider"></Divider>
      <ActiveInner4 className="Inner" bgColor={"#b6d8f2"}>
        <LoginPageWithScrollToTop scrollToTop={scrollToTop} />
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