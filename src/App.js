import React, { Component } from 'react';
import styled from 'styled-components';

// images
import PhoneImage from './Img/phone_mock_up.png'
import BackCircle from './Img/back_circle.png'
import BackPreview from './Img/back_preview.png'
import Emoticon from './Img/emoticon.png'
import Connections from './Img/connections.png'
import Search from './Img/search.png'
import EmoticboxLogo from './Img/emoticBox.png'


// components
import MessageBox from './Component/MessageBox.js'
import EmoticonList from './Component/EmoticonList.js'
import EmoticonPreview  from './Component/EmoticonPreview.js'

let isOpen = false;
const date = new Date();
class App extends Component {
  
  ScrollRef = React.createRef();

  state = {
    preview: true,
    message: '',
    isUser: true,
    messageList: [
      {
        message: "안녕하세요! 좋은 아침입니다~",
        isUser: false,
        date: '오전 07:30',
        // (date.getHours() > 12) ? `오후 ${date.getHours() - 12}:${this._formatMinutes(date.getMinutes())}` : `오전 ${date.getHours()}:${this._formatMinutes(date.getMinutes())}`
      },
      {
        message: "어제 부탁드린 일은 완료됐나요?",
        isUser: false,
        date: '오전 07:31',
      },
    ],
    date: '',
    visible: false,
    selectedId: 0,
    emoticonIndex: 0,
  };
  무
  componentDidUpdate() {
    this._scrollToBottom();
  }
  componentDidMount() {
    
  }
  _scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' });
  };
  
  _handleChange = (e) => {

    this.setState({
      message: e.target.value.length < 18 ? e.target.value : e.target.value //.toString().substring(0,18)
    });
  };
  // 받는 메세지 추가
  _addMessage = (message) => {
    const { messageList } = this.state;
    const date = new Date();
    this.setState({
      messageList: messageList.concat({
        message: message,
        isUser: false,
        date: (date.getHours() > 12) ? `오후 ${date.getHours() - 12}:${this._formatMinutes(date.getMinutes())}` : `오전 ${date.getHours()}:${this._formatMinutes(date.getMinutes())}`,
        emoticonId: 0,
      }),
    });
  }
  _handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      this._sendMessage();
    }
  }
  // 보내는 메세지 추가
  _sendMessage = () => {
    const { message, messageList, selectedId, visible, emoticonIndex } = this.state;
    const date = new Date();
    // 입력한 문자열이 없으면 return

    if (message === "" && visible === false ) return;
    console.log("selected " + selectedId);
    this.setState({
      messageList: messageList.concat({
        message: message,
        isUser: true,
        date: (date.getHours() > 12) ? `오후 ${date.getHours() - 12}:${this._formatMinutes(date.getMinutes())}` : `오전 ${date.getHours()}:${this._formatMinutes(date.getMinutes())}`,
        emoticonId: selectedId,
        emoticonIndex: emoticonIndex,
      }),
      message: '',
      selectedId: 0,
      visible: false,
    });
    if (visible === true) this._openCloseEmoticionView();
  };
  _formatMinutes = (time) => {
    return time < 10 ? `0${time}` : time;
  }
  _openCloseEmoticionView = () => {
    const {visible} = this.state;
    if (visible === true)
      document.getElementById('section').style.height = "260px";
    else
      document.getElementById('section').style.height = "170px";
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
    const {visible,selectedId} = this.state;
    if (selectedId === index) this._sendMessage();
    this.setState({
      visible: !visible,
      selectedId: index,
    })
    this._openCloseEmoticionView();
  }
  _onClickApply = () => {
    this.setState({
      preview: false
    })
  }
  _handleSelectedEmoticon= (index) => {
    this.setState({
      visible: false,
      emoticonIndex: index,
    })
  }
  render() {
    const { messageList, message, preview, emoticonIndex } = this.state;
    if (!preview){
      return (
        <Page>
          <Title>EmoticBox Solution Demo</Title>
          <Background>
            <Viewer>
              <Header>
                <LineA><LabelLeft>9 : 45</LabelLeft><ConnectionIcons/></LineA>
                <LineB><Arrows>&lt;</Arrows><LabelLeft>Developer JH</LabelLeft><LabelRight>...</LabelRight><SearchIcon/></LineB>
              </Header>

              <Section id="section">
                <ChatList>
                  <Chats >
                    {messageList.map((item, index) => {
                      return (<MessageBox key={index} message={item.message} isUser={item.isUser} date={item.date} emoticonId={item.emoticonId} emoticonIndex={item.emoticonIndex}/>);
                    })}
                    <div ref={el => {this.el = el;}} />
                  </Chats>
                </ChatList>
              </Section>
              <EmoticonPreview visible={this.state.visible} index={this.state.selectedId} emoticonIndex={emoticonIndex}></EmoticonPreview>
              <Footer id="footer" onKeyPress={this._handleKeyPress} tabIndex="-1">
                <InputMessage
                  placeholder="메세지를 입력해주세요."
                  onChange={this._handleChange}
                  value={message}
                  
                />
                <EmoticonButton onClick={this._handleEmoticonView}><ButtonImg src={Emoticon} /></EmoticonButton>
                <SendButton onClick={this._sendMessage}>전송</SendButton>
                <EmoticonList onClick={this._onClickEmoticon} emoticonIndex={emoticonIndex} handleIndex={this._handleSelectedEmoticon} />
              </Footer>
              
            </Viewer>
          </Background>
          {/* <Intro>
            <Logo />
            <IntroTitle>[디테일 변화로 큰 차이를 만들다!]</IntroTitle>
            <IntroBody>채팅을 더욱 다채롭게 만들어 줄 이모티콘 솔루션 플랫폼<br />지금 바로 경험해 보세요.</IntroBody>
            <ApplyButton>이모틱박스 적용하기</ApplyButton>
          </Intro> */}
        </Page>
      );
    } else {
      return(
        <Page>
          <Title>EmoticBox Solution Demo</Title>
          <Preview/>
          
          <Intro>
            <Logo />
            <IntroTitle>[디테일 변화로 큰 차이를 만들다!]</IntroTitle>
            <IntroBody>채팅을 더욱 다채롭게 만들어 줄 이모티콘 솔루션 플랫폼<br />지금 바로 경험해 보세요.</IntroBody>
            <ApplyButton onClick={this._onClickApply}>이모틱박스 적용하기</ApplyButton>
          </Intro>
        </Page>
      )
    }
  }
}

