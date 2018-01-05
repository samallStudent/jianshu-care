
import S from './style.scss';

let propTypes = {
  nodebooks: PT.array,
  userInfo: PT.object,
  notebookClick: PT.func,
  isMe: PT.bool
}

export default class Aside extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inEdit: false,
      editVal: ""
    }

    this.editMe = this.editMe.bind(this);

  }

  editMe(ev){
    ev.stopPropagation();
    ev.preventDefault();

    let {user_intro} = this.props.userInfo;

    this.setState({
      inEdit: true,
      editVal:user_intro
    })

  }

  render() {
    let {nodebooks, userInfo, notebookClick, isMe} = this.props;

    let {editMe} = this;

    let {inEdit, editVal} = this.state;

    let {user_intro} = userInfo;

    nodebooks = nodebooks.map((elt, i)=>{
      let {id: collection_id, collection_name} = elt;

      return (
        <div
          className="item"
          key={i}
          onClick = {
            ev=>{
              //这里的userInfo没有collection_id和collection_name所以加上，都是为了刷新的时候不更改用户界面而保存的状态

              userInfo.collection_name = collection_name;
              userInfo.collection_id = collection_id;
              notebookClick(collection_id, collection_name, userInfo)
            }
          }
        >
          <i className="book icon"></i>
          <div className="content">
            {collection_name}
          </div>
        </div>
      );
    })

    return (
      <div className={S.aside}>
        <div className="introduce">
          <div className="title">
            个人介绍
            <div className="ui divider hidden"></div>

            {
              isMe? (
                <div
                  className="ui button tiny basic right floated"
                  onClick = {editMe}
                >
                  <i className="icon write"></i>
                  编辑
                </div>
              ) : null
            }

            <div className="ui divider hidden"></div>

            {
              inEdit? (
                <form action="" className="ui form" >
                  <div className="field">
                    <textarea
                      value={editVal}
                      onChange = {editContent}
                    ></textarea>
                  </div>
                  <button className="ui positive button" type="subimt" >
                    提交
                  </button>
                  <button className="ui negative button" type="subimt" >
                    取消
                  </button>
                </form>
              ) : (
                <p>{user_intro}</p>
              )
            }
          </div>
        </div>

        <div className="ui divider hidden"></div>

        <div className={S.volume}>
          <div className={S.title}>
            我的文集
          </div>
          <div className="ui list">
            {nodebooks}
          </div>
        </div>

      </div>
    );
  }
}

Aside.propTypes = propTypes;
