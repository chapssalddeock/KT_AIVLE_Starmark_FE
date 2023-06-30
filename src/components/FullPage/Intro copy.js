import {
  Outer, ActiveInner2, ActiveInner3, ActiveInner4, UnderNavInner, Divider,
} from "../../../styles/PageScroll_Emotion";
import { useEffect, useRef, useState } from "react";
import 'animate.css';
import ScrollToTopButton from './ScrollToTopButton';


export default function PageScroll() {
  const outerDivRef = useRef();
  const [visible, setVisible] = useState(false); // visible 상태와 업데이트 함수


  useEffect(() => {
    // 스크롤 이벤트를 추가하여 버튼을 표시하거나 숨깁니다.
    const handleScroll = () => {
      const scrollTop = outerDivRef.current.scrollTop;
      setVisible(scrollTop > 300); // 스크롤 위치에 따라 버튼 표시 여부 결정
    };

    outerDivRef.current.addEventListener('scroll', handleScroll); // 스크롤 이벤트 핸들러 등록

    return () => {
      outerDivRef.current.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    };
  }, []);

  const scrollToTop = () => {
    outerDivRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <Outer ref={outerDivRef} className="outer">
      <UnderNavInner className="Inner">

      </UnderNavInner>
      <Divider className="Divider"></Divider>
      <ActiveInner2 className="Inner" >
      </ActiveInner2>
      <Divider className="Divider"></Divider>
      <ActiveInner3 className="Inner" >
      </ActiveInner3>
      <Divider className="Divider"></Divider>
      <ActiveInner4 className="Inner">     
      </ActiveInner4>
      <ScrollToTopButton visible={visible} scrollToTop={scrollToTop} />
      
    </Outer>

  );
}
