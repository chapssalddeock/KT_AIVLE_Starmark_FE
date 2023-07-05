import { useEffect, useState } from 'react';
import { Card, Col, Tag, Pagination, List, Typography } from 'antd';
const { Meta } = Card;
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';

// 반복되는 카드 컴포넌트 새로 정의
const CustomCard = ({ title, desc, img, url, tags }) => {
    const truncatedDesc = desc.length > 20 ? desc.slice(0, 50) + '...' : desc; // 최대 글자수 제한
    return (
        <Col span={6}>
            <Card
                hoverable
                style={{ width: '20vw', height: '50vh', marginLeft: 50, marginBottom: 50, border: '2px solid #f0f0f0' }}
                cover={
                    <img
                        style={{ margin: '1vh 1vw 1vh 1vw', marginBottom: 0, width: '18vw', height: '25vh', borderRadius: 10 }}
                        alt="example"
                        src={img}
                    />
                }
            >
                <div style={{ marginTop: 0, marginBottom: 10, padding: 0 }}>
                    {tags.slice(0, 5).map((tag, index) => (
                        <Tag key={index} style={{ fontFamily: 'KOTRA_GOTHIC', borderRadius: 20, height: '2.5vh', marginBottom: 4, fontSize: '1.5vh', color: '#5eacf2', border: ' solid #5eacf2 0.5px', }} color="white">
                            {tag}
                        </Tag>
                    ))}
                </div>

                <Meta title={<div style={{ fontSize: '1.8vh', fontFamily: 'KOTRA_GOTHIC' }}>{title}</div>}
                    description={<div style={{ fontSize: '1.5vh', fontFamily: 'KOTRA_GOTHIC' }}>{truncatedDesc}</div>} />
                {/* Text 컴포넌트로 감싸고 ellipsis 속성 추가 */}
                <a href={url} style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', bottom: 20, right: 30 }}>
                    <BoxArrowUpRight />
                </a>
            </Card>
        </Col>
    );
};

export default function ThumbnailView({ searchResult }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const pageSize = 6;

    const fetchData = async (searchResult) => {
        console.log(searchResult);
        setLoading(true);
        const config = {};

        if (searchResult && searchResult.length > 0) {
            config.params = {};
            searchResult.forEach((item, index) => {
                config.params['data'] = item;
            });
        }

        console.log(config);
        await getFetchData('/bookmark', config);
        setLoading(false);
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

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, marginBottom: '20px', height: '90%' }}>
                <List

                    loading={loading}
                    grid={{ column: 3 }}
                    style={{ height: '100%', overflowY: 'scroll' }}
                    dataSource={currentPageData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <CustomCard
                                key={index}
                                title={item.title}
                                desc={item.desc}
                                img={"http://kt-aivle.iptime.org:40170" + item.img}
                                tags={item.tags}
                                url={item.url}
                            />
                        </List.Item>
                    )}
                />
            </div>

            <div style={{ alignSelf: 'flex-start', marginRight: 0, marginTop: 0 }}>
                <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
