import React, { useState } from 'react';
import {MdCancel, MdCheck} from 'react-icons/md'
import cn from 'classnames';

import './css/PostItem.css'
import { Link } from 'react-router-dom';
const PostItem = ({key,posts}) => {
    const {postId, title, userEmail, userName} = posts;
    console.log(posts.hashTags.length);
    const tag = '/detail';
  return (
    <li className='post-list-li ' key={key} >
        <Link className='post-list-link' to={tag} state={{ id: postId }}>
        <span className='post-allow' >모집중</span>
        <span className='post-content' >{title}</span>
        <div className='post-title'>{userName}<br/>{'('+userEmail+')'}</div>
        </Link>
        <div className='hashtag-box-list'>
          <div className={cn('hashTag-box',{true:(posts.hashTags.length>=1)})}><p id='hashTag1'/>{posts.hashTags[0]}</div>
          <div className={cn('hashTag-box',{true:(posts.hashTags.length==2)})}><p id='hashTag2'/>{posts.hashTags[1]}</div>
        </div>
        
    </li>
  );
};

export default PostItem;