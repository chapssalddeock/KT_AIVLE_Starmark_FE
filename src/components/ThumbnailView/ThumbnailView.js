import { Card, Col, Row } from 'antd';
const { Meta } = Card;

//import ThumbnailContainer from '../../../styles/thumbnail_emotion'



export default function ThumbnailView() {


    return (
        <>

            <Row gutter={16} style={{ marginTop: 20, marginLeft: 20, height: "calc(100vh - 200px)", overflowY: 'scroll' }}>
                <Col span={8} >
                    <Card hoverable style={{ width: 280, height: 420, margin: 10, }} cover={<img style={{ margin: 10, width: 260, height: 180, borderRadius: 10 }} alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                        <Meta title="Django" description="장고에 대한 설명 어쩌구 저쩌구...." />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable style={{ width: 280, height: 420, margin: 10, }} cover={<img style={{ margin: 10, width: 260, height: 180, borderRadius: 10 }} alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                        <Meta title="React" description="리액트에 대한 설명 어쩌구 저쩌구...." />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable style={{ width: 280, height: 420, margin: 10, }} cover={<img style={{ margin: 10, width: 260, height: 180, borderRadius: 10 }} alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                        <Meta title="밑으로 StarMark" description="실험중입니다." />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable style={{ width: 280, height: 420, margin: 10, }} cover={<img style={{ margin: 10, width: 260, height: 180, borderRadius: 10 }} alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                        <Meta title="밑" description="간다가" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable style={{ width: 280, height: 420, margin: 10, }} cover={<img style={{ margin: 10, width: 260, height: 180, borderRadius: 10 }} alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                        <Meta title="StarMark" description="42조 파이팅!" />
                    </Card>
                </Col>
            </Row>

        </>
    )

}


// display: flex;
// flex-direction: column;
// justify-content: space-between;
// align-items:center;
// text-align: center;
