import React from 'react';
import styled from 'styled-components';
import EmoticonApng from '../Component/EmoticonApng'
import ApngComponent from 'react-apng';


const EmoticonPreview = ({visible, index, emoticonIndex}) => {
    const emoticonList = ["qurkar","cutePig", "nuni"];
    const emoticonName = emoticonList[emoticonIndex];

    if (visible === false) return ('')
    else{
        let apic1 = require(`../Emoticons/${emoticonName}/${index}.png`);
        let apic2 = require(`../Emoticons/${emoticonName}/stopImage/${index}.png`);
        const groupPic = {
            move: apic1,
            thm: apic2,
        }
        return (
            <EmoticonBox>
                <PreviewBox>
                    <EmoticonApng style={{ height: '80px', padding: '5px'}} emoticonName={emoticonName} index={index}/>
                </PreviewBox>
            </EmoticonBox>
        )
    } 
};

const PreviewBox = styled.span`
    float: right;
    height: 100%;
    margin: 0;
    width: 90px;
`
const EmoticonBox = styled.div`
  width: 100%;
  height: 90px;
  background: #ffffff;
`


export default EmoticonPreview;