import { useEffect, useState } from 'react';
import { Card, Col, Tag, Pagination, List, Spin } from 'antd';
const { Meta } = Card;
import PerfectScrollbar from 'react-perfect-scrollbar';


// 반복되는 카드 컴포넌트 새로 정의
const CustomCard = ({ title, description, url, tags, link }) => (
    <Col span={6}>
        <Card
            hoverable
            style={{ width: 280, height: 420, marginLeft: 10 }}
            cover={
                <img
                    style={{ margin: 10, marginBottom: 0, width: 260, height: 200, borderRadius: 10 }}
                    alt="example"
                    src={url}
                />
            }
        >
            <div style={{ marginBottom: 20 }}>
                {tags.map((tag, index) => (
                    <Tag key={index} style={{ borderRadius: 20 }}>
                        {tag}
                    </Tag>
                ))}
            </div>

            <Meta title={title} description={description} />
            <a href={link} style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', bottom: 20, right: 30 }}>
                GO
            </a>

        </Card>
    </Col>
);



export default function ThumbnailView() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    const fetchData = async () => {
        setLoading(true); // 데이터를 가져오기 전에 로딩 상태를 true로 설정
        try {
            //   const response = await fetch('https://api.example.com/data');
            //   const result = await response.json();
            setData(dummydata);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false); // 데이터를 가져온 후에 로딩 상태를 false로 설정
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]); // currentPage와 pageSize가 변경될 때마다 데이터 가져오기

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, marginBottom: '20px' }}>
                <List
                    grid={{ column: 3 }}
                    style={{ height: 384, overflowY: 'scroll' }}
                    dataSource={currentPageData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <CustomCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                url={item.url}
                                tags={item.tags}
                                link={item.link}
                            />
                        </List.Item>
                    )}
                />

                {loading && (
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Spin />
                    </div>
                )}
            </div>

            <div style={{ alignSelf: 'flex-end', marginRight: 0, marginTop: 0 }}>
                <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    }}
                />
            </div>
        </div>

    );
}

// 더미 데이터 정의, 이 부분 백엔에서 받아오면 됨
const dummydata = [
    {
        title: '1페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '2페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '3페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '4페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '5페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '6페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '7페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '8페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '9페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: '10페이지', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },
    {
        title: 'Django', description: '장고에 대한 설명 어쩌구 저쩌구....',
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        , link: 'https://example.com/django',
        tags: ['Framework', 'Python'],
    },

];
// <Row gutter={16} style={{ marginTop: 20, marginLeft: 20, height: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
//                 {loading && <Spin style={{ marginTop: 20, marginLeft: 20 }} />}
//                 {currentPageData.map((item, index) => (
//                     <CustomCard key={index} title={item.title} description={item.description} url={item.url} tags={item.tags} link={item.link} />
//                 ))}
//                 <Pagination
//                     style={{ marginTop: 20, marginLeft: 20 }}
//                     current={currentPage}
//                     pageSize={pageSize}
//                     total={data.length}
//                     onChange={(page, pageSize) => {
//                         setCurrentPage(page);
//                         setPageSize(pageSize);
//                     }}
//                 />
//             </Row>





// export default function ThumbnailView() {
//     const [data, setData] = useState([]); // 데이터 배열
//     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
//     const [pageSize, setPageSize] = useState(6); // 페이지당 데이터 개수

//     // 데이터 가져오는 비동기 함수
//     const fetchData = async () => {
//         try {
//             setData(dummydata);
//             // const response = await fetch('https://api.example.com/data'); // 데이터를 가져오는 API 엔드포인트
//             // const result = await response.json();
//             // setData(result);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []); // 컴포넌트가 마운트되었을 때 데이터 가져오기

//     // 현재 페이지에 해당하는 데이터 추출
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const currentPageData = data.slice(startIndex, endIndex);

//     return (
//         <>
//             <Row gutter={16} style={{ marginTop: 20, marginLeft: 20, height: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
//                 {currentPageData.map((item, index) => (
//                     <CustomCard key={index} title={item.title} description={item.description} url={item.url} tags={item.tags} link={item.link} />
//                 ))}
//                 <Pagination
//                     style={{ marginTop: 20, marginLeft: 20 }}
//                     current={currentPage}
//                     pageSize={pageSize}
//                     total={data.length}
//                     onChange={(page, pageSize) => {
//                         setCurrentPage(page);
//                         setPageSize(pageSize);
//                     }}
//                 />
//             </Row>


//             {/* <Row gutter={16}
//                 style={{ marginTop: 20, marginLeft: 20, height: "calc(100vh - 200px)", overflowY: 'scroll' }}>
//                 {data.map((item, index) => (
//                     <CustomCard key={index} title={item.title}
//                         description={item.description} url={item.url}
//                         tags={item.tags} link={item.link} />
//                 ))}
//             </Row> */}

//         </>
//     )

// }

