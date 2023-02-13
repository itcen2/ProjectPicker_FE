import React, {useState, useEffect}from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_URL, PP } from '../../../config/host-config';
import { getToken } from '../../util/login-util';
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
    const location = useLocation(); // 추가된 부분
    const id = location.state?.id;
    const headerInfo = {
      'content-type': 'application/json' 
      , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
    };
    const [postDetail, setPostDetail] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() =>{

      fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: headerInfo
    })
    .then(res => res.json())
    .then(result => {
        setPostDetail(result);
        setComments(result.comment);
    });
    },[]);
    
    const commentPost = e => {
      e.preventDefault();
      
        const comment = document.getElementById('comment').value;
        if(comment !== ''){
          sendComment(document.getElementById('comment').value);
        }else{
          alert("댓글을 입력 해 주세요.");
        } 
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

  return (
    <>
    <Header/>
    <div className='content'>
      <h1 className='project-title'>프로젝트 내용</h1>
    <div className='content-box'>
      <h1 className='post-title'>{postDetail.title}</h1>
      <p>{postDetail.content}</p>
    </div>
    </div>
    <h1 className='project-comment'>댓글</h1>
    <div className='comments-box'>
    <div className='comments-input'>
      <TextField id="comment" label="댓글 입력" variant="outlined" />
      <Button variant="contained" className='commnet-submit-button' onClick={commentPost}>전송</Button>
    </div>
    <div className='comments'>{
      comments.map(comment => 
        <CommentsItem 
        // key={comment}
            comments={comment} 
            />)
      }
    </div>
    </div>
    </>
  );
};

export default PostDetail;