import { Space, Table, Tag } from 'antd';

// 리스트 뷰에 보일 컬럼 정의
const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))}
            </>
        ),
    },
    {
        title: 'Desc',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: 'Opts',
        key: 'opts',
        render: () => (
            <Space size="middle">
                <a>아이콘 넣을거임</a>
            </Space>
        ),
    },
];

// 리스트 뷰에 들어갈 데이터 정의
const data = [
    {
        key: '1',
        title: '초보자를 위한 장고',
        tags: ['Django', 'Backend', 'Developer'],
        desc: '장고를 배우기 위해 어쩌구 저쩌구',
    },
    {
        key: '2',
        title: '리액트 씹어먹기',
        tags: ['React', 'Frontend', 'Developer'],
        desc: '겁내 어렵다~',
    },
    {
        key: '3',
        title: 'NLP 박살내기',
        tags: ['NLP', 'AI', 'Data'],
        desc: '멋지게 가보자고~~~',
    },
];


export default function ListView() {

    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    );
}
