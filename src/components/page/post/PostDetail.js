import React, {useState, useEffect}from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BASE_URL, PP } from '../../../config/host-config';
import { getToken, getUserId } from '../../util/login-util';
import {MdCancel, MdCheck} from 'react-icons/md'
import './css/PostDetail.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import cn from 'classnames';
import CommentsItem from './CommentsItem';
import Header from '../../layout/Header';


const PostDetail = () => {
    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const location = useLocation();
    const id = location.state?.id;
    const headerInfo = {
      'content-type': 'application/json' 
      , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
    };
    const [postDetail, setPostDetail] = useState([]);
    const [comments, setComments] = useState([]);
    const [hashTags, setHashTags] = useState([]);
    const [userIdCheck , setUserIdCheck] = useState();

    useEffect(() =>{

      fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: headerInfo
    })
    .then(res => res.json())
    .then(result => {
        setPostDetail(result);
        setHashTags(result.hashTags);
        setComments(result.comment);
        if(result.userId === getUserId()){
          setUserIdCheck(true);
        }
    });
    },[]);
    
    const commentPost = e => {
      e.preventDefault();
        if(document.getElementById('comment').value){
            sendComment(document.getElementById('comment').value);
        }else{
          alert("댓글을 입력 해 주세요");
        }
    };

    const deletePost = () => {
      fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: headerInfo
    })
    .then(res => {
      if (res.status === 403) {
      alert('로그인이 필요한 서비스입니다!');
      // 리다이렉트
      return;
    } else if (res.status === 500) {
      alert('서버오류');
      return;
    }else if(res.status === 200){
      alert('삭제 완료');
      window.location.href = '/';

    }
    return res.json();
  });
    };


    const sendComment = (comment) => {
      fetch(`${API_BASE_URL}/${id}/comments`, {
        method: 'POST',
        headers: headerInfo,
        body: JSON.stringify({'comment':comment})
    })
    .then(res => {
      if (res.status === 403) {
      alert('로그인이 필요한 서비스입니다!');
      // 리다이렉트
      window.location.href = '/login';
      return;
    } else if (res.status === 500) {
      alert('서버오류');
      return;
    }
    return res.json();
  })
    .then(result => {
      setPostDetail(result);
        setComments(result.comment);
        document.getElementById('comment').value = '';

    });
    };

    const enterCheck = e =>{
      if(e.keyCode === 13){
        document.getElementById('commnet-submit-button').click();
      }
    };
  return (
    <>
    <Header/>
    <div className='content'>
      <h1 className='project-title'>프로젝트 내용</h1>
    <div className='content-box'>
      <div className='detail-hashTag-box'>
      <Link className={cn('hashTag-link', {true:hashTags.length>=1})} to='/search' state={{ hashTag: ['#'+hashTags[0]] }}>{hashTags[0]}</Link>
      <Link className={cn('hashTag-link', {true:hashTags.length===2})} to='/search' state={{ hashTag: ['#'+hashTags[1]] }}>{hashTags[1]}</Link>
      </div>
      <h1 className='post-title'>{postDetail.title}</h1>
      <p>{postDetail.content}</p>
      
      {userIdCheck ?(<div className='post-set-box'>
        <Button variant="contained" className='post-set-button' onClick={deletePost}>글 삭제</Button>
        <Button variant="contained" className='post-set-button'><Link className='link' to='/write' state={{ id: id }}>글 수정</Link></Button>
      </div>) :''}
      </div>

    
    <h1 className='project-comment'>댓글</h1>
    <div className='comments-box'>
    <div className='comments-input'>
      <TextField id="comment" label="댓글 입력" variant="outlined" onKeyUp={enterCheck}/>
      <Button variant="contained" className='commnet-submit-button' id='commnet-submit-button' onClick={commentPost}>전송</Button>
    </div>
    <div className='comments'>{
      comments.map(comment => 
        <CommentsItem 
        key={comment.commentId}
        setPostDetail = {setPostDetail}
        setComments = {setComments}
        postId={postDetail.postId}
            comments={comment} 
            />)
      }
    </div>
    </div>
    </div>
    </>
  );
};

export default PostDetail;