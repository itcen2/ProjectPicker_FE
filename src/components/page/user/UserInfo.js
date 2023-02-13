import React, { useState } from 'react';
import PostItem from '../post/PostItem';

import '../css/MyPage.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BASE_URL, USER } from '../../../config/host-config';
const UserInfo = ({myData,posts}) => {
    const API_BASE_URL = BASE_URL + USER;
    console.log(myData);
    const {email, joinDate, userName, userId} = myData;


    const loadingPage = (
        <ul className="post-list-ul">
          <li className='post-list-li '>
            <span className='post-title-none' > 등록된 게시글이 없습니다.</span>
          </li>
          </ul>
      );
        
      const signOutUser = () => {
        fetch(`${API_BASE_URL}/signout/${userId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert('회원탈퇴 되었습니다.');
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('LOGIN_USERNAME');
                localStorage.removeItem('LOGIN_USERID');
                // 로그인페이지로 리다이렉트
                window.location.href = '/';
            } else {
                alert('회원탈퇴에 실패했습니다. 잠시 후 다시 시도하세요.');
            }
        });
      };

  return (
    <>
    <p className='mypage-title'>회원 정보</p>
    <div className='user-info-box'>
        <div className='user-profile'/>
        <div className='line'/>
        <table>
            <tbody>
                <tr>
                    <td className='left-table'><span>이메일 : </span></td>
                    <td className='right-table'><span>{email}</span></td>
                </tr>
                <tr>
                    <td className='left-table'><span>이름 : </span></td>
                    <td className='right-table'><span>{userName}</span></td>
                </tr>
                <tr>
                    <td className='left-table'><span>가입 일자 : </span></td>
                    <td className='right-table'><span> {joinDate}</span></td>
                </tr>
            </tbody>
        </table>
        <div className='line'/>
            <div className='user-post-box'>
                <span>{userName}님이 작성하신 </span><br/><span>게시물은 {posts.length}개 입니다.</span>
            </div>
        <div className='line'/>
            <div className='user-set-box'>
                <Button variant="outlined" className='user-set-button'><Link className='link-text-blue' to='/modifyPw' state={{ myData: myData }}>비밀번호 수정</Link></Button>
                <Button variant="outlined" href="/search" className='user-set-button' onClick={signOutUser}>회원 탈퇴</Button>
            </div>
        </div>
        <div className='mypage-post-box'>
        <p className='mypage-title'>내가 작성한 글</p>
        <div className='post-table'>
        <div className='post-top'>
            <span className='post-top-title'>제목</span>
            <span className='post-top-content'>내용</span>
            <span className='post-top-allow'>상태</span>
        </div>
        <div className="post-list">
          {!!posts.length ? (posts.map(post => <PostItem key={post.postId} posts={post} />)): loadingPage}
        </div>
      </div>
        <ul className="post-list-ul">
    {
        
    }
        </ul>
        </div>
    </>
  );
};

export default UserInfo;