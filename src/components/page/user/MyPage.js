import React,{useEffect, useState} from 'react';
import { BASE_URL, USER } from '../../../config/host-config';
import Header from '../../layout/Header';
import { getToken, getUserId} from '../../util/login-util';
import UserInfo from './UserInfo';

const MyPage = () => {
    const API_BASE_URL = BASE_URL + USER;
    const ACCESS_TOKEN = getToken();
    const [myData, setMyData] = useState('');
    const [posts, setPost] = useState([]);
    const headerInfo = {
        'content-type': 'application/json' 
        , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
      };

    useEffect(() => {

        fetch(`${API_BASE_URL}/myPage`, {
            method: 'POST',
            headers: headerInfo,
            body: JSON.stringify({userId:getUserId()})
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
                setMyData(result);
                setPost(result.posts);
                console.log(result);
            });

    },[]);

  return (
    <>
    <Header/>
    <UserInfo myData={myData} posts={posts}/>
    </>
  );
};

export default MyPage;