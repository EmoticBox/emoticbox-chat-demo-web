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
import linkArrow from './Img/linkArrow.png'
import CheckImageSmall from './Img/checkImage2.png'
import Shop from './Img/shop.png'
import newEmoticonThm from './Emoticons/meatLove/tab_on.png'
// video
import ReactPlayer from 'react-player'
import demoVideo from "./video/demo.gif";

// components
import MessageBox from './Component/MessageBox.js'
import EmoticonList from './Component/EmoticonList.js'
import EmoticonPreview  from './Component/EmoticonPreview.js'

// let isOpen = false;
// const date = new Date();
class App extends Component {
  
  ScrollRef = React.createRef();

  state = {
    isOpen: false,
    imageList: [],
    emoticonList: [],
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
    isMarketClick: false,
    pageState: 'preview',
    message: '',
    isUser: true,

    date: '',
    visible: false,
    selectedId: 0,
    emoticonIndex: 0,
  };
  
  componentDidUpdate(prevProps, prevState) {
    this._scrollToBottom();
    console.log("market", this.state.isMarketClick, prevState.isMarketClick);
    if (this.state.isMarketClick !== prevState.isMarketClick)
    {
      this._getEmoticonList();
    }
  }
  componentWillMount() {
    this._getEmoticonList();
  }
  _getEmoticonList = () => {
    const {imageList, emoticonList} = this.state;
    let defaultList = [];
    if (this.state.isMarketClick)
    {
      defaultList.push({
        name : "meatLove",
        count: 16
      });
    }
    defaultList = [
      ...defaultList,
    {
      name : "qurkar",
      count: 24,
    },
    {
      name : "cutePig",
      count: 24,
    },
    {
      name : "nuni",
      count: 24
    },
    ]
    
    this.setState({
      emoticonList: defaultList
    })
    
    defaultList.map((emoticon, index) => {
      imageList[index] = [];
      for (let i=1; i <= emoticon.count; i++){
        imageList[index].push({
          "url": require(`./Emoticons/${emoticon.name}/${i}.png`),
          "thmnail": require(`./Emoticons/${emoticon.name}/stopImage/${i}.png`),
          "index": i,
        });
      };
    });
    if (this.state.isMarketClick)
      this._handleSelectedEmoticon(0);
  }
  _scrollToBottom = () => {
    if (this.el)
      this.el.scrollTop = this.el.scrollHeight;
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
        emoticonName: this.state.emoticonList[emoticonIndex].name,
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
    console.log("isOpen", this.state.isOpen);
    if (this.state.isOpen) {
      if (this.state.visible === true) this._onClickEmoticon();
      // document.getElementById('section').style.height = "480px";
      // document.getElementById('footer').style.height = "40px";
    } else {
      // document.getElementById('section').style.height = "260px";
      // document.getElementById('footer').style.height = "260px";
    }
    this.setState({
      isOpen: !this.state.isOpen
    })
    
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
  _onClickBuy = () => {
    this.setState({
      pageState: "chatRoom"
      
    })
  }
  _onClickBack = () => {
    this.setState({
      pageState: "preview"
    })
  }
  _onClickMarket = () => {
    this.setState({
      pageState: "market",
      isMarketClick: true,
    })
    // this._getEmoticonList();
  }
  _onClickConsult = () => {
    this.setState({
      pageState: "consult"
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
          <PageCenter>
            <Title>EmoticBox Solution Demo</Title>
            <Preview/>
            <Intro>
              <Logo src={EmoticboxLogo}/>
              <IntroTitle>[디테일]의 [변화]로 큰 차이를 만들다!</IntroTitle>
              <IntroBody>채팅을 더욱 다채롭게 만들어 줄 이모티콘 솔루션 플랫폼<br />지금 바로 경험해 보세요.</IntroBody>
              <ApplyButton onClick={this._onClickApply}>이모틱박스 적용하기</ApplyButton>
            </Intro>
          </PageCenter>
        </Page>
      )
    } else if (pageState === "chatRoom") {
      return (
        <Page>
          <PageCenter>
            <Title>EmoticBox Solution Demo</Title>
            <Background>
              <Viewer>
                <Header>
                  <LineA>
                    <LabelTime>9:45</LabelTime>
                    <ConnectionIcons/>
                  </LineA>
                  
                  <LineB onClick={() => {this._onClickBack()}}>
                    <Arrows>&lt;</Arrows>
                    <LabelLeft>Emoticbox</LabelLeft>
                    <LabelRight>...</LabelRight>
                    <SearchIcon/>
                  </LineB>
                </Header>

                <Section style={{height: this.state.isOpen ? "260px" : "480px"}} id="section">
                  <ChatList id="chatLog" ref={el => {this.el = el;}} onClick={this._closeEmoticionPreview}>
                    <Chats>
                      {messageList.map((item, index) => {
                        
                        return (
                          <MessageBox
                            key={index}
                            message={item.message}
                            isUser={item.isUser}
                            date={item.date}
                            emoticonId={item.emoticonId}
                            emoticonName={item.emoticonId > 0 ? item.emoticonName : null}
                            // emoticonName={item.emoticonId > 0 ? this.state.emoticonList[item.emoticonIndex].name : null}
                          />
                        );
                      })}
                    </Chats>
                  </ChatList>
                </Section>
                <EmoticonPreview
                  visible={this.state.visible} 
                  index={this.state.selectedId}
                  emoticonName={this.state.emoticonList[emoticonIndex].name}
                  onClose={this._closeEmoticionPreview}
                />
                <Footer style={{height: this.state.isOpen ? "260px" : "40px"}} id="footer" onKeyPress={this._handleKeyPress} tabIndex="-1">
                  <InputMessage
                    placeholder="메세지를 입력해주세요."
                    onChange={this._handleChange}
                    value={message}
                    
                  />
                  <EmoticonButton onClick={this._handleEmoticonView}>
                    <ButtonImg src={Emoticon} />
                  </EmoticonButton>
                  <SendButton checkAble={checkAble} onClick={this._sendMessage}>전송</SendButton>
                  <EmoticonList
                    onClick={this._onClickEmoticon}
                    thmList={this.state.emoticonList}
                    emoticonIndex={emoticonIndex} 
                    handleIndex={this._handleSelectedEmoticon} 
                    imageList={imageList[emoticonIndex]}
                    onClickMarket={this._onClickMarket}
                  />
                </Footer>
                
              </Viewer>
            </Background>
            
            {pageState === "chatRoom" && this.state.isOpen === false ?
              <Intro>
                <Logo src={EmoticboxLogo}/>
                <IntroBoxTitle>이모틱박스의 이모티콘 솔루션이 채팅에 적용됐습니다!</IntroBoxTitle>
                <IntroBoxBody>
                  <IntroImage src={SearchImage}/> 이모티콘 목록을 호출하고 싶으시면 채팅앱의 <IntroImage src={Emoticon}/> 아이콘을 클릭해주세요.
                </IntroBoxBody>
              </Intro>
            :
              <Intro>
                <Logo src={EmoticboxLogo}/>
                <IntroBoxBody>
                  {this.state.isMarketClick ? 
                  <><IntroImage src={CheckImage}/> &nbsp;이모틱박스 스토어에서 구매하신 <IntroThm src={newEmoticonThm}/> 이모티콘은 메일 연동된 채팅창에서 바로 사용 가능합니다.</>
                  :
                  <><IntroImage src={CheckImage}/> &nbsp;<IntroImage src={Shop}/> 은 이모틱박스 스토어와 연결됩니다.</>
                  }
                </IntroBoxBody>
                <IntroBoxBody>
                  <IntroImage src={CheckImage}/> &nbsp;채팅창의 환경(모바일,PC)에 따라 앱 또는 웹으로 접속합니다.
                  {/* <IntroLink>
                      <IntroArrowImage src={linkArrow}/> &nbsp;
                    <IntroLinkText href="/">이모틱박스 스토어 웹 살펴보기</IntroLinkText>
                  </IntroLink> */}
                  <IntroLink>
                    <IntroArrowImage src={linkArrow}/> &nbsp;
                    <IntroLinkText href="https://play.google.com/store/apps/details?id=com.emoticbox.store" target="_blank">
                      이모틱박스 스토어 앱 살펴보기
                    </IntroLinkText>
                  </IntroLink>
                </IntroBoxBody>
                <IntroBoxBody>
                  <IntroImage src={CheckImage}/> &nbsp;단 4개의 API만을 귀사의 클라이언트에 적용하는 것으로 수만 개의 이모티콘을 사용할 수 있습니다.
                  <IntroLink>
                    <IntroArrowImage src={linkArrow}/> &nbsp;
                    <IntroLinkText href="https://docs.developers.emoticbox.com" target="_blank">
                      API Doc 살펴보기
                    </IntroLinkText>
                  </IntroLink>
                </IntroBoxBody>
                {/* <IntroBoxBody>
                  <IntroImage src={CheckImage}/> &nbsp;도입 상담, 추가적인 사용방법이 궁금하시다면?
                  <IntroLink>
                    <IntroArrowImage src={linkArrow}/> &nbsp;
                    <IntroLinkText onClick={this._onClickConsult}>
                      상담 신청하기
                    </IntroLinkText>
                  </IntroLink>
                </IntroBoxBody> */}
                {/* <IntroBoxBodySmall>
                  <IntroImageSmall src={CheckImageSmall}/> 스토어에서 구매한 이모티콘들은 이모틱박스의 모든 제휴사에서 사용할 수 있습니다.<br/>
                  <IntroImageSmall src={CheckImageSmall}/> 해당 채팅 서비스의 운영 제휴사는 Emoticbox로 부터 해당 이모티콘의 판매건에 대한<br/>
                  <IntroEmptySmall />수익의 10%를 분배받습니다.
                </IntroBoxBodySmall> */}
              </Intro>
            }
          </PageCenter>
        </Page>
      );
    } else if (pageState === "market") {
      return (
        <Page>
            <PageCenter>
            <Title>EmoticBox Solution Demo</Title>
            
            <Background>
              <Viewer>
                <StoreView>
                  <img
                      src={demoVideo}
                      width = "100%"
                      height = "598px"
                  />
                  {/* <StoreVideo src={demoVideo}>
                  </StoreVideo> */}
                </StoreView>
              </Viewer>
            </Background>
            <Intro>
              <Logo src={EmoticboxLogo}/>
              <IntroTitle>EmoticBox App</IntroTitle>
              <IntroBody>앱을 통해 다양한 이모티콘들을 구매하고 관리할 수 있습니다.</IntroBody>
              <ApplyButton onClick={this._onClickBuy}>이모티콘 구매완료</ApplyButton>
            </Intro>
          </PageCenter>
        </Page>
      );
    } else {
      return (
        <Page>
          <Title>EmoticBox Solution Demo</Title>
          <ConsultingCover>
            <ConsultingForm>
              <ConsultTitle>상담 신청</ConsultTitle>

              <ConsultLabel><ConsultCheckIcon src={CheckImage}/>회사명</ConsultLabel>
              <ConsultText></ConsultText>

              <ConsultLabel><ConsultCheckIcon src={CheckImage}/>담당자명</ConsultLabel>
              <ConsultText></ConsultText>

              <ConsultLabel><ConsultCheckIcon src={CheckImage}/>연락처</ConsultLabel>
              <ConsultText></ConsultText>

              <ConsultLabel><ConsultCheckIcon src={CheckImage}/>이메일</ConsultLabel>
              <ConsultText></ConsultText>
              
              <ConsultAgreeForm>
                <ConsultCheckBox type="checkbox"></ConsultCheckBox>
                <ConsultLinkText>개인정보 수집 이용 동의</ConsultLinkText>(필수)
              <ConsultAgreeForm>
              </ConsultAgreeForm>
                <ConsultCheckBox type="checkbox"></ConsultCheckBox>
                <ConsultLinkText>마케팅 수집 및 활용 동의</ConsultLinkText>(선택)
              </ConsultAgreeForm>
            </ConsultingForm>
          </ConsultingCover>
        </Page>
      )
    }
  }
}
const ConsultingCover = styled.div`
  display: flex;
  justify-content: center;
`
const ConsultingForm = styled.div`
  width: 594px;
  height: 730px;
  
  padding: 37px; 51px;
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: #ffffff;
  border: 1px solid #36BCD6;
  border-radius: 30px;
`
const ConsultTitle = styled.div`
  font-family: Noto Sans KR;
  font-weight: bold;
  font-size: 30px;
  line-height: 43px;
  color: #36BCD6;
  margin-bottom: 30px;
`
const ConsultLabel = styled.div`
  display: flex;
  flex-direction: row;
  width: 488px;
  
  font-family: Noto Sans KR;
  font-weight: bold;
  font-size: 17px;
  line-height: 25px;

  margin-bottom: 5px;
`
const ConsultCheckIcon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0px 7px;
`
const ConsultText = styled.input`
  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;
  width: 488px;
  height: 45px;
  
