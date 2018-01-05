import {Route, Redirect} from 'react-router-dom';
import Home from 'view/home/Home.js';
import Signin from 'view/user/Signin.js';
import SignUp from 'view/user/SignUp.js';
import MyPage from 'view/user/MyPage';
import Nav from '../nav/Nav.js';



import S from './style.scss';

import cfg from 'config/config.json'

export default class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myInfo: null,
      signInMsg: null,
      signUpMsg: null,
      hasLoginReq: false,
      myPagePreviews:[],
      nodebooks:[],
      previewsName: '所有文章'
    }
    this.signInAjax = this.signInAjax.bind(this);
    this.signUpAjax = this.signUpAjax.bind(this);
    this.clearLoginMsg = this.clearLoginMsg.bind(this);
    this.initMyInfo = this.initMyInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.initMyPage = this.initMyPage.bind(this);
    this.changePreviewsName = this.changePreviewsName.bind(this);
    this.changePreviews = this.changePreviews.bind(this);
  }

  initMyInfo(myInfo) {
    if(myInfo) {
      let {avatar, id, username, user_intro} = myInfo;
      avatar = cfg.url + avatar;
      myInfo = {
        user_id: id,
        user_name: username,
        avatar,
        user_intro
      }
    };

    this.setState({myInfo});

  }

  clearLoginMsg() {
    this.setState({
      signInMsg: null,
      signUpMsg: null
    });
  }


  signInAjax(reqData) {
    $.post(`${cfg.url}/login`, reqData)
    .done(ret=>{

      let {code, data} = ret;

      if(code === 0) {
        this.initMyInfo(ret.data)
      }else {
        this.setState({
          signInMsg: ret
        })
      }

    })
  }

  signUpAjax(reqData) {
    $.post(`${cfg.url}/register`, reqData)
    .done((ret)=>{
      let {code, data} = ret;

      this.setState({
        signUpMsg: ret
      });

      if(code ===0) {
        setTimeout(()=> {
          this.initMyInfo(ret.data);
        }, 1000);
      }

    })

  }

  componentDidMount() {

    $.post(`${cfg.url}/autologin`)
    .done(({code, data})=>{
      if(code === 0) {
        this.initMyInfo(data);
      }
      this.setState({
        hasLoginReq: true
      })
      let {state, pathname} = this.props.location;
      if(state){
        let {user_id, collection_name, collection_id} = state.userInfo;
        if(pathname === '/my_page'){
          !collection_name ? this.initMyPage(user_id, {user_id}, '所有文章') : this.initMyPage(user_id, {collection_id}, collection_name);


        }
      }
    })


  }

  logOut() {
    $.post(`${cfg.url}/logout`)
    .done(({code})=>{
      if(code === 0) {
        this.initMyInfo(null)
      }
    })
  }

  getPreview(data, previewsName) {
    $.post(`${cfg.url}/getPreview`, data)
    .done(({code, data})=>{
      if(code === 0) {
        this.setState({
          myPagePreviews:data,
          previewsName
        })
      }
    })
  }
//一行函数，代码只有一行的函数，里面调用别的函数，只是为了代码更好的语义化，当程序员更能理解
  changePreviews(data, previewName){
    this.getPreview(data, previewName)
  }

  initMyPage(user_id, previewsData, previewsName) {
    this.changePreviews(previewsData, previewsName);
    $.post(`${cfg.url}/getCollection`, {
      user_id
    })
    .done(({code, data})=>{
      if(code === 0) {
        this.setState({
          nodebooks: data,
          previewsName
        })
      }
    })
  }

  changePreviewsName(previewsName) {
    this.setState({previewsName});
  }

  render() {
    let {signInAjax, signUpAjax, clearLoginMsg, logOut, initMyPage, getPreview, changePreviews} = this;

    let {signInMsg, signUpMsg, myInfo, hasLoginReq, previewsName, myPagePreviews, nodebooks} = this.state;
    let {history} = this.props;
    if(!hasLoginReq) {
      return (<div></div>);
    }

    return (
      <div className={S.layout}>
        <Nav
          {...{
            myInfo,
            logOut,
            initMyPage,
            history
          }}
        />
        <Route exact path="/" render={
          (props)=> (
            <Home
              {...{
                initMyPage
              }}
              {...props}
            />
          )
        } />
        <Route exact path="/sign_in" render={
          (props)=>(
            myInfo ? (
              <Redirect to="/" />
            ) : (
              <Signin
                {...{
                  signInAjax,
                  signInMsg,
                  clearLoginMsg
                }}
              />
            )
          )
        }  />
        <Route exact path="/sign_up" render={
          (props)=>(
            myInfo ? (
              <Redirect to="/" />
            ) : (
              <SignUp
                {...{
                  signUpAjax,
                  signUpMsg,
                  clearLoginMsg
                }}
              />
            )
          )
        } />
        <Route exact path="/my_page" render={
          (props)=>(
            props.location.state? (
              <MyPage {...{
                previewsName,
                myPagePreviews,
                nodebooks,
                initMyPage,
                changePreviews,
                myInfo
              }}
                {...props}
              />
            ) : (
              <Redirect to="/" />
            )
          )
        } />
      </div>
    );
  }
}
