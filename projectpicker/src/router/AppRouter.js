import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../components/page/MainPage';
import PostDetail from '../components/page/post/PostDetail';
import Join from '../components/page/user/Join';
import Login from '../components/page/user/Login';


const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
        </Routes>
    </>
  );
};

export default AppRouter;