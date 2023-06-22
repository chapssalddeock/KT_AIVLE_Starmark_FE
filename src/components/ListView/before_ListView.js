import { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Table, Tag } from 'antd';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import qs from 'qs'; //객체를 쿼리 문자열로 변환


// 리스트 뷰에 들어갈 데이터 정의
// const data = [
//     {
//         key: '1',
//         title: '초보자를 위한 장고',
//         tags: ['Django', 'Backend', 'Developer'],
//         desc: '장고를 배우기 위해 어쩌구 저쩌구',
//         link: 'https://example.com/django',
//     },]


// 리스트 뷰에 보일 컬럼 정의
const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))}
    //         </>
    //     ),
    // },
    {
        title: 'Desc',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: 'Opts',
        key: 'opts',
        render: (_, { link }) => (
            <Space size="middle">
                <a href={link}>
                    <BoxArrowUpRight />
                </a>
            </Space>
        ),
    },
];


const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize, //한 페이지에 보여줄 갯수
    page: params.pagination?.current, //현재 선택된 페이지
    ...params,

});


export default function ListView() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 6,
            showSizeChanger: false,
        },
    });

    
    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        //     console.log(pagination.pageSize);
        //     setData([]);
        // }
    };


    return (
        <Table columns={columns} rowKey={(record) => record.login.uuid} dataSource={data}
            pagination={tableParams.pagination} loading={loading} onChange={handleTableChange} />

    );
}
