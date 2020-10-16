import React from 'react';
import styled from 'styled-components';
const MessageBox = ({message, isUser, date}) => {
  
  console.log("test " + date);
  
  if (isUser === true){
    return (
      <Chat>
          {/* <Icon/> */}
          <MessageRight>
              {/* <NickName>Emoticbox</NickName> */}
              <Time>{date}</Time><MessageText>{message}</MessageText>
          </MessageRight>
      </Chat>
  );
  } else {
    return (
        <Chat>
            {/* <Icon/> */}
            <MessageLeft>
                {/* <NickName>Emoticbox</NickName> */}
                <MessageForm><ExampleText>{message}</ExampleText><Time>{date}</Time></MessageForm>
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
`
const Time = styled.span`
  vertical-align: bottom;
  margin-left: 7px;
  margin-right: 7px;
  font-size: 8px;
  text-align: center;
`
const ExampleText = styled.span`
  display: inline-block;
  color: rgba(0, 0, 0, 0.47);

  word-break:break-all;
  margin: 0;

  max-width: 200px;
  padding: 5px 10px;
  text-align: left;

  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  box-shadow: 0 1px #aabcc5;
`
const MessageText = styled.span`
  
  display: inline-block;
  color: #ffffff;
  
  word-break:break-all;
  margin: 0;
  
  max-width: 200px;
  padding: 5px 10px;
  text-align: left;

  background-color: #2DD5B2;
  border: 1px solid #2DD5B2;
  border-radius: 3px;
  box-shadow: 0 1px #aabcc5;
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