import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';

let propsTypes = {
  article_id: PT.number,
  article_title: PT.string,
  previewContent: PT.string,
  user_id: PT.number,
  user_name: PT.string,
  collection_id: PT.number,
  collection_name: PT.string,
  liked: PT.number,
  createdAt: PT.string,
  avatar: PT.string,
  initMyPage: PT.func
}


function Preview(props) {
  let {
    article_id,
    article_title,
    previewContent,
    user_id,
    user_name,
    liked,
    createdAt,
    avatar,
    viewer,
    history,
    initMyPage,
    user_intro,
    collection_name,
    collection_id
  } = props;
  createdAt = new Date(createdAt).toLocaleDateString();
    return (
      <div className={`${S.note}`}>
        <div className="ui divider hidden"></div>
        <div className={`${S.content}`}>
          <div className={`${S.author}`}>
            <Link to="/my_page"
              className="avatar"
              onClick={
                ev=>{
                  //阻止默认的点击事件
                  ev.preventDefault();
                  ev.stopPropagation();
                  history.push('/my_page',{
                    userInfo: {
                      user_id,
                      user_name,
                      avatar,
                      user_intro,
                      collection_id,
                      collection_name:null
                    }
                  });
                  initMyPage(user_id, {user_id}, '所有文章')
                }
              }
            >
              <img
                src={avatar} alt=""
              className="ui avatar image"/>
            </Link>
            <div className={`${S.name}`}>
              <Link to="/">{user_name}</Link>
              <span className="time">{createdAt}</span>
            </div>
          </div>
          <Link to="/" className={S.title}>{article_title}</Link>
          <p className={S.abstract}>
            {previewContent}
          </p>
          <div className={S.meta}>
            {props.children}
          </div>
        </div>
      </div>
    );
}
export default withRouter(Preview);
Preview.propTypes = propsTypes;
