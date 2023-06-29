// 여기에서 selectedItem 따라 다르게 변환되도록 하고 세부 내용은 다른 컴포넌트를 파서 태그로 불러옴
import MyInfo from './MpMain'

export default function MyPages({ selectedItem }) {


    return (
        <>
            {selectedItem === 'sub1' && (<MyInfo />)}
        </>)
}
