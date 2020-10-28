import React from 'react';
import styled from 'styled-components';
import ApngComponent from 'react-apng';


const EmoticonList = ({onClick, emoticonIndex, handleIndex, imageList}) => {

  // const emoticonList = ["qurkar","cutePig", "nuni"];
  // const emoticonName = emoticonList[emoticonIndex];
  // let imageList = [];
  // imageList = [];
  // for (let i=1; i<=24; i++){
  //   imageList.push({
  //     "url": require(`../Emoticons/${emoticonName}/${i}.png`),
  //     "index": i,
  //   });
  // };
  // on off
  const tabQurkar = emoticonIndex === 0 ? require(`../Emoticons/qurkar/tab_on.png`) : require(`../Emoticons/qurkar/tab_off.png`);
  const tabCutePig = emoticonIndex === 1 ? require(`../Emoticons/cutePig/tab_on.png`) : require(`../Emoticons/cutePig/tab_off.png`);
  const tabNuni = emoticonIndex === 2 ? require(`../Emoticons/nuni/tab_on.png`) : require(`../Emoticons/nuni/tab_off.png`);
  
  
    return (
        <Emoticons>
                <EmoticonTab>
                  <EmoticonIcon src={tabQurkar} onClick={() => handleIndex(0)}/>
                  <EmoticonIcon src={tabCutePig} onClick={() => handleIndex(1)}/>
                  <EmoticonIcon src={tabNuni} onClick={() => handleIndex(2)}/>
                </EmoticonTab>
                <EmoticonBox>
                  {imageList.map( (image) => 
                    <EmoticonSet>
                      <EmoticonThm id="thm" value={image.index} onClick={() => onClick(image.index)} autoPlay={true} style={{ height: '76px', padding: '2px'}} src={image.thmnail} />
                      <EmoticonImg id="imgs" value={image.index} onClick={() => onClick(image.index)} autoPlay={true} style={{ height: '76px', padding: '2px'}} src={image.url} />
                    </EmoticonSet>
                  )}
                </EmoticonBox>
        </Emoticons>
    )
};
const EmoticonSet = styled.a`
  &: #thm {
    display: none;  
  }
  &:hover #thm {
    display: none;  
  }
  &:hover #imgs {
    display: inline;  
  }
`
const EmoticonThm = styled.img`

`
const EmoticonImg = styled.img`
  display: none;
`

const Emoticons = styled.div`
  width: 100%;
  height: 220px;
  background: #ffffff;
  clear: both;
`
const EmoticonIcon = styled.img`
  margin: 5px 10px 5px 10px;
  height: 20px;
  width: 26px;
`
const EmoticonBox = styled.div`
  width: 100%;
  height: 190px;
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
  padding-left: 10px;
  background: #ffffff;
  border-bottom: 1px solid #E5E5E5;
`


export default EmoticonList;