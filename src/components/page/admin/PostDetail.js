import React, {useState, useEffect}from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BASE_URL, MAIN, PP } from '../../../config/host-config';
import { getToken } from '../../util/login-util';
import {MdCancel, MdCheck} from 'react-icons/md'
import './css/PostDetail.css'

import cn from 'classnames';
import AdminHeader from '../../layout/AdminHeader';
import CommentsItem from '../post/CommentsItem';
import { Button } from '@mui/material';


const PostDetail = () => {
    const API_BASE_URL = BASE_URL;
    const ACCESS_TOKEN = getToken();
    const location = useLocation(); // 추가된 부분
    const id = location.state?.id;
    const headerInfo = {
      'content-type': 'application/json' 
      , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
    };
    const [postDetail, setPostDetail] = useState([]);
    const [comments, setComments] = useState([]);
    const [hashTags, setHashTags] = useState([]);

    useEffect(() =>{
      fetch(`${API_BASE_URL}${PP}/${id}`, {
        method: 'GET',
        headers: headerInfo
    })
    .then(res => res.json())
    .then(result => {
        setHashTags(result.hashTags);
        setPostDetail(result);
        setComments(result.comment);
        
    });
    },[]);

    const postsDone = () =>{
      fetch(`${API_BASE_URL}${MAIN}/${postDetail.postId}`, {
          method: 'PUT',
          headers: headerInfo,
          body: JSON.stringify(postDetail)
      })
      .then(res => res.json())
      .then(result => {
          alert('수정 되었습니다.');
          window.location.href='/admin'
      });
    };
    

  return (
    <>
        <AdminHeader/>

    <div className='content'>
      <h1 className='project-title'>프로젝트 내용</h1>
    <div className='content-box'>
      <h1 className='post-title'>{postDetail.title}</h1>
      <p>{postDetail.content}</p>
      <div className='detail-hashTag-box'>

        <Link className='hashTag-link' to='/search' state={{ hashTag: ['#'+hashTags[0]] }}>{hashTags[0]}</Link>
        <Link className='hashTag-link' to='/search' state={{ hashTag: ['#'+hashTags[1]] }}>{hashTags[1]}</Link>

      </div>
      <div className={cn('admin-post-allow', {true : postDetail.allow})}>{postDetail.allow ? (<MdCheck onClick={postsDone}/>):(<MdCancel onClick={postsDone}/>)}</div>
      <div className='post-set-box'>
        <Button variant="contained" className='post-set-button'>글 삭제</Button>
        <Button variant="contained" className='post-set-button'>글 수정</Button>
      </div>
    </div>
    </div>
    <h1 className='project-comment'>댓글</h1>
    <div className='comments-box'>
    <div className='comments'>{
      comments.map(comment => 
        <CommentsItem 
        key={comment.commentId}
        postId={postDetail.postId}
        setPostDetail = {setPostDetail}
        setComments = {setComments}
            comments={comment} 
            />)
      }
    </div>
    </div>
    </>
  );
};

export default PostDetail;