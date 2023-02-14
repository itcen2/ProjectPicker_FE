import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import { BASE_URL, PM, PP, PAGE } from '../../../config/host-config';

import { getToken } from '../../util/login-util';
import PostList from './PostList';

import './css/PostMain.css'
import { Button } from '@mui/material';
import PageInfo from './PageInfo';
const PostMain = () => {

  const API_BASE_URL = BASE_URL + PP;
  const ACCESS_TOKEN = getToken();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hashTags, sethashTags] = useState([]);
  const [pageInfo, setPageInfo] = useState('');
  const [page, setPage] = useState(1);
  // const [currentPage, setPage] = useState(1);
  const headerInfo = {
    'content-type': 'application/json' 
    , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };

  useEffect(() => {

    fetch(`${API_BASE_URL}${PAGE}/${page}`, {
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
            setPageInfo(result.pageInfo)
            setPosts(result.posts);
            // 로딩완료처리
            setLoading(false);
        });

  }, [page]);


  const loadingPage = (
    <tbody className="post-list-ul">
      <tr className='post-list-li '>
        <td className='post-title-none' > 등록된 게시글이 없습니다.</td>
      </tr>
    </tbody>
  );

  // 로딩완료시 보여줄 태그


  return (
    <>
    <p className='post-content-title'>등록된 프로젝트</p>
    <table className='post-table'>
      <thead >
        <tr className='post-top'>
          <th className='post-top-title'>상태</th>
          <th className='post-top-content'>제목</th>
          <th className='post-top-allow'>작성자</th>
        </tr>
      </thead>
        {loading ? loadingPage:(<PostList posts = {posts} hashTags = {hashTags}/>)}
        <PageInfo pageInfo={pageInfo} setPage={setPage} page={page}/>
        <tfoot></tfoot>
    </table>
      <Button variant="contained" className='post-write-button' href='/write' >모집 글 작성하기</Button>
    </>
  );
};

export default PostMain;