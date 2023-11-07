import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Frame, ChartMainFrame } from '../../../styles/MyPage_Emotion';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { useSpring, animated } from 'react-spring';
import useGET from '../../AuthCommunicate/GET';


export default function MyDashBoard() {

    // const [data, setData] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();
    const networkRef = useRef();
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    // const [selectedNode, setSelectedNode] = useState(null);


    // 데이터 받는 get 함수 정의
    const fetchData = async () => {
        await getFetchData('/statistic/');
    };


    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        if (getData) {
            // console.log("data get", getData)
            const container = document.getElementById('mynetwork');

            // 데이터셋 만들기
            const nodesData = (getData.nodes);
            const edgesData = (getData.edges);

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

            // setData(getData); 
        } else if (getError) {
            console.error(getError);
            networkRef.current = null;
        }
    }, [getData, getError]);





    // 네트워크 차트 구성 
    return (<>
        <Frame>
            <ChartMainFrame>
                <animated.div style={springProps}>

                    <h2 style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>My Tags Chart</h2>
                    <div id="mynetwork" />

                </animated.div>
            </ChartMainFrame>
        </Frame >
    </>
    )
}; 