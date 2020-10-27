import React from 'react';
import styled from 'styled-components';
import ApngComponent from 'react-apng';


const EmoticonPreview = ({visible, index, emoticonIndex}) => {
    const emoticonList = ["qurkar","cutePig", "nuni"];
    const emoticonName = emoticonList[emoticonIndex];

    if (visible === false) return ('')
    else{
        const apic1 = require(`../Emoticons/${emoticonName}/${index}.png`);
        return (
            <EmoticonBox>
                <PreviewBox>
                    <ApngComponent autoPlay={true} style={{ height: '80px', padding: '5px'}} src={apic1} />
                </PreviewBox>
            </EmoticonBox>
        )
    } 
};
const PreviewBox = styled.span`
    float: right;
    height: 100%;
    margin: 0;
`
const EmoticonBox = styled.div`
  width: 100%;
  height: 90px;
  background: #ffffff;
`


export default EmoticonPreview;