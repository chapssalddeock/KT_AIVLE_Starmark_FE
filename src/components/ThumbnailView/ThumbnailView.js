import { useEffect, useState } from 'react';
import { Card, Col, Tag, Pagination, List, Spin } from 'antd';
const { Meta } = Card;
import axios from 'axios';

// 반복되는 카드 컴포넌트 새로 정의
const CustomCard = ({ title, desc, img, url, tags }) => (
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
            <div style={{ marginBottom: 20 }}>
                {tags.map((tag, index) => (
                    <Tag key={index} style={{ borderRadius: 20 }}>
                        {tag}
                    </Tag>
                ))}
            </div>

            <Meta title={title} description={desc} />
            <a href={url} style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', bottom: 20, right: 30 }}>
                GO
            </a>
        </Card>
    </Col>
);

export default function ThumbnailView({ searchResult }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const fetchData = async (searchResult) => {
        console.log(searchResult);
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
                },
            };

            if (searchResult && searchResult.length > 0) {
                config.params = {};
                searchResult.forEach((item, index) => {
                    config.params['data'] = item;
                });
            }


            console.log(config);

            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/bookmark/', config);
            if (response.status === 200) {
                setData(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

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
                    style={{ height: 384, overflowY: 'scroll' }}
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

                {/* {loading && (
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Spin />
                    </div>
                )} */}
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