  padding: 0px 10px;
  margin-bottom: 30px;
`
const ConsultAgreeForm = styled.div`
  display: flex;
  flex-direction: row;

  font-family: Noto Sans KR;
  font-size: 12px;
  color: #36BCD6;
`
const ConsultLinkText = styled.span`
  line-height: 17px;
  text-decoration-line: underline;
`
const ConsultCheckBox = styled.input`
  width: 15px;
  height: 15px;
  margin: 0px 10px;
`

const PageCenter = styled.div`
  width: 1920px;
  margin: 0px auto;
`
const StoreView = styled.div`
  height: 598px;
  width: 100%;
  border-radius: 8px;
  background-color: #000000;
`
const StoreVideo = styled(ReactPlayer)`
  height: 598px;
  width: 100%;
`
const IntroLink = styled.div`
  height: 35px;
  clear: both;
`
const IntroLinkText = styled.a`
  font-size: 14px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 700;
  
  
  :visited{
    text-decoration:none;
  }
  color: #36BCD6;
  margin: 0px;
`
const Preview = styled.div`
  margin: 0px 60px 70px 250px;
  padding: 0px;
  width: 650px;
  height: 730px;
  float: left;
  background-image: url(${BackPreview});
  background-size: cover;
`
const Page = styled.div`
  display: inline-block;
  min-width: 1920px;
  width: 100%;
  height: 100%;
  clear: both;
  background: #F7F7F7;
  user-select: none;
  margin: 0px auto;
`
const Logo = styled.img`
  height: 18px;
  width: 92px;
  display: block;
  margin: 0px 0px 12.5px 0px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 150px;
  width: 600px;
  height: 650px;
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
const IntroThm = styled.img`
  height: 20px;
  width: 26px;
`
const IntroImage = styled.img`
  
  height: 15px;
  width: 15px;
  
`
const IntroArrowImage = styled.img`
  margin: 0px 0px 0px 360px;
  height: 11px;
  width: 11px;
  
`
const IntroImageSmall = styled.img`
  
  height: 8px;
  width: 10px;
  
`
const IntroEmptySmall = styled.div`
  display: inline-block;
  height: 8px;
  width: 14px;
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
  padding: 12px 24px;
  margin: 7.5px 0px;
`
const IntroBoxBody = styled.div`
  background: #FFFFFF;
  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;

  padding: 14px 24px;
  
  width: 100%;
  font-size: 17px;
  line-height: 35px;
  text-align: left;
  margin: 7.5px 0px;
  font-weight: 400;
  clear: both;
`
const IntroBoxBodySmall = styled.div`
  background: #FFFFFF;
  border: 1px solid #36BCD6;
  box-sizing: border-box;
  border-radius: 10px;

  padding: 14px 24px;
  margin: 7.5px 0px;
  width: 100%;
  font-size: 14px;
  line-height: 20.27px;
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
const LabelTime = styled.div`
  color:#F2F2F2;
  margin: 0px;
  text-align: center;
  float:left;
  margin: 10px 10px 10px 20px;
  font-family: SF Pro Text;
  font-size: 15px;
  line-height: 18px;
`
const LabelLeft= styled.div`
  color:#F2F2F2;
  margin: 0px;
  text-align: center;
  float:left;
  margin: 10px 10px 10px 10px;
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
  background: #ffffff;
  border: 1px solid #E5E5E5;
  border-radius: 0px 0px 7px 7px;
  padding: 0px;
  clear: right;
  outline:none;
`
const InputMessage = styled.input`
  float:left;
  width: 217px;
  margin-left: -1px;
  height: 38px;
  line-height: 20px;
  font-size: 15px;
  outline: none;
  border: none;
  padding-left: 10px;
  padding-right: 100px;

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
