import React, { useState } from 'react';
import {MdCancel, MdCheck} from 'react-icons/md'
import cn from 'classnames';

import './css/PostItem.css'
import { Link } from 'react-router-dom';
const PostItem = ({key,posts}) => {
    const {postId, title, content} = posts;
    const tag = '/detail';
  return (
    <li className='post-list-li ' key={key} >
        <Link className='post-list-link' to={tag} state={{ id: postId }}>
        <span className='post-title' >{title}</span>
        <span className='post-content' >{content}</span>
        <div className='post-allow'>모집중</div>
        </Link>
    </li>
  );
};

export default PostItem;