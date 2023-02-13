import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL, PP } from '../../../config/host-config';
import Header from '../../layout/Header';
import { getToken } from '../../util/login-util';
import './css/PostWrite.css'
const PostWrite = () => {
    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const location = useLocation(); 
    const id = location.state?.id;
    const [postDetail, setPostDetail] = useState({});
    const [modify, setModify] = useState(true);
    const headerInfo = {
        'content-type': 'application/json' 
        , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
      };

      const modifyPost = () => {
        setPostDetail({...postDetail, title : document.getElementById('title').value, content:document.getElementById('content').value})
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: headerInfo,
            body: JSON.stringify({title : document.getElementById('title').value, content:document.getElementById('content').value, hashTags:[], status:false})
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
          alert('수정 되었습니다');
          window.location.href='/';
        });
      };

      const createPost = () =>{
        console.log(document.getElementById('title').value);
        fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: headerInfo,
            body: JSON.stringify({title : document.getElementById('title').value, content:document.getElementById('content').value, hashTags:[]})
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
          alert('작성이 완료 되었습니다. 관리자 승인 후 게시글을 볼 수 있습니다.');
          window.location.href='/';
        });
      };


    useEffect(() =>{
        if (id){
            fetch(`${API_BASE_URL}/${id}`, {
                method: 'GET',
                headers: headerInfo
            })
            .then(res => {
              if (res.status === 403) {
              alert('로그인이 필요한 서비스입니다!');
              // 리다이렉트
              window.history.back();
              return;
            } else if (res.status === 500) {
                window.history.back();
              alert('서버오류');
              return;
            }
            return res.json();
          })
          .then(result => {
            setPostDetail(result);
            document.getElementById('title').defaultValue = result.title;
            document.getElementById('content').defaultValue = result.content;
            document.getElementById('hashTags').defaultValue = result.title;
            
            });
        }else{
            setModify(false);
        }
    },[]);
  return (
    <>
    <Header/>
    <div className='writer-box'>
        <span className='page-title'>프로젝트 모집</span>
        <div className='writer-title-box'>
            <span className='writer-title-text'>제목</span>
            <TextField id="title" placeholder='제목을 입력 해 주세요' variant="outlined" className='writer-title-input' />
        </div>
        <div className='writer-content-box'>
            <span className='writer-content-text'>내용</span>
            <TextField id="content" rows={20} placeholder='내용을 입력 해 주세요' multiline variant="outlined" className='writer-content-input' />
        </div>
        <div className='writer-hashtag-box'>
            <span className='writer-hashtag-text'>해시태그</span>
            <TextField id="hashTags" placeholder='해시태그를 입력 해 주세요' variant="outlined" className='writer-hashTag-input' />
        </div>
        <Button variant="contained" className='commnet-submit-button' onClick={modify? modifyPost:createPost} >공고 올리기</Button>
    </div>
    </>
  );
};

export default PostWrite;