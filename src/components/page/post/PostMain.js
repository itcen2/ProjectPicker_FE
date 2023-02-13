import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import { BASE_URL, PM, PP } from '../../../config/host-config';

import { getToken } from '../../util/login-util';
import PostList from './PostList';

import './css/PostMain.css'
const PostMain = () => {

  const API_BASE_URL = BASE_URL + PP;
  const ACCESS_TOKEN = getToken();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const headerInfo = {
    'content-type': 'application/json' 
    , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };

  useEffect(() => {
    console.log(API_BASE_URL);

    fetch(API_BASE_URL+"/main", {
        method: 'GET',
        headers: headerInfo
    })
        .then(res => {
          if (res.status === 403) {
            alert('로그인이 필요한 서비스입니다!');
            // 리다이렉트
            window.location.href = '/login';
            return;
          } else if (res.status === 500) {
            alert('서버가 불안정합니다 ㅈㅅ');
            return;
          }
          return res.json();
        })
        .then(result => {
            setPosts(result.posts);
            // 로딩완료처리
            setLoading(false);
        });

  }, []);


  const loadingPage = (
    <ul className="post-list-ul">
      <li className='post-list-li '>
        <span className='post-title-none' > 등록된 게시글이 없습니다.</span>
      </li>
      </ul>
  );

  // 로딩완료시 보여줄 태그


  return (
    <>
    <p className='post-content-title'>등록된 프로젝트</p>
      <div className='post-table'>
        <div className='post-top'>
            <span className='post-top-title'>제목</span>
            <span className='post-top-content'>내용</span>
            <span className='post-top-allow'>상태</span>
        </div>
        <div className="post-list">
          {loading ? loadingPage:(<PostList posts = {posts} />)}
            
        </div>
      </div>
    </>
  );
};

export default PostMain;