import { useEffect, useState } from 'react';
import { Space, Table, Tag, Pagination, Spin } from 'antd';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';

// 리스트 뷰에 보일 컬럼 정의
const columns = [
    {
        title: () => <span style={{ fontSize: '1.9vh', fontWeight: 'bold', fontFamily: 'KOTRA_GOTHIC' }}>Title</span>,
        dataIndex: 'title',
        key: 'title',
        width: '10%',
        render: (text, record) => {
            if (record.state !== "완료") {
                return <Spin size="small" />;
            }
            return <span style={{ fontSize: '1.8vh', fontFamily: 'KOTRA_GOTHIC' }}>{text}</span>;
        },
    },
    {
        title: () => <span style={{ fontSize: '1.9vh', fontWeight: 'bold', fontFamily: 'KOTRA_GOTHIC' }}>Tags</span>,
        key: 'tags',
        dataIndex: 'tags',
        width: '20%',
        render: (_, record) => {
            if (record.state !== "완료") {
                return <Spin size="small" />;
            }
            return (
                <>
                    {record.tags.slice(0, 5).map((tag, index) => (
                        <Tag
                            key={tag}
                            style={{
                                borderRadius: 20,
                                height: '2.2vh',
                                fontSize: '1.3vh',
                                color: index % 2 === 0 ? '#5eacf2' : '#3170c7',
                                border: `solid ${index % 2 === 0 ? '#5eacf2' : '#3170c7'} 0.5px`,
                            }}
                        >
                            {tag}
                        </Tag>
                    ))}
                </>
            );
        },
    },
    {
        title: () => <span style={{ fontSize: '1.9vh', fontWeight: 'bold', fontFamily: 'KOTRA_GOTHIC' }}>Desc</span>,
        dataIndex: 'desc',
        key: 'desc',
        width: '60%',
        render: (desc, record) => {
            if (record.state !== "완료") {
                return <Spin size="small" />;
            }
            return (
                <div style={{ height: 'auto', fontSize: '1.8vh', fontFamily: 'KOTRA_GOTHIC' }}>
                    {desc.split('\n').slice(0, 2).map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))}
                </div>
            );
        },
    },
    {
        title: () => <span style={{ fontSize: '1.9vh', fontWeight: 'bold' }}>Opts</span>,
        key: 'opts',
        width: '10%',
        render: (_, record) => {
            if (record.state !== "완료") {
                return <Spin size="small" />;
            }
            return (
                <Space size="middle">
                    <a href={record.url}>
                        <BoxArrowUpRight style={{ fontSize: '1.9vh' }} />
                    </a>
                </Space>
            );
        },
    },
];


export default function ListView({ searchResult }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const pageSize = 5;

    const fetchData = async (searchResult) => {
        setLoading(true);
        const config = {};

        if (searchResult && searchResult.length > 0) {
            config.params = {};
            searchResult.forEach((item, index) => {
                config.params['data'] = item;
            });
        }

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

    const applyScrollbarStyle = () => {
        const scrollbarStyle = `
        /* 스크롤바 전체 스타일 */
        ::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }
  
        /* 스크롤 막대 스타일 */
        ::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 4px;
        }
  
        /* 스크롤 막대 외부 스타일 */
        ::-webkit-scrollbar-track {
          background-color: none;
          border-radius: 4px;
        }
      `;

        const style = document.createElement('style');
        style.appendChild(document.createTextNode(scrollbarStyle));
        document.head.appendChild(style);
    };

    useEffect(() => {
        applyScrollbarStyle();
    }, []);

    const refreshData = async (searchResult) => {
        await fetchData(searchResult);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const hasUnfinishedJob = currentPageData.some((record) => record.state !== '완료');
            if (hasUnfinishedJob) { //여기서 !뺌
                refreshData(searchResult);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [currentPageData]);

    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: '90%', overflow: 'hidden' }}>
                <Table
                    columns={columns}
                    dataSource={currentPageData}
                    pagination={false}
                    loading={loading}
                    rowKey={(_, index) => index}
                    scroll={{
                        y: 'calc(100vh - 45vh)',
                    }}
                    style={{ height: '100%' }}
                />
            </div>
            <div style={{ alignSelf: 'flex-end', marginRight: 0, marginTop: 0 }}>
                <Pagination
                    style={{ marginTop: 20, textAlign: 'left', color: '#3170c7' }}
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
