import React, { Component } from 'react';
import styled from 'styled-components';
import MessageBox from './Component/MessageBox.js'
import phoneImage from './Img/phone_mock_up.png'
import backCircle from './Img/back_circle.png'
class App extends Component {
  state = {
    message: '',
    messageList: [],
  };
  num = 0;

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  };
  
  handleCreate = () => {
    const { message, messageList } = this.state;
    this.setState({
      messageList: messageList.concat({
        message: message
      }), 
      message: '',
    });
  };
  componentDidMount() {
    const { messageList } = this.state;
    this.setState({
      messageList: messageList.concat({
        message: `Emoticbox 이모티콘을 이용해보세요!`
      }), 
      message: '',
    });
  }

  render() {
    const {messageList, message} = this.state;
    return (
      <Background>
        <Viewer>

          <Header>
            <Title>Default</Title>
          </Header>

          <Section>
            <ChatList>
              <Chats>
                { messageList.map((item, index) => {
                  return (
                    <MessageBox key={index} message={item.message}/>
                  );
                })}
              </Chats>
            </ChatList>
          </Section>

          <Footer>
            <InputMessage 
              placeholder="메세지를 입력해주세요."
              onChange={this.handleChange}
              value={message}
            />
            <SendButton onClick={this.handleCreate}>전송</SendButton>
          </Footer>

        </Viewer>
      </Background>
    );
  }
}
// BackGround
const Background = styled.div`
  width: 650px;
  height: 650px;
  background-image: url(${backCircle});
`
// Viewer
const Viewer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 326px;
  height: 700px;  
  padding: 51px 12px;
  background-image: url(${phoneImage});
`

// Header
const Header = styled.div`
  width: 100%;
  height: 74px;
  background: #2DD5B2;
  margin: 0px;
`
const Title = styled.h1`
  color:#F2F2F2;
  margin: 0px;
  text-align: center;
`

// Section
const Section = styled.div`
  width: 100%;
  height: 480px;
  padding-top: 10px;
  background: #F2F2F2;
`
const ChatList = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  
  overflow-x: hidden;
  overflow-y: scroll;  
  ::-webkit-scrollbar {
    display: none;
  };
`
const Chats = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  pointer-events: none;
`

// Footer
const Footer = styled.div`
  height: 40px;
  
  position: relative;
  background: #ffffff;
  border-radius: 0px 0px 7px 7px;
`
const InputMessage = styled.input`
  float:left;
  margin-left: -1px;
  width: 314px;
  height: 36px;
  line-height: 20px;
  font-size: 15px;
  outline: none;
  padding-left: 10px;
  border: 1px solid #E5E5E5;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  color: rgba(0, 0, 0, 0.47);
`
const SendButton = styled.button`
  position: absolute;
  display: inline-block;
  margin-left:-50px;
  float: right;
  width: 42px;
  height: 25px;
  top: 7px;
  color: #ffffff;
  border: 1px solid #36BCD6;
  background: #36BCD6;
  border-radius: 3px;
`
export default App;
