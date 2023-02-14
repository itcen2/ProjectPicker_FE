import React, { useState } from 'react';
import {MdCancel, MdCheck} from 'react-icons/md'
import cn from 'classnames';

import './css/PostItem.css'
import { Link } from 'react-router-dom';
const PostItem = ({posts, postsDone}) => {
    const {postId, postTitle, allow, userName, userEmail, hashTags} = posts;
    const postDone = () =>{
        postsDone(posts);
    };
  
  return (
    <>
    <tr className='admin-post-list-li '  >
        <td className={cn('admin-post-allow', {true : allow})}>{allow ? (<MdCheck onClick={postDone}/>):(<MdCancel onClick={postDone}/>)}</td>
        <Link className='admin-post-list-link' to='/admin/detail' state={{ id: postId }}>
        <td  className='admin-post-content'>{postTitle}</td>
        <td className='admin-post-title'>{userName}<br/>{'('+userEmail+')'}</td>
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