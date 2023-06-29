// 필요한 기능
// 1. 현재 자기가 가진 프사, 닉네임, 이메일, 팔로워수, 북마크수 등 표시
// 2. 이미지랑 닉네임은 수정이 가능하도록 서버와 통신
import { MainFrame, ImgFrame, TitleFrame, ContentFrame } from '../../../styles/MyPage_Emotion';
import useGET from '../../AuthCommunicate/GET';

export default function MyInfo() {
    
    const [data, setData] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();


    const fetchData = async () => {
        const config = {};
        await getFetchData('/profile_img/', config);
    };

    useEffect(() => {
        if (getData) {
            setData(getData);
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);

    useEffect(() => {
        fetchData(searchResult);
    }, [currentPage, searchResult]);


    return (

        <>
            <MainFrame>
                <TitleFrame></TitleFrame>
                <ImgFrame></ImgFrame>
                <ContentFrame></ContentFrame>
            </MainFrame>

        </>

    );
}