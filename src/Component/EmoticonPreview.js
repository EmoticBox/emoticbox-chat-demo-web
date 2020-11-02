import React from 'react';
import styled from 'styled-components';
import EmoticonApng from '../Component/EmoticonApng'
import xButton from '../Img/xButton.png'
// import ApngComponent from 'react-apng';


const EmoticonPreview = ({visible, index, emoticonIndex, onClose}) => {
    const emoticonList = ["qurkar","cutePig", "nuni"];
    const emoticonName = emoticonList[emoticonIndex];

    if (visible === false || index === 0) return ('')
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
                    <EmoticonApng  emoticonName={emoticonName} index={index}/>
                    <CloseButton onClick={onClose} src={xButton}/>
                </PreviewBox>
            </EmoticonBox>
        )
    } 
};

const PreviewBox = styled.span`
    float: right;
    height: 100%;
    margin: 0;
    width: 106px;
`
const EmoticonBox = styled.div`
    position: relative;
    width: 100%;
    height: 90px;
    background: #ffffff;
    background-color: #ffffff;
    background-color: rgba( 255, 255, 255, 0.8 );
    margin: -90px 0px;
`
const CloseButton = styled.img`
    position: absolute;
    width: 8px;
    height: 8px;
    margin: 8px 8px 0px 0px;
`


export default EmoticonPreview;