import { useEffect, useState } from 'react';
import { Space, Table, Tag, Pagination, Spin } from 'antd';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';

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
                {tags.map((tag) => (
                    <Tag key={tag} style={{ borderRadius: 20, height: 25 }}>
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
    const { fetchData : getFetchData, data: getData, error: getError } = useGET();

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

    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
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

            {/* {loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin />
                </div>
            )} */}

            <Pagination
                style={{ marginTop: 20, textAlign: 'right' }}
                current={currentPage}
                pageSize={6}
                total={data.length}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}






// import { useEffect, useState } from 'react';
// import { Space, Table, Tag, Pagination, Spin } from 'antd';
// import { BoxArrowUpRight } from 'react-bootstrap-icons';
// import axios from 'axios';

// // 리스트 뷰에 보일 컬럼 정의
// const columns = [
//     {
//         title: 'Title',
//         dataIndex: 'title',
//         key: 'title',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => (
//                     <Tag key={tag} style={{ borderRadius: 20, height: 25 }}>
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

//     const fetchData = async (searchResult) => {
//         console.log(searchResult);
//         setLoading(true);
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk',
//                 },
//             };

//             if (searchResult && searchResult.length > 0) {
//                 config.params = {};
//                 searchResult.forEach((item, index) => {
//                     config.params['data'] = item;
//                 });
//             }


//             console.log(config);

//             const response = await axios.get('http://kt-aivle.iptime.org:40170/api/bookmark/', config);
//             if (response.status === 200) {
//                 setData(response.data);
//                 console.log(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchData(searchResult);
//     }, [currentPage, searchResult]);

//     const startIndex = (currentPage - 1) * 6;
//     const endIndex = startIndex + 6;
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

//             {/* {loading && (
//                 <div style={{ textAlign: 'center', marginTop: 20 }}>
//                     <Spin />
//                 </div>
//             )} */}

//             <Pagination
//                 style={{ marginTop: 20, textAlign: 'right' }}
//                 current={currentPage}
//                 pageSize={6}
//                 total={data.length}
//                 onChange={(page) => setCurrentPage(page)}
//             />
//         </div>
//     );
// }




// import { useEffect, useState } from 'react';
// import { Space, Table, Tag, Pagination, Spin } from 'antd';
// import { BoxArrowUpRight } from 'react-bootstrap-icons';
// import axios from 'axios';

// // 리스트 뷰에 보일 컬럼 정의
// const columns = [
//     {
//         title: 'Title',
//         dataIndex: 'title',
//         key: 'title',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))}
//             </>
//         ),
//     },
//     {
//         title: 'Desc',
//         dataIndex: 'desc',
//         key: 'desc',
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

// export default function ListView({ searchResult }) { //1. props 추가
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);

//     console.log("***************", searchResult)

//     const fetchData = async (searchResult) => {
//         setLoading(true);
//         try {
//             const config = {
//                 headers: {
//                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTQyMzU4LCJpYXQiOjE2ODcyNDYzNTgsImp0aSI6ImI2YTU0OWJkOWQxYTQzMWFhNDE3NmFmMmFmMjVjYjQ2IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjgwMyJ9.cTZokEPKCxNTo6S-BXdv2pRakGRlnIBqzWAGHQKI6Nk'
//                 },
//             }

//             if (searchResult && searchResult.length > 0) { // 2. props에 따른 로직 추가
//                 config.params = {
//                     tags: searchResult,
//                 };
//             }

//             const response = await axios.get('http://kt-aivle.iptime.org:40170/api/bookmark/', config);
//             if (response.status === 200) {
//                 console.log(response.data);
//                 setData(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchData();
//     }, [currentPage]);

//     const startIndex = (currentPage - 1) * 6;
//     const endIndex = startIndex + 6;
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

//             {loading && (
//                 <div style={{ textAlign: 'center', marginTop: 20 }}>
//                     <Spin />
//                 </div>
//             )}

//             <Pagination
//                 style={{ marginTop: 20, textAlign: 'right' }}
//                 current={currentPage}
//                 pageSize={6}
//                 total={data.length}
//                 onChange={(page) => setCurrentPage(page)}
//             />
//         </div>
//     );
// }
