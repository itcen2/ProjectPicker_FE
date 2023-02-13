import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import { BASE_URL, MAIN } from '../../../config/host-config';

import { getToken } from '../../util/login-util';
import PostList from './PostList';

import './css/AdminMain.css'
import AdminHeader from '../../layout/AdminHeader';
const AdminMain = () => {

  const API_BASE_URL = BASE_URL + MAIN;
  const ACCESS_TOKEN = getToken();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const headerInfo = {
    'content-type': 'application/json' 
    , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };
  const postsDone = (posts) =>{
    fetch(`${API_BASE_URL}/${posts.postId}`, {
        method: 'PUT',
        headers: headerInfo,
        body: JSON.stringify(posts)
    })
    .then(res => res.json())
    .then(result => {
        alert('수정 되었습니다.');
        setPosts(result);
    });
  };

  useEffect(() => {

    fetch(API_BASE_URL, {
        method: 'GET',
        headers: headerInfo
    })
        .then(res => {
          if (res.status === 403) {
            alert('로그인이 필요한 서비스입니다!');
            // 리다이렉트
            window.location.href = '/admin/login';
            return;
          } else if (res.status === 500) {
            alert('서버가 불안정합니다 ㅈㅅ');
            return;
          }
          return res.json();
        })
        .then(result => {
            setPosts(result);
            setLoading(true);
        });

  }, []);

  return (
    <>
    
      <AdminHeader/>
      <div className='post-box'>
        <p className='post-content-title'>등록된 게시물</p>
      <div className='post-table'>
        <div className='post-top'>
            <span className='post-top-title'>제목</span>
            <span className='post-top-content'>내용</span>
            <span className='post-top-allow'>허용</span>
        </div>
        <div className="post-list">
            <PostList posts = {posts} postsDone={postsDone}/>
        </div>
    </div>
    </div>
    </>
  );
};

export default AdminMain;