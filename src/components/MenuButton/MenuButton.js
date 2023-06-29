import { Grid3x3GapFill, List } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import { Button, Select, Space, Segmented } from 'antd';
import { useState } from 'react';
import SubmitForm from '../Modal/SubmitForm';

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const options = [
    { value: 1, label: '반대로..', },
    //{value: 2,label: '반대로..',},
]


export default function MenuBar({ onSegmentedChange }) {
    ///////////////////////////////////// 폼 관련'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleSegmentedChange = (value) => {
        onSegmentedChange(value); // 변경된 값을 상위 컴포넌트로 전달
    };



    return (

        <Container style={{ display: 'flex', }}>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 0 }}>
                <Button classNames='add' size="large" onClick={handleOpenDrawer}
                    style={{ width: 100, height: 35, borderRadius: 20, color: '#5eacf2', border: 'solid #5eacf2 0.5px', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ADD</span>
                </Button>
                <SubmitForm isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
            </Space>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-end', }}>
                <Select defaultValue="최신순" style={{ width: 120, height: 35, }} onChange={handleChange} options={options}></Select>
                <Segmented onChange={handleSegmentedChange} style={{ height: 35, }}
                    options={[{
                        value: 'List',
                        icon: <List size='25' />,
                    },
                    {
                        value: 'Thumbnail',
                        icon: <Grid3x3GapFill size='20' />,
                    },]}
                />
            </Space >
        </Container >

    )
}