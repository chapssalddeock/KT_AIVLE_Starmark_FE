import React, { useState } from 'react';
import { Segmented, Button, Drawer, Form, Input, Row, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function SubmitForm({ isOpen, onClose }) {

    // URL , HTML 택 1 해서 폼 바꾸는 state
    const [selectedOption, setSelectedOption] = useState('URL');
    // formData 보내는 state
    const [fileList, setFileList] = useState([]);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', fileList)  //서버전달용

        try {
            const response = await axios.post('여기 우리 서버 API', formData, {
                headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
            });
            if (response.status === 200) {
                console.log('이미지 전송 성공', response.data);
            } else {
                console.log('이미지 전송 실패');
            }
        } catch (event) {
            console.error('이미지 전송 실패', event)
        };
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const newFileList = Array.from(files);
        setFileList(newFileList);
        console.log(newFileList);
    };


    const props = {
        name: 'file',
        action: 'http://localhost:3000/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };




    return (
        <>
            <Drawer
                title="북마크 입력"
                width={500}
                onClose={onClose}
                open={isOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button form="submitForm" key="submit" htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Segmented
                    options={[{ label: 'URL', value: 'URL', }, { label: 'HTML', value: 'HTML', },]} onChange={handleOptionChange}
                    style={{ marginBottom: 30 }} />


                <Form layout="vertical" onFinish={handleSubmit} id="submitForm">


                    {selectedOption === 'URL' && (
                        <>
                            <Row gutter={16}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Bookmark Name',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Please enter Bookmark Name"
                                    />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item
                                    name="url"
                                    label="Url"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter url',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Please enter url"
                                    />
                                </Form.Item>
                            </Row>

                        </>
                    )}

                    {selectedOption === 'HTML' && (<Upload {...props}>
                        <Button icon={<UploadOutlined />} onChange={handleFileChange}>Click to Upload</Button>
                    </Upload>)}

                </Form>
            </Drawer>
        </>
    );
};


{/* <label htmlFor="file-upload">
                        <div style={{ width: '400px', height: '200px', backgroundColor: 'gray', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <UploadOutlined style={{ fontSize: '56px' }} />
                            <p style={{ marginTop: '10px' }}>Click to HTML Upload</p>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                    </label> */}

{/* <Form.Item
                        name="html"
                        label="Html"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Html',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Please enter HTML"
                        />
                    </Form.Item> */}