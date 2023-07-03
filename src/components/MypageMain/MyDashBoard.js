import React from 'react';
import { useState, useEffect } from 'react';
import { MainFrame, Frame, } from '../../../styles/MyPage_Emotion';

import useGET from '../../AuthCommunicate/GET';
import usePOST from '../../AuthCommunicate/POST';
import useDELETE from '../../AuthCommunicate/DELETE';

export default function MyDashBoard() {

 
    return (<>
        <Frame>
            <MainFrame>
                여기 대쉬보드 들어갈거임!!!
            </MainFrame>
        </Frame>
    </>
    )
};