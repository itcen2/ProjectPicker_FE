import React from 'react';
import PostItem from './PostItem';


const PostList = ({posts, postsDone}) => {
  return (
    <tbody className="post-list-ul">
    {
        posts.map(post => 
        <PostItem 
        key={post.postId}
            posts={post} 
            postsDone = {postsDone}
            />)
    }
  </tbody>
  );
};

export default PostList;