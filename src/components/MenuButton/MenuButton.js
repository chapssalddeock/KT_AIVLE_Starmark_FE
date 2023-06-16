// const React = require('react');
// const { useState } = require('react');
// const useRouter = require('next/router').useRouter;
// const Container = require('react-bootstrap/Container');
// const Nav = require('react-bootstrap/Nav');
// const Navbar = require('react-bootstrap/Navbar');
// const { FiBell, FiMenu } = require('react-icons/fi');

// export default function MenuBar() {
//     const router = useRouter();
//     const [isMenuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(!isMenuOpen);
//     };

//     const moveToAboutPage = () => {
//         router.push('/about');
//     };

//     return React.createElement(
//         'div',
//         { style: { border: 'solid 1px black' } },
//         React.createElement(
//             Navbar,
//             null,
//             React.createElement(
//                 Container,
//                 null,
//                 React.createElement('img', {
//                     src: require('C:\\Users\\User\\Desktop\\StarMark_front\\bigproject\\public\\img\\menu.png'),
//                     width: 60,
//                     height: 60,
//                     onClick: toggleMenu,
//                 }),
//                 React.createElement(
//                     Navbar.Brand,
//                     { onClick: moveToAboutPage },
//                     '네비게이션 바 영역'
//                 ),
//                 React.createElement(
//                     Nav,
//                     null,
//                     React.createElement(
//                         Nav.Link,
//                         null,
//                         React.createElement(FiBell, null),
//                         ' ',
//                         React.createElement(FiMenu, { onClick: toggleMenu })
//                     )
//                 )
//             )
//         ),
//         isMenuOpen &&
//         React.createElement(
//             'div',
//             { style: { background: '#f5f5f5', padding: '10px' } },
//             React.createElement('p', null, 'Menu')
//         ),
//         !isMenuOpen &&
//         React.createElement(
//             'div',
//             { style: { background: '#f5f5f5', padding: '10px' } },
//             React.createElement('img', {
//                 src: require('C:\\Users\\User\\Desktop\\StarMark_front\\bigproject\\public\\img\\about.png'),
//                 width: 60,
//                 height: 60,
//                 onClick: moveToAboutPage,
//             })
//         )
//     );
// }

import { Grid3x3GapFill, List } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import { Button, Select, Space, Segmented } from 'antd';
import { useState } from 'react';
import SubmitForm from '../SubmitForm/SubmitForm';


const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const options = [
    { value: 1, label: '반대로..', },
    //{value: 2,label: '반대로..',},
]


export default function MenuBar() {
    ///////////////////////////////////// 폼 관련'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };



    return (

        <Container style={{ display: 'flex', }}>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 0 }}>
                <Button classNames='add' size="large" onClick={handleOpenDrawer} style={{ width: 100, height: 35, borderRadius: 20 }}>ADD</Button>
                <SubmitForm isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
            </Space>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-end', }}>
                <Select defaultValue="최신순" style={{ width: 120, height: 35, }} onChange={handleChange} options={options}></Select>
                {/* <Button type='text' style={{ width: 35, height: 35 }} icon={<List size="30" />}></Button>
                <Button type='text' style={{ width: 35, height: 35 }} icon={<Grid3x3GapFill size="24" />}></Button> */}
                {/* <MySegmented icons={icons} onChange={handleOptionChange} /> */}
                <Segmented style={{ height: 35, }}
                    options={[{
                        value: 'List',
                        icon: <List size='24' />,
                    },
                    {
                        value: 'Kanban',
                        icon: <Grid3x3GapFill size='20' />,
                    },]} />
                {/* 여기에 컨텐츠들 레이아웃을 박아버리...기엔 이미 결정된 레이아웃이 파괴될듯... 그전엔 컨텐츠랑 Menu를 동급취급했는데
                이젠 자식으로 하던가 해야함.......근데 또 여기 박으면 side바에 따라 변경이 어려움 */}
            </Space >
        </Container >

    )
}