import { useEffect, useState } from 'react';
import { Space, Table, Tag, Pagination } from 'antd';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';

// 리스트 뷰에 보일 컬럼 정의
const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '10%',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.slice(0, 5).map((tag) => (
                    <Tag key={tag} style={{ borderRadius: 20, height: 24 }}>
                        {tag}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Desc',
        dataIndex: 'desc',
        key: 'desc',
        render: (desc) => (
            <div style={{ maxHeight: '3em', overflow: 'auto' }}>
                {desc.split('\n').slice(0, 2).map((line, index) => (
                    <span key={index}>{line}<br /></span>
                ))}
            </div>
        ),
    },
    {
        title: 'Opts',
        key: 'opts',
        render: (_, { url }) => (
            <Space size="middle">
                <a href={url}>
                    <BoxArrowUpRight />
                </a>
            </Space>
        ),
    },
];


export default function ListView({ searchResult }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const pageSize = 5;

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
        await getFetchData('/bookmark/', config);
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
        <div>
            <Table
                columns={columns}
                dataSource={currentPageData}
                pagination={false}
                loading={loading}
                rowKey={(_, index) => index}
            />
            <Pagination
                style={{ marginTop: 20, textAlign: 'right' }}
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}





/////////////////////////////////////////////////////////////// 스크롤 안 씀
// import { useEffect, useState } from 'react';
// import { Space, Table, Tag, Pagination } from 'antd';
// import { BoxArrowUpRight } from 'react-bootstrap-icons';
// import useGET from '../../AuthCommunicate/GET';

// // 리스트 뷰에 보일 컬럼 정의
// const columns = [
//     {
//         title: 'Title',
//         dataIndex: 'title',
//         key: 'title',
//         width: '10%',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.slice(0, 5).map((tag) => (
//                     <Tag key={tag} style={{ borderRadius: 20, height: 24 }}>
//                         {tag}
//                     </Tag>
//                 ))}
//             </>
//         ),
//     },
//     {
//         title: 'Desc',
//         dataIndex: 'desc',
//         key: 'desc',
//         render: (desc) => (
//             <div style={{ maxHeight: '3em', overflow: 'hidden' }}>
//                 {desc.split('.').slice(0, 2).map((line, index) => (
//                     <span key={index}>{line}<br /></span>
//                 ))}
//             </div>
//         ),
//     },
//     {
//         title: 'Opts',
//         key: 'opts',
//         render: (_, { url }) => (
//             <Space size="middle">
//                 <a href={url}>
//                     <BoxArrowUpRight />
//                 </a>
//             </Space>
//         ),
//     },
// ];


// export default function ListView({ searchResult }) {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const { fetchData: getFetchData, data: getData, error: getError } = useGET();
//     const pageSize = 5;

//     const fetchData = async (searchResult) => {
//         console.log(searchResult);
//         setLoading(true);
//         const config = {};

//         if (searchResult && searchResult.length > 0) {
//             config.params = {};
//             searchResult.forEach((item, index) => {
//                 config.params['data'] = item;
//             });
//         }

//         console.log(config);
//         await getFetchData('/bookmark/', config);
//         setLoading(false);
//     };

//     useEffect(() => {
//         if (getData) {
//             setData(getData);
//         } else if (getError) {
//             console.error(getError);
//         }
//     }, [getData, getError]);

//     useEffect(() => {
//         fetchData(searchResult);
//     }, [currentPage, searchResult]);

//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const currentPageData = data.slice(startIndex, endIndex);

//     return (
//         <div>
//             <Table
//                 columns={columns}
//                 dataSource={currentPageData}
//                 pagination={false}
//                 loading={loading}
//                 rowKey={(_, index) => index}
//             />
//             <Pagination
//                 style={{ marginTop: 20, textAlign: 'right' }}
//                 current={currentPage}
//                 pageSize={pageSize}
//                 total={data.length}
//                 onChange={(page) => setCurrentPage(page)}
//             />
//         </div>
//     );
// }

