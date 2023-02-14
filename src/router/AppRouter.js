import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../components/page/MainPage';
import PostDetail from '../components/page/post/PostDetail';
import AdminPostDetail from '../components/page/admin/PostDetail';
import Join from '../components/page/user/Join';
import Login from '../components/page/user/Login';
import AdminMain from '../components/page/admin/AdminMain';
import AdminLogin from '../components/page/user/AdminLogin';
import MyPage from '../components/page/user/MyPage';
import PostWrite from '../components/page/post/PostWrite';
import ModifyPw from '../components/page/user/ModifyPw';
import PostSearch from '../components/page/post/PostSearch';


const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} /> 
            <Route path="/admin" element={<AdminMain />} /> 
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/detail" element={<AdminPostDetail/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/write" element={<PostWrite/>}/>
            <Route path="/modifyPw" element={<ModifyPw/>}/>
            <Route path="/search" element={<PostSearch/>}/>
        </Routes>
    </>
  );
};

export default AppRouter;