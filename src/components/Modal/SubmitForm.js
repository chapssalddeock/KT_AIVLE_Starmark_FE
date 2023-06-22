import React, { useState } from 'react';
import { Segmented, Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
//const { Option } = Select;

export default function SubmitForm({ isOpen, onClose }) {

    // URL , HTML 택 1 해서 폼 바꾸는 state
    const [selectedOption, setSelectedOption] = useState('URL');

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = (values) => {
        // Form 데이터 처리 로직 추가
        console.log(values);
        onClose();
    };


    return (
        <>
            <Drawer
                title="북마크 제출하기"
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

                    {/* 여기 부분은 HTML 파일을 올릴 수 있도록 합당하게 수정 예정입니다. */}
                    {selectedOption === 'HTML' && (<Form.Item
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
                    </Form.Item>)}


                </Form>
            </Drawer>
        </>
    );
};

