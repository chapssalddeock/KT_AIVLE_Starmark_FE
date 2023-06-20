import { Avatar, List, message, Tag, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import UserDrawer from '../Modal/UserDrawer';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 750;


export default function MpFollowView() {
    const [data, setData] = useState([]);

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };


    useEffect(() => {
        appendData();
    }, []);


    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };


    // 유저 프로필 보기 관련
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };



    return (
        <>
            <List bordered size='large' style={{ marginLeft: 40, marginRight: 30, width: 1050 }}>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={80}
                    itemKey="email"
                    onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item key={item.email} actions={[
                            <a onClick={handleOpenDrawer} key={`a-${item.email}`}>
                                View Profile
                            </a>,

                        ]}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} size={80} />}
                                    title={<div style={{ fontSize: '20px', marginTop: 2 }}>{item.name.last}</div>}
                                    description={<div style={{ fontSize: '16px' }}>{item.email}</div>}
                                />

                                <div style={{ marginLeft: 400 }}>
                                    <div>주요 태그</div>
                                    {/* (item.tags.map((tag) => (<Tag key={tag} style={{ borderRadius: 20, height: 25 }}>{tag}</Tag>))) */}
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <div>북마크 수</div>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <div>구독자 수</div>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    팔로우 취소(버튼)
                                </div>
                            </div>
                        </List.Item>
                    )}
                </VirtualList>
            </List >
            <UserDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
            {/* 여기에 Drawer 넣기....이유: 클릭시 key가 누구인지 모를듯하여... 아닌가... 보내줄수있나? */}
        </>
    );
};
