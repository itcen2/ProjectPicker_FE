import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL, PP } from '../../../config/host-config';
import Header from '../../layout/Header';
import { getToken } from '../../util/login-util';
import { MdCancel } from 'react-icons/md';
import './css/PostWrite.css'
import cn from 'classnames';


const PostWrite = () => {
    const API_BASE_URL = BASE_URL + PP;
    const ACCESS_TOKEN = getToken();
    const location = useLocation(); 
    const id = location.state?.id;
    const [count, setCount] = useState(0);
    const [postDetail, setPostDetail] = useState({});
    const [modify, setModify] = useState(true);
    const [detailHashTags, setdetailHashTags] = useState([]);
    const [hashTagInput, setHashTagInput] = useState();

    const headerInfo = {
        'content-type': 'application/json' 
        , 'Authorization': 'Bearer ' + ACCESS_TOKEN 
      };

      const modifyPost = () => {
        setPostDetail({...postDetail, title : document.getElementById('title').value, content:document.getElementById('content').value})
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: headerInfo,
            body: JSON.stringify({title : document.getElementById('title').value, content:document.getElementById('content').value, hashTags:detailHashTags, status:false})
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

      const onkeyup = e =>{
        if(count >=2){
          alert('최대 2개까지 입력 가능합니다.');
          e.target.value = '';
        }
          if(e.keyCode === 13){
            setHashTagInput(false);
            if(count === 0){
              setdetailHashTags([...detailHashTags, document.getElementById('hashTags').value]);
              document.getElementById('detail-hashTag1').innerText = document.getElementById('hashTags').value
            }else if (count === 1){
              setdetailHashTags([...detailHashTags, document.getElementById('hashTags').value]);
              document.getElementById('detail-hashTag2').innerText = document.getElementById('hashTags').value;
            }
            e.target.value = '';
            setCount(count+1);
          }
      };
    const cancleTag = e=> {
      if(e.target.id === 'detail-hashTag1-cancle'){
        document.getElementById('detail-hashTag1').innerText = detailHashTags[1];
        if(detailHashTags[1]){
          setdetailHashTags([detailHashTags[1]]);
        }
        setdetailHashTags([]);
      }else{
        setdetailHashTags([detailHashTags[0]]);
      }
      setCount(count -1);
    };



      const createPost = () =>{
        console.log(document.getElementById('title').value);
        fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: headerInfo,
            body: JSON.stringify({title : document.getElementById('title').value, content:document.getElementById('content').value, hashTags:detailHashTags})
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


    useEffect(() =>{
        if (id){
            fetch(`${API_BASE_URL}/${id}`, {
                method: 'GET',
                headers: headerInfo
            })
            .then(res => {
              if (res.status === 403) {
              alert('로그인이 필요한 서비스입니다!');
              // 리다이렉트
              window.history.back();
              return;
            } else if (res.status === 500) {
                window.history.back();
              alert('서버오류');
              return;
            }
            return res.json();
          })
          .then(result => {
            setPostDetail(result);
            document.getElementById('title').defaultValue = result.title;
            document.getElementById('content').defaultValue = result.content;

            setCount(result.hashTags.length);
            setdetailHashTags(result.hashTags);
            document.getElementById('detail-hashTag1').innerText = result.hashTags[0];
            document.getElementById('detail-hashTag2').innerText = result.hashTags[1];

            });
        }else{
            setModify(false);
        }
    },[]);
  return (
    <>
    <Header/>
    <div className='writer-box'>
        <span className='page-title'>프로젝트 모집</span>
        <div className='writer-title-box'>
            <span className='writer-title-text'>제목</span>
            <input type='text' id="title" placeholder='제목을 입력 해 주세요' className='writer-title-input' />
        </div>
        <div className='writer-content-box'>
            <span className='writer-content-text'>내용</span>
            <TextField id="content" rows={20} placeholder='내용을 입력 해 주세요' multiline variant="outlined" className='writer-content-input' />
        </div>
        <div className='writer-hashtag-box'>
            <span className='writer-hashtag-text'>해시태그</span>
            <input type='text' id="hashTags" placeholder='해시태그를 입력 해 주세요' onKeyUp={onkeyup}  className='writer-hashTag-input' />
        </div>
        <div>
            <div className={cn('hashTag-box',{true:(count>=1)})}><p id='detail-hashTag1'/><MdCancel className='tag-cancle' id='detail-hashTag1-cancle' onClick={cancleTag}/></div>
            <div className={cn('hashTag-box',{true:(count==2)})}><p id='detail-hashTag2'/><MdCancel className='tag-cancle' id='detail-hashTag2-cancle' onClick={cancleTag}/></div>
        </div>
        <Button variant="contained" className='commnet-submit-button' onClick={modify? modifyPost:createPost} >공고 올리기</Button>
    </div>
    </>
  );
};

export default PostWrite;