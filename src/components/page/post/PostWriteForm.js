import { TextField } from '@mui/material';
import React,{useState} from 'react'
import { Button } from 'reactstrap';
import { BASE_URL, PP } from '../../../config/host-config';
import { getToken } from '../../util/login-util';

const PostWriteForm = ({post, modify}) => {

    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const headerInfo = {
        'content-type': 'application/json' 
        , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
      };
      const [postDetail, setPostDetail] = useState(post);
    console.log(postDetail);
    const modifyPost = () => {
        setPostDetail({...postDetail, title : document.getElementById('title').value, content:document.getElementById('content').value})
        fetch(`${API_BASE_URL}/${postDetail.postId}`, {
            method: 'PUT',
            headers: headerInfo,
            body: JSON.stringify(postDetail)
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
          alert('수정 되었습니다');
          window.location.href='/';
        });
      };

      const createPost = () =>{
        console.log(document.getElementById('title').value);
        fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: headerInfo,
            body: JSON.stringify({title : document.getElementById('title').value, content:document.getElementById('content').value, hashTags:[]})
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
          alert('작성이 완료 되었습니다. 관리자 승인 후 게시글을 볼 수 있습니다.');
          window.location.href='/';
        });
      };

  return (
    <div className='writer-box'>
        <span className='page-title'>프로젝트 모집</span>
        <div className='writer-title-box'>
            <span className='writer-title-text'>제목</span>
            <TextField id="title" placeholder='제목을 입력 해 주세요' defaultValue={modify? postDetail.title:''} variant="outlined" className='writer-title-input' />
        </div>
        <div className='writer-content-box'>
            <span className='writer-content-text'>내용</span>
            <TextField id="content" rows={30} placeholder='내용을 입력 해 주세요' defaultValue = {modify? postDetail.content:''} multiline variant="outlined" className='writer-content-input' />
        </div>
        <div className='writer-hashtag-box'>
            <span className='writer-hashtag-text'>해시태그</span>
            <TextField id="hashTags" placeholder='해시태그를 입력 해 주세요' defaultValue = {modify? postDetail.hashTags:''} variant="outlined" className='writer-hashTag-input' />
        </div>
        <Button variant="contained" className='commnet-submit-button' onClick={modify? modifyPost:createPost} >공고 올리기</Button>
    </div>
  )
}

export default PostWriteForm