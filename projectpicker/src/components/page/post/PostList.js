import React from 'react';
import PostItem from './PostItem';
import './css/PostList.css'

const PostList = ({posts}) => {
  return (
    <ul className="post-list-ul">
    {
        posts.map(post => 
        <PostItem 
        key={post.postId}
            posts={post} 
            />)
    }
</ul>
  );
};

export default PostList;