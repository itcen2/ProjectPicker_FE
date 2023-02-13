import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken, getUserId } from '../../util/login-util';
import { BASE_URL, PP } from '../../../config/host-config';
import Header from '../../layout/Header';
import PostList from './PostList';

const PostSearch = () => {
    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const location = useLocation();
    const hashTags = location.state?.hashTag;
    const value = location.state?.value;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const headerInfo = {
      'content-type': 'application/json' 
      , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
    };

    

    useEffect(() =>{
        if(hashTags.length === 0){
            fetch(`${API_BASE_URL}/search/${value.replace('#','')}`, {
                method: 'GET',
                headers: headerInfo
            })
            .then(res => res.json())
            .then(result => {
                    setLoading(false);
                    setPosts(result.posts);
            });
            }else{
                fetch(`${API_BASE_URL}/hashsearch${hashTags[0].replace('#','/')}${hashTags[1] ? hashTags[1].replace('#','/') : ''}`, {
                method: 'GET',
                headers: headerInfo
            })
            .then(res => res.json())
            .then(result => {
                    setLoading(false);
                    setPosts(result.posts);
            });
        }
    },[]);
    const loadingPage = (
        <ul className="post-list-ul">
          <li className='post-list-li '>
            <span className='post-title-none' > 등록된 게시글이 없습니다.</span>
          </li>
          </ul>
      );
  return (
    <>
    <Header/>
    <p className='post-content-title'>{hashTags.length === 0 ? value : hashTags[0]+ (hashTags[1]? ', '+ hashTags[1] : '')} 검색된 프로젝트</p>
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

export default PostSearch;