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
                width={720}
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
                    options={[{ label: 'URL', value: 'URL', }, { label: 'HTML', value: 'HTML', },]} onChange={handleOptionChange} />


                <Form layout="vertical" onFinish={handleSubmit} id="submitForm">
                    <Row gutter={16}>
                        <Col span={12}>
                            {selectedOption === 'URL' && (<Form.Item
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
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>)}
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
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};



    // const [isOpen, setIsOpen] = useState(false);

    // 리액트 무한루프 렌더링
    //setIsOpen(props.fromState);
    // 핸들링 시 useEffect 사용
    // useEffect(() => {
    //     setIsOpen(props.fromState);
    //     console.log(props.fromState);
    // }, [props.fromState]);


    // const onClose = () => {
    //     setIsOpen(false);
    // };