import React from 'react';
import styled from 'styled-components';
import ApngComponent from 'react-apng';

const EmoticonList = ({onClick}) => {
  
  const imageList = [];
  for (let i=1; i<=24; i++){
    imageList.push({
      "url": require(`../Emoticons/cutePig/apng/${i}.png`),
      "index": i,
    });

  };
    return (
        <EmoticonBox>
                <EmoticonTab>
                </EmoticonTab>
                {imageList.map( (image) => <ApngComponent value={image.index} onClick={() => onClick(image.index)} autoPlay={true} style={{ height: '64px', padding: '8px'}} src={image.url} /> )}
        </EmoticonBox>
    )
};
const EmoticonBox = styled.div`
  width: 100%;
  height: 200px;
  background: #ffffff;

  overflow-x: hidden;
  overflow-y: scroll;  
  ::-webkit-scrollbar {
    display: none;
  };
`
const EmoticonTab = styled.div`
  width: 100%;
  height: 30px;
  background: #ffffff;
  border-bottom: 1px solid #E5E5E5;
`


export default EmoticonList;