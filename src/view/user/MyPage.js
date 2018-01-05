
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';


let propTypes = {
  previewsName: PT.string,
  nodebooks: PT.array,
  myPagePreviews: PT.array,
  changePreviews: PT.func,
  initMyPage: PT.func,
  myInfo: PT.object
};
export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.collectionClick = this.collectionClick.bind(this);
    this.notebookClick = this.notebookClick.bind(this);
  }

  collectionClick(collection_id, collection_name, userInfo){
    this.props.changePreviews({collection_id}, collection_name)
    this.props.history.push('/my_page',{
      userInfo
    });
  }

  notebookClick(collection_id, collection_name, userInfo){
    this.props.changePreviews({collection_id}, collection_name)
    this.props.history.push('/my_page',{
      userInfo
    });
  }

  render() {
    let {previewsName, nodebooks, myPagePreviews, location, initMyPage, history, myInfo} = this.props;

    let {userInfo} = location.state;

    let {collectionClick, notebookClick} = this;

    let isMe = false;

    if(myInfo){
      isMe = myInfo.user_id === userInfo.user_id;
    }

     return (
      <div className="ui container grid">
        <div className="twelve wide column">
          <AuthorInfo
            {...{
              userInfo,
              initMyPage,
              history
            }}
          />
          <div className="ui secondary pointing menu">
            <span className="active item">
              {previewsName}
            </span>
          </div>
          <PreviewList
            {...{
              previews:  myPagePreviews,
              initMyPage,
              collectionClick
            }}
          />
        </div>
        <div className="four wide column">
          <Aside
            {...{
              nodebooks,
              userInfo,
              notebookClick,
              isMe
            }}
          />
        </div>
      </div>
    );
  }
}

MyPage.propTypes = propTypes;
