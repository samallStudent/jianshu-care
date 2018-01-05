import {Link} from 'react-router-dom';
import S from './style.scss';

export default function AuthorInfo({userInfo, initMyPage, history}) {

  let {user_id, user_name, avatar, user_intro, collection_id} = userInfo;

  return (
    <div className={S.author_info}>
      <Link
        to="/my_page"
        className={S.avatar}
        onClick = {
          ev=>{
            ev.stopPropagation();
            ev.preventDefault();
            userInfo.collection_name = null;
            history.push('/my_page',{userInfo});
            initMyPage(user_id, {user_id}, '所有文章')

          }
        }
      >
        <img
          src={avatar}
          alt=""
        />
      </Link>

      <div className={S.title}>
        <span
          className={S.name}
        >
          {user_name}
        </span>
      </div>

    </div>
  );
};
