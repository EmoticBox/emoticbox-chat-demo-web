import React from 'react';
import styled from 'styled-components';
const MessageBox = ({message},) => {
    return (
      
        <Chat>
            {/* <Icon/> */}
            <Message>
                {/* <NickName>Emoticbox</NickName> */}
                <MessageText>{message}</MessageText><Time>오전 10:02</Time>
            </Message>
        </Chat>
    );
};
const MessageText = styled.div`
  display: inline-block;
  
  color: rgba(0, 0, 0, 0.47);
  
  word-break:break-all;
  margin: 0;
  height: auto;
  max-width: 200px;
  padding: 5px 10px;

  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  box-shadow: 0 1px #aabcc5;
`

const Chat = styled.li`
  display: block;
  overflow: hidden;
  list-style: none;
  height: auto;
  margin: 10px;
`
const Icon = styled.span`
  display: block;
  width: 38px;
  height: 38px;
  float: left;
  background-color: #0f0f0f;
`
const Message = styled.div`
  display: inline-block;
  margin-left: 10px;
  height: 17px;
  font-size: 12px;
  float: left;
  align-items: center;
  text-align: center;
`
const Time = styled.span`
  vertical-align: bottom;
  margin-left: 7px;
  height: 27px;
  font-size: 8px;
  text-align: center;
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