import React from 'react';
import Quote from './quote/Quote';
import Header from '../layout/Header';
import PageIntro from './intro/PageIntro';
import './css/MainPage.css'
import PostMain from './post/PostMain';


const MainPage = () => {
  return (
    <>
        <Header/>
        <PageIntro/>
        <div className='page-main'>
          <Quote/>
          <PostMain/>
        </div>
    </>
  );
};

export default MainPage;