import React from 'react';
import styled from 'styled-components';
import ApngComponent from 'react-apng';
const MessageBox = ({message, isUser, date, emoticonId, emoticonName}) => {
  
  // 이모티콘 발송
  if (Number(emoticonId) > 0 ){
    const apic1 = require(`../Emoticons/${emoticonName}/${emoticonId}.png`);
    if (message !== "")
      return (
        <Chat>
            {/* <Icon/> */}
            <MessageRight>
                {/* <NickName>Emoticbox</NickName> */}
                <MessageForm><img autoPlay={true} style={{ height: '80px', padding: '5px'}} src={apic1} /></MessageForm>
                <Time>{date}</Time><MessageText>{message}</MessageText>
            </MessageRight>
        </Chat>
      );
    else
        return (
          <Chat>
            <MessageRight>
              <Time>{date}</Time><img autoPlay={true} style={{ height: '80px', padding: '5px'}} src={apic1} />
            </MessageRight>
          </Chat>
        )
  }
  // 보낸 메세지
  else if (isUser === true){
    return (
      <Chat>
          {/* <Icon/> */}
          <MessageRight>
              {/* <NickName>Emoticbox</NickName> */}
              <Time>{date}</Time><MessageText>{message}</MessageText>
          </MessageRight>
      </Chat>
    );
  // 받은 메세지
  } else {
    return (
        <Chat>
            {/* <Icon/> */}
            <MessageLeft>
                {/* <NickName>Emoticbox</NickName> */}
                <ExampleText>{message}</ExampleText><Time>{date}</Time>
                {message === "어제 부탁드린 일은 완료됐나요?" ? <Margin> </Margin> : <></>}
            </MessageLeft>
        </Chat>
    );
  }
};

const Chat = styled.li`
  display: block;
  list-style: none;
  margin-bottom: 10px;
`
const Icon = styled.span`
  display: block;
  width: 38px;
  height: 38px;
  float: left;
  background-color: #0f0f0f;
`
const MessageLeft = styled.div`
  display: block;
  margin-left: 10px;
  font-size: 12px;
  align-items: center;
  text-align: left
`
const MessageRight = styled.div`
  display: block;
  margin-right: 10px;
  font-size: 12px;
  align-items: center;
  text-align: right
`
const MessageForm = styled.p`
  margin: 0px;
  padding: 0px;
`
const Time = styled.span`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 8px !important;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.4);
  
  vertical-align: bottom;
  margin-left: 7px;
  margin-right: 7px;
  text-align: center;
`
const ExampleText = styled.span`
  display: inline-block;
  color: rgba(0, 0, 0, 0.47);

  word-break:break-all;
  margin: 0;

  max-width: 200px;
  padding: 4px 11px;
  text-align: left;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  

  background-color: #F7F7F7;
  border-radius: 3px;
  
`
const MessageText = styled.span`
  
  display: inline-block;
  color: #f7f7f7;
  
  word-break:break-all;
  margin: 0;
  
  max-width: 200px;
  padding: 4px 11px;
  text-align: left;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;


  background-color: #2DD5B2;
  border-radius: 3px;
`
const Margin = styled.div`
  width: 100%;
  height: 35px;
`
const NickName = styled.div`
  display: block;
  font-size: 13px;
  color: #465560;
  font-weight: normal;
  height: 12px;
  margin: 0 0 8px 4px;
`


export default MessageBox;