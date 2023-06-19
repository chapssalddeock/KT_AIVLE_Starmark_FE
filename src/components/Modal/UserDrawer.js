import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Row } from 'antd';
//const { Option } = Select;

export default function UserDrawer() {


    return (
        <>
            <Drawer
                title="유저 확인하기"
                width={720}

                bodyStyle={{
                    paddingBottom: 80,
                }}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            이거 어케되는겨~
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};



