import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken, getUserId } from '../../util/login-util';
import { BASE_URL, PAGE, PP } from '../../../config/host-config';
import Header from '../../layout/Header';
import PostList from './PostList';
import PageInfo from './PageInfo';

const PostSearch = () => {
    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const location = useLocation();
    const hashTags = location.state?.hashTag;
    const value = location.state?.value;
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const headerInfo = {
      'content-type': 'application/json' 
      , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
    };

    

    useEffect(() =>{
      setLoading(true);
      setPageInfo('');
      setPosts([]);
        if(hashTags.length === 0){
            fetch(`${API_BASE_URL}/search/${value.replace('#','')}${PAGE}/${page}`, {
                method: 'GET',
                headers: headerInfo
            })
            .then(res => res.json())
            .then(result => {
              setPageInfo(result.pageInfo);
                    setLoading(false);
                    setPosts(result.posts);
            });
        }else{
          fetch(`${API_BASE_URL}/hashsearch${hashTags[0].replace('#','/')}${hashTags[1] ? hashTags[1].replace('#','/') : ''}${PAGE}/${page}`, {
          method: 'GET',
          headers: headerInfo
      })
      .then(res => res.json())
      .then(result => {
        setPageInfo(result.pageInfo);
              setLoading(false);
              setPosts(result.posts);
      });
    }
    },[page, hashTags, value]);
    const loadingPage = (
      <tbody className="post-list-ul">
      <tr className='post-list-li '>
        <td className='post-title-none' > 등록된 게시글이 없습니다.</td>
      </tr>
    </tbody>
      );
  return (
    <>
    <Header/>
    <p className='post-content-title'>{hashTags.length === 0 ? value : hashTags[0]+ (hashTags[1]? ', '+ hashTags[1] : '')} 검색된 프로젝트</p>
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
    </>
  );
};

export default PostSearch;