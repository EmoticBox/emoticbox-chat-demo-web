import React from 'react';
import styled from 'styled-components';
import ShopImage from '../Img/shop.png'

const EmoticonList = ({onClick, thmList, emoticonIndex, handleIndex, imageList, onClickMarket}) => {

    return (
        <Emoticons>
          {/* 이모티콘 썸네일 */}
          <EmoticonTab>
            {thmList.map((thm, index) => {
                let tabImage = emoticonIndex === index ? require(`../Emoticons/${thm.name}/tab_on.png`) : require(`../Emoticons/${thm.name}/tab_off.png`)
                return (
                  <EmoticonIcon 
                    src={tabImage}
                    onClick={() => handleIndex(index)}
                  />
                );
            })}
            <Shop src={ShopImage} onClick={onClickMarket}/><VerticalLine/>
          </EmoticonTab>

          {/* 이모티콘 리스트 */}
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
const VerticalLine = styled.div`
  margin: 5px 1px 5px 1px;
  height: 21px;
  width: 1px;
  border-left: 1px solid #E7E7E7;
  float: right;
`
const Shop = styled.img`
  margin: 5px 10px 5px 10px;
  height: 20px;
  width: 20px;
  float: right;
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
  border-top: 1px solid #E5E5E5;
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
  paddingHorizontal: 10px;
  background: #ffffff;
  border-bottom: 1px solid #E5E5E5;
`


export default EmoticonList;