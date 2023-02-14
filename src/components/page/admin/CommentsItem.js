import React, {useState} from 'react';

import { IconButton,MenuItem,Menu } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BASE_URL, PP } from '../../../config/host-config';
import { getToken, getUserId } from '../../util/login-util';
const options = [
  '수정',
  '삭제'
];

const ITEM_HEIGHT = 48;

const CommentsItem = ({comments, postId, setPostDetail, setComments}) => {
  const {comment, commentId, modifyAt, userEmail, userName, userId} = comments;

  const API_BASE_URL = BASE_URL + PP;
  const ACCESS_TOKEN = getToken();
  const headerInfo = {
    'content-type': 'application/json' 
    , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [modify, setModify] = useState();
  const [checkUserId, setCheckUserId] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if(e.target.innerText === '수정'){
      if(modify){
        modifyComment(document.getElementById('comment-modify').value);
        setModify(false);
      }else{
        setModify(true);
      }
    }else if(e.target.innerText === '삭제'){
      deleteComment();
    }
  };

  const modifyComment = (commentValue) =>{
    fetch(`${API_BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: headerInfo,
      body: JSON.stringify({'comment':commentValue})
  })
  .then(res => {
    if (res.status === 403) {
    alert('로그인이 필요한 서비스입니다!');
    // 리다이렉트
    window.location.href = '/login';
    return;
  } else if (res.status === 500) {
    alert('서버오류');
    return;
  }
  return res.json();
})
  .then(result => {
    setPostDetail(result);
    setComments(result.comment);

  });
  };

  const deleteComment = () => {
    fetch(`${API_BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: headerInfo
  })
  .then(res => {
    if (res.status === 403) {
    alert('로그인이 필요한 서비스입니다!');
    // 리다이렉트
    window.location.href = '/login';
    return;
  } else if (res.status === 500) {
    alert('서버오류');
    return;
  }
  return res.json();
})
  .then(result => {
    setPostDetail(result);
    setComments(result.comment);
  });
  };

  const tag = 
    (
<div >
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
    );

    const checkUser = () => {
        return tag;
    }

  return (
    <>
        <div className='comment-box'>
          <div className='comment-info'>
            {modify ? 
            (<div className='comments-input'>
      <TextField id="comment-modify" label="댓글 수정" variant="outlined" defaultValue={comment}/>
      <Button variant="contained" className='commnet-submit-button' onClick={handleClose} >수정</Button>
    </div>) 
    :
    (<>
    <span className='comment'>{comment}</span>
      {checkUser()}
    </>) }
         

          
          </div>
          
          <br/>
          <div className='info-box'>
            <span className='user-info'>{userName+'('+userEmail+')'}</span>
            <span className='date'>{modifyAt}</span>
            </div>
            
            </div>
    </>
  );
};

export default CommentsItem;