import React, { useState, useEffect } from 'react';
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

export default function SubmitForm({ isOpen, onClose, url }) {
    const [selectedOption, setSelectedOption] = useState('URL');
    const [fileList, setFileList] = useState([]);
    const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm(); // Add form instance
    console.log('url', url)
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
                url: values.url || url,
                is_public: values.is_public,
            };
        } else if (selectedOption === 'HTML') {
            formData = new FormData();
            formData.append('type', 'file');
            formData.append('data', fileList[0]);
        }

        await postFetchData('/bookmark/', formData);
        form.resetFields(); // Reset the form fields
    };

    useEffect(() => {
        if (postData) {
            console.log('전송 성공', postData);
            setIsSubmitting(false); // Reset the submission state
        } else if (postError) {
            console.log('전송 실패', postError);
            setIsSubmitting(false); // Reset the submission state
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
                title="북마크 입력"
                width={500}
                onClose={handleCancel}
                open={isOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            취소
                        </Button>
                        <Button form="submitForm" key="submit" htmlType="submit" type="primary" loading={isSubmitting}>
                            제출
                        </Button>
                    </div>
                }
            >
                <div style={{ marginBottom: 30 }}>
                    <Segmented options={[{ label: 'URL', value: 'URL' }, { label: 'HTML', value: 'HTML' }]} onChange={handleOptionChange} />
                </div>
                <Form layout="vertical" onFinish={handleSubmit} id="submitForm" form={form}> {/* Pass form instance to the Form */}
                    {selectedOption === 'URL' && (
                        <>
                            <Row gutter={16}>
                                <Form.Item name="title" label="북마크 이름" rules={[{ required: true, message: '북마크 이름을 입력하세요.' }]}>
                                    <Input placeholder="북마크 이름을 입력하세요." />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item name="url" label="URL" rules={[{ required: true, message: 'URL을 입력하세요.' }]} initialValue={url}>
                                    <Input placeholder="URL을 입력하세요." />
                                </Form.Item>
                            </Row>
                            <Row gutter={16}>
                                <Form.Item name="is_public" label="공개 여부" rules={[{ required: true, message: '공개 여부를 선택하세요.' }]}>
                                    <Select placeholder="선택" options={options} onChange={handleChange} />
                                </Form.Item>
                            </Row>
                        </>
                    )}

                    {selectedOption === 'HTML' && (
                        <>
                            <Form.Item name="file" label="HTML 파일 업로드">
                                <Button icon={<UploadOutlined />} onClick={() => document.getElementById('fileInput').click()}>
                                    파일 업로드
                                </Button>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                            </Form.Item>
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


// import React, { useState, useEffect } from 'react';
// import { Segmented, Spin, Button, Drawer, Form, Input, Row, Select } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import usePOST from '../../AuthCommunicate/POST';

// const handleChange = (value) => {
//     console.log(`선택된 값: ${value}`);
// };

// const options = [
//     { value: true, label: '공개' },
//     { value: false, label: '비공개' },
// ];

// export default function SubmitForm({ isOpen, onClose, url }) {
//     const [selectedOption, setSelectedOption] = useState('URL');
//     const [fileList, setFileList] = useState([]);
//     const { fetchData: postFetchData, data: postData, error: postError } = usePOST();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [form] = Form.useForm(); // Add form instance
//     console.log('url', url)
//     const handleOptionChange = (value) => {
//         setSelectedOption(value);
//     };

//     const handleSubmit = async (values) => {
//         setIsSubmitting(true);

//         let formData = null;

//         if (selectedOption === 'URL') {
//             formData = {
//                 type: 'string',
//                 title: values.title,
//                 url: values.url || url,
//                 is_public: values.is_public,
//             };
//         } else if (selectedOption === 'HTML') {
//             formData = new FormData();
//             formData.append('type', 'file');
//             formData.append('data', fileList[0]);
//         }

//         await postFetchData('/bookmark/', formData);
//         form.resetFields(); // Reset the form fields
//     };

//     useEffect(() => {
//         if (postData) {
//             console.log('전송 성공', postData);
//             setIsSubmitting(false); // Reset the submission state
//         } else if (postError) {
//             console.log('전송 실패', postError);
//             setIsSubmitting(false); // Reset the submission state
//         }
//     }, [postData, postError]);

//     const handleFileChange = (event) => {
//         const files = event.target.files;
//         const newFileList = Array.from(files);
//         setFileList(newFileList);
//     };


//     const handleCancel = () => {
//         onClose();
//     };

//     return (
//         <>
//             <Drawer
//                 title="북마크 입력"
//                 width={500}
//                 onClose={handleCancel}
//                 open={isOpen}
//                 bodyStyle={{
//                     paddingBottom: 80,
//                 }}
//                 zIndex={2000}
//                 extra={
//                     <div style={{ textAlign: 'right' }}>
//                         <Button onClick={handleCancel} style={{ marginRight: 8 }}>
//                             취소
//                         </Button>
//                         <Button form="submitForm" key="submit" htmlType="submit" type="primary" loading={isSubmitting}>
//                             제출
//                         </Button>
//                     </div>
//                 }
//             >
//                 <div style={{ marginBottom: 30 }}>
//                     <Segmented options={[{ label: 'URL', value: 'URL' }, { label: 'HTML', value: 'HTML' }]} onChange={handleOptionChange} />
//                 </div>
//                 <Form layout="vertical" onFinish={handleSubmit} id="submitForm" form={form}> {/* Pass form instance to the Form */}
//                     {selectedOption === 'URL' && (
//                         <>
//                             <Row gutter={16}>
//                                 <Form.Item name="title" label="북마크 이름" rules={[{ required: true, message: '북마크 이름을 입력하세요.' }]}>
//                                     <Input placeholder="북마크 이름을 입력하세요." />
//                                 </Form.Item>
//                             </Row>
//                             <Row gutter={16}>
//                                 <Form.Item name="url" label="URL" rules={[{ required: true, message: 'URL을 입력하세요.' }]} initialValue={url}>
//                                     <Input placeholder="URL을 입력하세요." />
//                                 </Form.Item>
//                             </Row>
//                             <Row gutter={16}>
//                                 <Form.Item name="is_public" label="공개 여부" rules={[{ required: true, message: '공개 여부를 선택하세요.' }]}>
//                                     <Select placeholder="선택" options={options} onChange={handleChange} />
//                                 </Form.Item>
//                             </Row>
//                         </>
//                     )}

//                     {selectedOption === 'HTML' && (
//                         <>
//                             <Form.Item name="file" label="HTML 파일 업로드">
//                                 <Button icon={<UploadOutlined />} onClick={() => document.getElementById('fileInput').click()}>
//                                     파일 업로드
//                                 </Button>
//                                 <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
//                             </Form.Item>
//                         </>
//                     )}
//                 </Form>
//             </Drawer>
//             {isSubmitting && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         background: 'rgba(0, 0, 0, 0.1)',
//                         zIndex: 9999,
//                     }}
//                 >
//                     <Spin size="large" />
//                 </div>
//             )}
//         </>
//     );
// }










// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Segmented, Button, Drawer, Form, Input, Row, Space, message, Upload, Select } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import usePOST from '../../AuthCommunicate/POST';

// const handleChange = (value) => {
//     console.log(`선택된 값: ${value}`);
// };

// const options = [
//     { value: true, label: '공개' },
//     { value: false, label: '비공개' },
// ];

// export default function SubmitForm({ isOpen, onClose }) {
//     const router = useRouter();

//     const [selectedOption, setSelectedOption] = useState('URL');
//     const [fileList, setFileList] = useState([]);
//     const { fetchData: postFetchData, data: postData, error: postError } = usePOST();

//     const handleOptionChange = (value) => {
//         setSelectedOption(value);
//     };

//     const handleSubmit = async (values) => {

//         let formData = null;

//         if (selectedOption === 'URL') {
//             formData = {
//                 type: 'string',
//                 title: values.title,
//                 url: values.url,
//                 is_public: values.is_public,
//             };
//         } else if (selectedOption === 'HTML') {
//             formData = new FormData();
//             formData.append('file', fileList[0]);
//         }

//         await postFetchData('/bookmark/', formData);
//     };

//     useEffect(() => {
//         if (postData) {
//             console.log('전송 성공', postData);
//             router.reload(); // 페이지 새로고침
//         } else if (postError) {
//             console.log(postError);
//             console.log('전송 실패', postError);
//         }
//     }, [postData, postError]);

//     const handleFileChange = (event) => {
//         const files = event.target.files;
//         const newFileList = Array.from(files);
//         setFileList(newFileList);
//         console.log(newFileList);
//     };

//     const props = {
//         name: 'file',
//         action: 'http://localhost:3000/',
//         headers: {
//             authorization: 'authorization-text',
//         },
//         onChange(info) {
//             if (info.file.status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (info.file.status === 'done') {
//                 message.success(`${info.file.name} 파일이 성공적으로 업로드되었습니다.`);
//             } else if (info.file.status === 'error') {
//                 message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
//             }
//         },
//         progress: {
//             strokeColor: {
//                 '0%': '#108ee9',
//                 '100%': '#87d068',
//             },
//             strokeWidth: 3,
//             format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//         },
//     };

//     const handleCancel = () => {
//         router.reload(); // 페이지 새로고침
//     };

//     return (
//         <>
//             <Drawer
//                 title="북마크 입력"
//                 width={500}
//                 onClose={onClose}
//                 open={isOpen}
//                 bodyStyle={{
//                     paddingBottom: 80,
//                 }}
//                 extra={
//                     <Space>
//                         <Button onClick={handleCancel}>취소</Button>
//                         <Button form="submitForm" key="submit" htmlType="submit" type="primary">
//                             제출
//                         </Button>
//                     </Space>
//                 }
//             >
//                 <div style={{ marginBottom: 30 }}>
//                     <Segmented options={[{ label: 'URL', value: 'URL' }, { label: 'HTML', value: 'HTML' }]} onChange={handleOptionChange} />
//                 </div>
//                 <Form layout="vertical" onFinish={handleSubmit} id="submitForm">
//                     {selectedOption === 'URL' && (
//                         <>
//                             <Row gutter={16}>
//                                 <Form.Item name="title" label="북마크 이름" rules={[{ required: true, message: '북마크 이름을 입력하세요.' }]}>
//                                     <Input placeholder="북마크 이름을 입력하세요." />
//                                 </Form.Item>
//                             </Row>
//                             <Row gutter={16}>
//                                 <Form.Item name="url" label="URL" rules={[{ required: true, message: 'URL을 입력하세요.' }]}>
//                                     <Input placeholder="URL을 입력하세요." />
//                                 </Form.Item>
//                             </Row>
//                             <Row gutter={16}>
//                                 <Form.Item name="is_public" label="공개 여부" rules={[{ required: true, message: '공개 여부를 선택하세요.' }]}>
//                                     <Select placeholder="선택" options={options} onChange={handleChange} />
//                                 </Form.Item>
//                             </Row>
//                         </>
//                     )}

//                     {selectedOption === 'HTML' && (
//                         <>
//                             <Upload {...props}>
//                                 <Button icon={<UploadOutlined />} onChange={handleFileChange}>
//                                     파일 업로드
//                                 </Button>
//                             </Upload>
//                         </>
//                     )}
//                 </Form>
//             </Drawer>
//         </>
//     );
// }




