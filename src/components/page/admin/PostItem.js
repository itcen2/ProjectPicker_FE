import React, { useState } from 'react';
import {MdCancel, MdCheck} from 'react-icons/md'
import cn from 'classnames';

import './css/PostItem.css'
import { Link } from 'react-router-dom';
const PostItem = ({posts, postsDone}) => {
    const {postId, postTitle, postContent, allow} = posts;
    const postDone = () =>{
        postsDone(posts);
    };
  
  return (
    <li className='post-list-li ' >
        <Link className='admin-post-list-link' to='/admin/detail' state={{ id: postId }}>
        <span className='admin-post-title' >{postTitle}</span>
        <span className='admin-post-content' >{postContent}</span>
        </Link>
        <div className={cn('admin-post-allow', {true : allow})}>{allow ? (<MdCheck onClick={postDone}/>):(<MdCancel onClick={postDone}/>)}</div>
    </li>
  );
};

export default PostItem;