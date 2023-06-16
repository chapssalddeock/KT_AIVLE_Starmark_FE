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

const data = [
    {
        value: 1,
        label: '여기',
    },
    {
        value: 2,
        label: '선택지',
    },
    {
        value: 3,
        label: '정렬하기인데 일단 냅둬',
    },
]





export default function MenuBar() {

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
                <Select defaultValue="셀렉트 박스" style={{ width: 120, height: 35, }} onChange={handleChange} options={data}></Select>
                <Button type='text' style={{ width: 35, height: 35 }} icon={<List size="30" />}></Button>
                <Button type='text' style={{ width: 35, height: 35 }} icon={<Grid3x3GapFill size="24" />}></Button>
                {/*  <Segmented
    options={[
      {
        value: 'List',
        icon: <List />,
      },
      {
        value: 'Kanban',
        icon: <Grid3x3GapFill />,
      },
    ]}
  /> */}
                {/* 위 코드로 바꿀지 고민중 */}
            </Space >
        </Container >

    )
}