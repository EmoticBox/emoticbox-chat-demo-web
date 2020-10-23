import React, { Component } from 'react';
import styled from 'styled-components';

// images
import PhoneImage from './Img/phone_mock_up.png'
import BackCircle from './Img/back_circle.png'
import Emoticon from './Img/emoticon.png'

// components
import MessageBox from './Component/MessageBox.js'
import EmoticonList from './Component/EmoticonList.js'
import EmoticonPreview  from './Component/EmoticonPreview.js'

let isOpen = false;
class App extends Component {

  state = {
    message: '',
    isUser: true,
    messageList: [],
    date: '',
    visible: false,
    selectedId: 0,
  };
  num = 0;

  _handleChange = (e) => {

    this.setState({
      message: e.target.value.length < 18 ? e.target.value : e.target.value //.toString().substring(0,18)
    });
  };

  _sendMessage = () => {
    const { message, messageList, selectedId } = this.state;
    const date = new Date();
    console.log("selected " + selectedId);
    this.setState({
      messageList: messageList.concat({
        message: message,
        isUser: true,
        date: (date.getHours() > 12) ? `오후 ${date.getHours() - 12}:${this._formatMinutes(date.getMinutes())}` : `오전 ${date.getHours()}:${this._formatMinutes(date.getMinutes())}`,
        emoticonId: selectedId
      }),
      message: '',
    });
  };
  _formatMinutes = (time) => {
    return time < 10 ? `0${time}` : time;
  }
  _handleEmoticonView = () => {
    if (isOpen) {
      if (this.state.visible === true) this._onClickEmoticon();
      document.getElementById('section').style.height = "480px";
      document.getElementById('footer').style.height = "40px";
    } else {
      document.getElementById('section').style.height = "260px";
      document.getElementById('footer').style.height = "260px";
    }
    isOpen = !isOpen;
  }
  _onClickEmoticon = (index) => {
    const {visible} = this.state;
    this.setState({
      visible: !visible,
      selectedId: index,
    })

    if (visible === true)
      document.getElementById('section').style.height = "260px";
    else
      document.getElementById('section').style.height = "170px";
  }
  componentDidMount() {
    const { messageList } = this.state;
    const date = new Date();
    this.setState({
      messageList: messageList.concat({
        message: `Emoticbox 이모티콘을 이용해보세요!`,
        isUser: false,
        date: (date.getHours() > 12) ? `오후 ${date.getHours() - 12}:${this._formatMinutes(date.getMinutes())}` : `오전 ${date.getHours()}:${this._formatMinutes(date.getMinutes())}`,
        emoticonId: 0,
      }),
      message: '',
    });
  }

  render() {
    const { messageList, message } = this.state;
    return (
      <Background>
        <Viewer>

          <Header>
            <Title>Default</Title>
          </Header>

          <Section id="section">
            <ChatList>
              <Chats>
                {messageList.map((item, index) => {
                  return (<MessageBox key={index} message={item.message} isUser={item.isUser} date={item.date} emoticonId={item.emoticonId} />);
                })}
              </Chats>
            </ChatList>
          </Section>
          <EmoticonPreview visible={this.state.visible} index={this.state.selectedId}></EmoticonPreview>
          <Footer id="footer">
            <InputMessage
              placeholder="메세지를 입력해주세요."
              onChange={this._handleChange}
              value={message}
            />
            <EmoticonButton onClick={this._handleEmoticonView}><ButtonImg src={Emoticon} /></EmoticonButton>
            <SendButton onClick={this._sendMessage}>전송</SendButton>
            <EmoticonList onClick={this._onClickEmoticon}/>
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
  background-image: url(${BackCircle});
`
// Viewer
const Viewer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 326px;
  height: 598px;  
  padding: 51px 12px;
  background-image: url(${PhoneImage});
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
  overflow: hidden;
  position: relative;
  background: #ffffff;
  border-radius: 0px 0px 7px 7px;
  clear: right;

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
  top: 8px;
  color: #ffffff;
  border: 1px solid #36BCD6;
  background: #36BCD6;
  border-radius: 3px;
`

const EmoticonButton = styled.a`
  position: absolute;
  display: inline-block;
  margin-left:-80px;
  width: 20px;
  height: 20px;
  top: 10px;
  
  padding: 0;
`

const ButtonImg = styled.img`
  margin: 0;
  padding: 0;
`
export default App;
