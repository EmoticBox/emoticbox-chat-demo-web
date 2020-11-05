import React, { Component } from 'react';
import styled from 'styled-components';

// images
import PhoneImage from './Img/phone_mock_up.png'
import BackCircle from './Img/back_circle.png'
import BackPreview from './Img/back_preview.png'
import Emoticon from './Img/emoticon.png'
import Connections from './Img/connections.png'
import Search from './Img/search.png'
import EmoticboxLogo from './Img/emoticBox_4x.png'
import SearchImage from './Img/searchImage.png'
import CheckImage from './Img/checkImage.png'
import Shop from './Img/shop.png'

// components
import MessageBox from './Component/MessageBox.js'
import EmoticonList from './Component/EmoticonList.js'
import EmoticonPreview  from './Component/EmoticonPreview.js'

let isOpen = false;
const date = new Date();
class App extends Component {
  
  ScrollRef = React.createRef();

  state = {
    imageList: [],
    
    pageState: 'preview',
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
  
  componentDidUpdate() {
    this._scrollToBottom();
  }
  componentDidMount() {
    const {imageList} = this.state;
    
    const emoticonList = ["qurkar","cutePig", "nuni"];
    for (let j = 0; j<3; j++) {
      imageList[j] = [];
      let emoticonName = emoticonList[j];
      for (let i=1; i<=24; i++){
        imageList[j].push({
          "url": require(`./Emoticons/${emoticonName}/${i}.png`),
          "thmnail": require(`./Emoticons/${emoticonName}/stopImage/${i}.png`),
          "index": i,
        });
      };
    }

    
  }
  _scrollToBottom = () => {
  
    //this.el.scrollIntoView(false);
    // this.el.scrollTop = this.el.scrollHeight;
    // console.log(this.el.scrollTop);
    // console.log(this.el.scrollHeight);
    this.el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    // this.el.scrollTop = this.el.scrollHeight;
    // scrollTo(this.el, this.el.scrollHeight);
    // this.el.animate({scrollTop: this.el.scrollHeight});
    
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
    // if (visible === true) this._openCloseEmoticionView();
  };
  _formatMinutes = (time) => {
    return time < 10 ? `0${time}` : time;
  }
  
  _closeEmoticionPreview = () => {
    this.setState({
      visible: false,
      selectedId: 0,
    })
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
    // 같은 이모티콘 클릭
    if (selectedId === index) {
      // this._sendMessage();
      this.setState({visible: false, selectedId: 0,})
    }
    // 다른 이모티콘 클릭
    else {
      this.setState({visible: true, selectedId: index, })
    }
    // this._openCloseEmoticionView();
  }
  _onClickApply = () => {
    this.setState({
      pageState: "chatRoom"
    })
  }
  _handleSelectedEmoticon= (index) => {
    // if (this.state.visible === true ) this._openCloseEmoticionView();
    this.setState({
      visible: false,
      emoticonIndex: index,
    })
  }
  render() {
    const { messageList, message, pageState, emoticonIndex,imageList, visible } = this.state;
    const checkAble = !(message === "" && visible === false);
    if (pageState === "preview"){
      return(
        <Page>
          <Title>EmoticBox Solution Demo</Title>
          <Preview/>
          <Intro>
            <Logo src={EmoticboxLogo}/>
            <IntroTitle>[디테일]의 [변화]로 큰 차이를 만들다!</IntroTitle>
            <IntroBody>채팅을 더욱 다채롭게 만들어 줄 이모티콘 솔루션 플랫폼<br />지금 바로 경험해 보세요.</IntroBody>
            <ApplyButton onClick={this._onClickApply}>이모틱박스 적용하기</ApplyButton>
          </Intro>
        </Page>
      )
    } else {
      return (
        <Page>
          <Title>EmoticBox Solution Demo</Title>
          <Background>
            <Viewer>
              <Header>
                <LineA><LabelLeft>9 : 45</LabelLeft><ConnectionIcons/></LineA>
                <LineB><Arrows>&lt;</Arrows><LabelLeft>Emoticbox</LabelLeft><LabelRight>...</LabelRight><SearchIcon/></LineB>
              </Header>

              <Section id="section">
                <ChatList onClick={this._closeEmoticionPreview}>
                  <Chats  >
                    {messageList.map((item, index) => {
                      return (<MessageBox key={index} message={item.message} isUser={item.isUser} date={item.date} emoticonId={item.emoticonId} emoticonIndex={item.emoticonIndex}/>);
                    })}
                    <div ref={el => {this.el = el;}} />
                  </Chats>
                </ChatList>
              </Section>
              <EmoticonPreview visible={this.state.visible} index={this.state.selectedId} emoticonIndex={emoticonIndex} onClose={this._closeEmoticionPreview}></EmoticonPreview>
              <Footer id="footer" onKeyPress={this._handleKeyPress} tabIndex="-1">
                <InputMessage
                  placeholder="메세지를 입력해주세요."
                  onChange={this._handleChange}
                  value={message}
                  
                />
                <EmoticonButton onClick={this._handleEmoticonView}><ButtonImg src={Emoticon} /></EmoticonButton>
                <SendButton checkAble={checkAble} onClick={this._sendMessage}>전송</SendButton>
                <EmoticonList onClick={this._onClickEmoticon} emoticonIndex={emoticonIndex} handleIndex={this._handleSelectedEmoticon} imageList={imageList[emoticonIndex]}/>
              </Footer>
              
            </Viewer>
          </Background>
          {pageState === "chatRooms" && this.state.visible === false ?
            <Intro>
              <Logo src={EmoticboxLogo}/>
              <IntroBoxTitle>이모틱박스의 이모티콘 솔루션이 채팅에 적용됐습니다!</IntroBoxTitle>
              <IntroBoxBody><IntroImage src={SearchImage}/> 이모티콘 목록을 호출하고 싶으시면 채팅앱의 <IntroImage src={Emoticon}/> 아이콘을 클릭해주세요.</IntroBoxBody>
            </Intro>
          :
            <Intro>
              <Logo src={EmoticboxLogo}/>
              <IntroBoxBody><IntroImage src={CheckImage}/> <IntroImage src={Shop}/> 은 이모틱 박스 스토어와 연결됩니다.</IntroBoxBody>
              <IntroBoxBody>
                <IntroImage src={CheckImage}/> 채팅창의 환경(모바일,PC)에 따라 앱 또는 웹으로 접속합니다.
                <IntroLink>
                  <IntroLinkText href="/">&lt; 이모틱박스 스토어 웹 살펴보기</IntroLinkText>
                </IntroLink>
                <IntroLink>
                  <IntroLinkText href="/">&lt; 이모틱박스 스토어 앱 살펴보기</IntroLinkText>
                </IntroLink>
              </IntroBoxBody>
            </Intro>
          }
        </Page>
      );
    }
  }
}
const IntroLink = styled.div`
  height: 35px;
  clear: both;
`
const IntroLinkText = styled.a`
  margin: 0px;
  float: right;
`
const Preview = styled.div`
  margin: 0px 60px 70px 250px;
  width: 650px;
  height: 700px;
  float: left;
  background-image: url(${BackPreview});
`
const Page = styled.div`
  display: inline-block;
  width: 1920px;
  clear: both;
  background: #F7F7F7;
  user-select: none;
  margin: 0px auto;
`
const Logo = styled.img`
  height: 18px;
  width: 92px;
  display: block;
  margin: 170px 0px 18px 0px;
  
  object-fit: cover;
`
//background-image: url(${EmoticboxLogo}); 
// Title
const Title = styled.div`
  width: 100%;
  margin: 70px 0px 80px 0px;
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
  margin: 0px 240px 0px 120px;
  width: 600px;
  height: 600px;
  float: left;
  font-family: Noto Sans KR;
`

const IntroTitle = styled.div`
  width: 100%;
  font-size: 24px;
  line-height: 35px;
  font-weight: 700;
  margin: 0px 0px 27px 0px;
  clear: both;
`
const IntroBody = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 400;
  line-height: 24.62px;
`
const IntroImage = styled.img`
  height: 15px;
  width: 15px;
`
const IntroBoxTitle = styled.div`
  background: #FFFFFF;
  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;
  
  width: 100%;
  font-size: 24px;
  line-height: 35px;
  
  text-align: left;
  padding: 12px 0px;
  margin: 15px 0px 15px 0px;
`
const IntroBoxBody = styled.div`
  background: #FFFFFF;
  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;

  padding: 14px 24px;
  margin: 7.5px;
  width: 100%;
  font-size: 17px;
  line-height: 35px;
  text-align: left;
  
  font-weight: 400;
  clear: both;
`
const ApplyButton = styled.button`
  display: block;
  width: 370px;
  height: 67px;
  color: #ffffff;
  
  font-size: 20px;
  line-height: 29px;

  margin: 50px 0px;
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
  border: 1px solid ${props => props.checkAble ? "#36BCD6" : "#EEEEEE"}; 
  background: ${props => props.checkAble ? "#36BCD6" : "#EEEEEE"}; 
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
