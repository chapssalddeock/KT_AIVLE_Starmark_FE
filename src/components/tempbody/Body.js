import { Outer, Inner, InnerNav, Divider } from "../../../styles/body_emotion";
import NavBar from "../../components/navbar/NavBar"
import { useEffect, useRef } from "react";

const DIVIDER_HEIGHT = 3;

export default function TempBody() {
  const outerDivRef = useRef();
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      
      //스크롤 내림
      if(deltaY > 0) {
        console.log(scrollTop);
        console.log(pageHeight); // 722
        //1 page
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("1page,down");
          outerDivRef.current.scrollTo({
            top : pageHeight + DIVIDER_HEIGHT, //721.99999
            left : 0,
            behavior : "smooth"
          });
        }
        else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 2page
          console.log("2 page down");
          outerDivRef.current.scrollTo({
            top : pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left : 0,
            behavior : "smooth"
          });
        }
        else if(scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 3page
          console.log("3 page down");
          outerDivRef.current.scrollTo({
            top : pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left : 0,
            behavior : "smooth"
          });
        }
      }
      //스크롤 올림
      else{
        if(scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        else if(scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3 ) {
          console.log("3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
        else if(scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4 ) {
          console.log("4페이지, up");
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


  return (
    <Outer ref={outerDivRef} className="outer">
      <NavBar />
      <InnerNav className="inner">1</InnerNav>
      <Divider className="divider"></Divider>
      <Inner className="inner" bgColor={"#b6d8f2"}>2</Inner>
      <Divider className="divider"></Divider>
      <Inner className="inner" bgColor={"#f4cfdf"}>3</Inner>
      <Divider className="divider"></Divider>
      <Inner className="inner" bgColor={"#b6d8f2"}>4</Inner>
    </Outer>
  );
}