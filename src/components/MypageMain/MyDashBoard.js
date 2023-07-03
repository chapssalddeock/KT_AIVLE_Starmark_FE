import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { MainFrame, Frame, } from '../../../styles/MyPage_Emotion';
import { Network } from 'vis-network/';
import { DataSet } from 'vis-data/';
import { useSpring, animated } from 'react-spring';
import useGET from '../../AuthCommunicate/GET';


export default function MyDashBoard() {

    // 1. GET으로 북마크 정보 받기
    const [data, setData] = useState([]);
    const { fetchData: getFetchData, data: getData, error: getError } = useGET();

    // 2. legend만 빼서 갯수 세기를 위한 변수
    const [wordCounts, setWordCounts] = useState({});

    // 데이터 받는 get 함수 정의
    const fetchData = async () => {
        await getFetchData('/bookmark/');
    };


    // GET 함수 실행 부분이라 그냥 냅두기
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (getData) {
            const legends = getData.map(f => f.legends).flat();
            setData(legends);  // 데이터 받기,데이터에서 레전드만 빼기 
        } else if (getError) {
            console.error(getError);
        }
    }, [getData, getError]);


    // 실질적 실행하는 부분 정의 시작
    // 3. 빼낸 정보들로 네트워크 차트에 들어갈 데이터 구성
    const networkRef = useRef();
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        if (data) { // 받은 데이터가 잘 들어갔다면
            const container = document.getElementById('mynetwork');
            const wordCounts = {}; // 데이터 요소별 개수 세기
            data.forEach((item) => {
                if (wordCounts[item]) {
                    wordCounts[item] += 1;
                } else {
                    wordCounts[item] = 1;
                }
            });
            setWordCounts(wordCounts); // 개수 세고 저장

            // 데이터셋 만들기
            const maxCount = Math.max(...Object.values(wordCounts));
            const nodesData = Object.keys(wordCounts).map((word, index) => ({
                id: index + 1,
                label: word,
                value: wordCounts[word] / maxCount // 빈도수에 따라 Node의 크기 조절
            }));

            const nodes = new DataSet(nodesData);
            const edges = new DataSet([]);
            const dataset = { nodes, edges };
            const options = {};

            const network = new Network(container, data, options);
            networkRef.current = network;
            networkRef.current.on('click', (event) => {
                if (event.nodes.length > 0) {
                    const nodeId = event.nodes[0];
                    const selectedNode = nodes.get(nodeId);
                    setSelectedNode(selectedNode);
                    setIsModalOpen(true);
                }
            });
        }
        else {
            networkRef.current = null;
        }
    }, [wordCounts]);


    // 4. 네트워크 차트 구성 
    return (<>
        <Frame>
            <animated.div style={springProps}>
                <MainFrame id="mynetwork">
                    여기 대쉬보드 들어갈거임!!!
                </MainFrame>
            </animated.div>
        </Frame>
    </>
    )
};