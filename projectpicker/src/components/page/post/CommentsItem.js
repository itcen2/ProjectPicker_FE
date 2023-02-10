import React from 'react';

const CommentsItem = ({comments}) => {
  return (
    <>
        <div className='comment-box'>
            {comments}
            </div>
    </>
  );
};

export default CommentsItem;