import React, { useState } from 'react';
import {MdCancel, MdCheck} from 'react-icons/md'
import cn from 'classnames';

import './css/PostItem.css'
import { Link } from 'react-router-dom';
const PostItem = ({key,posts}) => {
    const {postId, title, userEmail, userName, create} = posts;
    const tag = '/detail';
  return (
    <>
    <tr className='post-list-li '  >
        <Link className='post-list-link' to={tag} state={{ id: postId }}>
        <td className='post-allow' >모집중</td>
        <td  className='post-content'>{title}</td>
        <td className='post-title' rowSpan='2'>{userName}<br/>{'('+userEmail+')'}</td>
        </Link>
      </tr>
        <tr className='hashtag-box-list'>
          <td className={cn('post-hashTag-box',{true:(posts.hashTags.length>=1)})} ><Link to='/search' id='hashTag1' state={{ hashTag: ['#'+posts.hashTags[0]] }}>{posts.hashTags[0]}</Link></td>
          <td className={cn('post-hashTag-box',{true:(posts.hashTags.length==2)})} to='/search' ><Link to='/search'id='hashTag1'  state={{ hashTag: ['#'+posts.hashTags[1]] }}>{posts.hashTags[1]}</Link></td>
          <td className='create-date'></td>
        </tr>      
    </>
  );
};

export default PostItem;