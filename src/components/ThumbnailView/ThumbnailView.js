import { useEffect, useState } from 'react';
import { Card, Col, Tag, Pagination, List, Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
import useGET from '../../AuthCommunicate/GET';

// 반복되는 카드 컴포넌트 새로 정의
const CustomCard = ({ title, desc, img, url, tags }) => {
    const truncatedDesc = desc.length > 20 ? desc.slice(0, 50) + '...' : desc; // 최대 ㅜ글자까지 보여줌
    return (
        <Col span={6}>
            <Card
                hoverable
                style={{ width: 280, height: 420, marginLeft: 10 }}
                cover={
                    <img
                        style={{ margin: 10, marginBottom: 0, width: 260, height: 200, borderRadius: 10 }}
                        alt="example"
                        src={img}
                    />
                }
            >
                {/* ant-card-body  이게 뭐길래 날 괴롭게 해 padding 없애고 싶은데 어떻게 하냐고 ㅠㅠ*/}
                <div style={{ marginTop: 0, marginBottom: 10, padding: 0 }}>
                    {tags.slice(0, 5).map((tag, index) => (
                        <Tag key={index} style={{ borderRadius: 20 }}>
                            {tag}
                        </Tag>
                    ))}
                </div>

                <Meta title={title} description={<Text ellipsis>{truncatedDesc}</Text>} />
                {/* Text 컴포넌트로 감싸고 ellipsis 속성 추가 */}
                <a href={url} style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', bottom: 20, right: 30 }}>
                    GO
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, marginBottom: '20px' }}>
                <List

                    loading={loading}
                    grid={{ column: 3 }}
                    style={{ height: 500, overflowY: 'scroll' }}
                    dataSource={currentPageData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <CustomCard
                                key={index}
                                title={item.title}
                                desc={item.desc}
                                img={item.img}
                                tags={item.tags}
                                url={item.url}
                            />
                        </List.Item>
                    )}
                />
            </div>

            <div style={{ alignSelf: 'flex-end', marginRight: 0, marginTop: 0 }}>
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