const Preview = styled.div`
  margin: 0px 60px 418px 250px;
  width: 650px;
  height: 700px;
  float: left;
  background-image: url(${BackPreview});
`
const Page = styled.div`
  width: 1920px;
  clear: both;
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
const Logo = styled.div`
  height: 30px;
  width: 126px;
  display: block;
  margin: 170px auto 51px auto;
  background-image: url(${EmoticboxLogo});
`
// Title
const Title = styled.div`
  width: 100%;
  margin: 140px 0px 80px 0px;
  text-align: center;
  color: #36BCD6;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 38px;
  line-height: 55px;
`
// Intro
const Intro = styled.div`
  margin: 0px 250px 0px 60px;
  width: 650px;
  height: 650px;
  float: left;
  font-family: Noto Sans KR;
`

const IntroTitle = styled.div`
  width: 100%;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  font-weight: 500;
  margin: 12px 0px;
`
const IntroBody = styled.div`
  width: 100%;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
`
const ApplyButton = styled.button`
  display: block;
  width: 350px;
  height: 67px;
  color: #ffffff;
  
  font-size: 20px;
  line-height: 29px;

  margin: 63px auto;
  background: #36BCD6;

  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
`
// BackGround
const Background = styled.div`
  margin: 0px 60px 200px 250px;
  width: 650px;
  height: 650px;
  float: left;
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
  border-radius: 7px 7px 0px 0px;
`

const LabelLeft= styled.div`
  color:#F2F2F2;
  margin: 0px;
  text-align: center;
  float:left;
  margin: 10px 10px 10px 20px;
  font-family: SF Pro Text;
  font-size: 15px;
  line-height: 18px;
`
// Connection Icons
const ConnectionIcons = styled.div`
  width: 68px;
  height: 16px;
  background-image: url(${Connections});
  margin: 10px 10px 10px 10px;
  float:right;
`

// Lines
const LineA = styled.div`
`
const LineB = styled.div`
  clear: both;
`
const LabelRight = styled.div`
  color:#F2F2F2;
  margin: 0px;
  text-align: center;
  float:right;
  margin: 3px 20px 10px 0px;
  font-size: 16px;
  line-height: 20px;
`
const SearchIcon = styled.div`
  width: 12px;
  height: 12px;
  float: right;
  margin: 10px;
  background-image: url(${Search})
`
const Arrows = styled.div`
  color: #f2f2f2;
  font-size: 20px;
  line-height: 18px;
  margin: 10px 10px 10px 20px;
  float: left;
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
  background: #000000;
  border: 1px solid #E5E5E5;
  border-radius: 0px 0px 7px 7px;
  clear: right;
  outline:none;
`
const InputMessage = styled.input`
  float:left;
  width: 215px;
  margin-left:-1px;
  height: 36px;
  line-height: 20px;
  font-size: 15px;
  outline: none;
  padding-left: 10px;
  padding-right: 100px;
  border: 1px solid #E5E5E5;

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
  outline: none;
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
