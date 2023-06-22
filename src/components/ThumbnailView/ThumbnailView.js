import { useEffect, useState } from 'react';
import { Card, Col, Tag, Pagination, List, Spin } from 'antd';
const { Meta } = Card;
import axios from 'axios';

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
    const pageSize = 6;

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
                },
            }
            const response = await axios.get('http://kt-aivle.iptime.org:40170/api/bookmark/', config);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]); // currentPage가 변경될 때마다 데이터 가져오기

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
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
