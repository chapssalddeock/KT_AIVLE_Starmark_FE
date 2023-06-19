import { Card, Col, Row, Tag } from 'antd';
const { Meta } = Card;


// 반복되는 카드 컴포넌트 새로 정의
const CustomCard = ({ title, description, url, tags, link }) => (
    <Col span={8}>
        <Card
            hoverable
            style={{ width: 280, height: 420, margin: 10 }}
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

    // 더미 데이터 정의, 이 부분 백엔에서 받아오면 됨
    const data = [
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


    return (
        <>
            <Row gutter={16} style={{ marginTop: 20, marginLeft: 20, height: "calc(100vh - 200px)", overflowY: 'scroll' }}>
                {data.map((item, index) => (
                    <CustomCard key={index} title={item.title}
                        description={item.description} url={item.url}
                        tags={item.tags} link={item.link} />
                ))}
            </Row>

        </>
    )

}

