import { Grid3x3GapFill, List } from 'react-bootstrap-icons';
import { Button,  Space, Segmented } from 'antd';
import { useState } from 'react';
import SubmitForm from '../Modal/SubmitForm';




export default function MenuBar({ onSegmentedChange }) {
    //폼 관련
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

        <div style={{ margin: 0, height: '100%', width: '100%' }}>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-start', width:  '50%'}}>
                <Button classNames='add' size="large" onClick={handleOpenDrawer}
                    style={{ width: '10vh', height: '3vh', borderRadius: 20, fontSize: '1.8vh', color: '#3170c7', border: 'solid #3170c7 0.5px', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ADD</span>
                </Button>
                <SubmitForm isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
            </Space>
            <Space wrap style={{ flex: 1, justifyContent: 'flex-end', width: '50%'}}>
                <Segmented onChange={handleSegmentedChange} style={{ height: 35, }}
                    options={[{ value: 'List', icon: <List size='2vh' style={{ color: '#3170c7'}} />, },
                    { value: 'Thumbnail', icon: <Grid3x3GapFill size='2vh' style={{ color: '#3485f3'}} />, },]} />
            </Space >
        </div >

    )
}



  

  










{/* <Container style={{ margin: 0, height: '100%', width: '100%', }}>
    <Space wrap style={{ flex: 1, justifyContent: 'flex-start', width: '25%', marginRight: '25%' }}>
        <Button classNames='add' size="large" onClick={handleOpenDrawer}
            style={{ width: 100, height: 35, borderRadius: 20, color: '#3170c7', border: 'solid #3170c7 0.5px', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ADD</span>
        </Button>
        <SubmitForm isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </Space>
    <Space wrap style={{ float: 'right', flex: 1, justifyContent: 'flex-end', width: '25%', marginLeft: '25%' }}>
        <Select defaultValue="latest" style={{ width: 120, height: 35, }} onChange={handleChange} options={options}></Select>
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
</Container > */}