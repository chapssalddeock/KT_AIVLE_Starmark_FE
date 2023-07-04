import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Frame, ChartMainFrame } from '../../../styles/MyPage_Emotion';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { useSpring, animated } from 'react-spring';
import useGET from '../../AuthCommunicate/GET';


export default function MyDashBoard() {

    // 1. GET으로 북마크 정보 받기
    const [data, setData] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();

    // 2. legend만 빼서 갯수 세기를 위한 변수
    // const [counts, setCounts] = useState({});
    const networkRef = useRef();
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const [selectedNode, setSelectedNode] = useState(null);


    // 데이터 받는 get 함수 정의
    const fetchData = async () => {
        await getFetchData('/statistic/');
    };

    // GET 함수 실행 부분이라 그냥 냅두기
    useEffect(() => {
        fetchData();
    }, []);

    // 3. 빼낸 정보들로 네트워크 차트에 들어갈 데이터 구성
    useEffect(() => {
        if (getData) {
            setData(getData);  // 데이터 받기
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);


    useEffect(() => {
        if (data) { // 받은 데이터가 잘 들어갔다면

            const container = document.getElementById('mynetwork');

            // 데이터셋 만들기
            const nodesData = (data.nodes);
            const edgesData = (data.edges);

            const nodes = new DataSet(nodesData);
            const edges = new DataSet(edgesData);
            const dataset = { nodes, edges };
            const options = {
                nodes: {
                    shape: "dot",
                    size: 30,
                    font: {
                        size: 16,
                    },
                    borderWidth: 2,
                },
                edges: {
                    width: 2,
                },
            };


            const network = new Network(container, dataset, options);

            networkRef.current = network;

            networkRef.current.on('click', (event) => {
                if (event.nodes.length > 0) {
                    const nodeId = event.nodes[0];
                    const selectedNode = nodes.get(nodeId);
                    setSelectedNode(selectedNode);
                    // setIsModalOpen(true);
                }
            });
        }
        else {
            networkRef.current = null;
        }
    }, []);



    // 4. 네트워크 차트 구성 
    return (<>
        <Frame>
            <ChartMainFrame>
                <animated.div style={springProps}>
                    {/* <ChartMainFrame id="mynetwork" > */}
                    <h2 style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>My Tags Chart</h2>
                    <div id="mynetwork" />
                    {/* </ChartMainFrame> */}
                </animated.div>
            </ChartMainFrame>
        </Frame >
    </>
    )
};