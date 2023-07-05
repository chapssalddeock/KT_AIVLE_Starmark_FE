import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Segmented, Spin, Button, Drawer, Form, Input, Row, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import usePOST from '../../AuthCommunicate/POST';

const handleChange = (value) => {
    console.log(`선택된 값: ${value}`);
};

const options = [
    { value: true, label: '공개' },
    { value: false, label: '비공개' },
];

export default function SubmitForm({ isOpen, onClose}) {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('URL');
    const [fileList, setFileList] = useState([]);
    const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm(); // Add form instance
    
    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };
    
    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        
        let formData = null;

        if (selectedOption === 'URL') {
            formData = {
                type: 'string',
                title: values.title,
                url: values.url,
                is_public: values.is_public,
            };
        } else if (selectedOption === 'HTML') {
            formData = new FormData();
            formData.append('type', 'file');
            formData.append('data', fileList[0]);

        }

        await postFetchData('/bookmark/', formData);
        form.resetFields();
    };

    useEffect(() => {
        if (postData) {
            console.log('전송 성공', postData);
            setIsSubmitting(false);
            router.reload();
        } else if (postError) {
            console.log('전송 실패', postError);
            setIsSubmitting(false);
        }
    }, [postData, postError]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const newFileList = Array.from(files);
        setFileList(newFileList);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <>
            <Drawer
                title={<div style={{ fontSize: '2vmin', fontWeight: 'bold', width: '10vw', fontFamily: 'KOTRA_GOTHIC' }}>북마크 입력</div>}
                width={500}
                onClose={handleCancel}
                open={isOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <div style={{ textAlign: 'right', width: '10vw' }}>
                        <Button onClick={handleCancel}
                            style={{
                                width: '25%', height: '100%', marginRight: '0.5vw', backgroundColor: 'white',
                                color: 'black', fontSize: '1.5vh', fontWeight: 'bold', borderRadius: '20px', padding: '0.5vh 0.5vw',
                                boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)', fontFamily: 'KOTRA_GOTHIC'
                            }}
                        >
                            취소
                        </Button>
                        <Button form="submitForm" key="submit" htmlType="submit" type="primary"
                            style={{
                                width: '25%', height: '100%', marginRight: '0.5vw', backgroundColor: 'white',
                                color: 'black', fontSize: '1.5vh', fontWeight: 'bold', borderRadius: '20px', padding: '0.5vh 0.5vw',
                                boxShadow: '2px 2px 2px rgba(11, 153, 255, 0.7)', fontFamily: 'KOTRA_GOTHIC'
                            }}
                        >
                            제출
                        </Button>
                    </div>
                }
            >
                <div style={{ marginBottom: 30 }}>
                    <Segmented options={[{ label: 'URL', value: 'URL' }, { label: 'HTML', value: 'HTML' }]} onChange={handleOptionChange} />
                </div>
                <Form layout="vertical" onFinish={handleSubmit} id="submitForm" form={form}>
                    {selectedOption === 'URL' && (
                        <>
                            <Row gutter={16}>
                                <Form.Item name="title" label={<span style={{ fontSize: '1.8vmin', fontFamily: 'KOTRA_GOTHIC' }}>북마크 이름</span>}
                                    rules={[{ required: true, message: '북마크 이름을 입력하세요.' }]}
                                    style={{ width: '80%', height: '5vh', marginBottom: '5vh' }}
                                >
                                    <Input placeholder="북마크 이름을 입력하세요."
                                        style={{ width: '100%', fontSize: '1.8vmin' }}
                                    />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item name="url" label={<span style={{ fontSize: '1.8vmin', fontFamily: 'KOTRA_GOTHIC' }}>URL</span>}
                                    rules={[{ required: true, message: 'URL을 입력하세요.' }]}
                                    style={{ width: '80%', height: '5vh', marginBottom: '5vh' }}
                                >
                                    <Input placeholder="URL을 입력하세요."
                                        style={{ width: '100%', fontSize: '1.8vmin' }}
                                    />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item name="is_public" label={<span style={{ fontSize: '1.8vmin', fontFamily: 'KOTRA_GOTHIC' }}>공개여부</span>}
                                    rules={[{ required: true, message: '공개 여부를 선택하세요.' }]}
                                    style={{ width: '80%', marginBottom: '5vh' }}
                                >
                                    <Select placeholder="선택" options={options} onChange={handleChange}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Row>
                        </>
                    )}

                    {selectedOption === 'HTML' && (
                        <>
                            <Row gutter={16}>
                                <Form.Item>
                                    <Button style={{ fontFamily: 'KOTRA_GOTHIC' }} icon={<UploadOutlined />} onClick={() => document.getElementById('fileInput').click()}>
                                        파일 업로드
                                    </Button>
                                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                </Form.Item>
                            </Row>
                            {fileList.length > 0 && (
                                <Row gutter={16} style={{ marginTop: '1rem' }}>
                                    <p style={{ fontFamily: 'KOTRA_GOTHIC', fontSize: '1.8vmin', marginBottom: 0 }}>
                                        선택된 파일: {fileList[0].name}
                                    </p>
                                </Row>
                            )}
                        </>
                    )}
                </Form>
            </Drawer>
            {isSubmitting && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.1)',
                        zIndex: 9999,
                    }}
                >
                    <Spin size="large" />
                </div>
            )}
        </>
    );
}











