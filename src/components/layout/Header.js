import Button from '@mui/material/Button';
import './css/Header.css'
import React, {useState, useEffect} from 'react';
import {SlLogout, SlLogin} from 'react-icons/sl';
import {BiUser} from 'react-icons/bi';
import { getToken } from '../util/login-util';
import cn from 'classnames';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = () => {

    const [login, setLogin] = useState();
    const [hashTagInput, setHashTagInput] = useState();
    const token= getToken();
    const [count, setCount] = useState(0);
    const [hashTags, sethashTags] = useState([]);
    const [value, setValue] = useState('');


    const goMain = () => {
        window.location.href = "/"
    };

    const logOut = () => {
        window.location.href = "/"

        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LOGIN_USERNAME');
        localStorage.removeItem('LOGIN_USERID');
    };



    const onkeyup = e =>{
        if(e.keyCode === 16 && document.getElementById('search-box').value === '#'){
          if(count>=2){
            alert('해시태그 검색은 2개까지 가능합니다');
            document.getElementById('search-box').value = '';
          }else{
            setHashTagInput(true);
          }
        }
        if(count >=2){
          alert('해시태그만 검색 가능합니다');
          document.getElementById('search-box').value = '';
        }
        if(hashTagInput){
          if(e.keyCode === 13){
            setHashTagInput(false);
            if(count === 0){
              sethashTags([...hashTags, document.getElementById('search-box').value]);
              document.getElementById('hashTag1').innerText = document.getElementById('search-box').value;
            }else if (count === 1){
              sethashTags([...hashTags, document.getElementById('search-box').value]);
              document.getElementById('hashTag2').innerText = document.getElementById('search-box').value;
            }
            document.getElementById('search-box').value = '';
            setCount(count+1);
          }
        }
        if(!hashTagInput){
          console.log(value);
          setValue(document.getElementById('search-box').value);
        }
      };


    const cancleTag = e=> {
        if(e.target.id === 'hashTag1-cancle'){
          document.getElementById('hashTag1').innerText = hashTags[1];
          if(hashTags[1]){
            sethashTags([hashTags[1]]);
          }
          sethashTags([]);
        }else{
          sethashTags([hashTags[0]]);
        }
        setCount(count -1);
      };

    useEffect(() => {
        if(token !== null){
            setLogin(true);
        }
    },[]);

    return (
        <div className='header'>
            <div className='header-box'>
                <p className='project-title' onClick={goMain}>ProjectPicker</p>
                <div className={cn('hashTag-box',{true:(count>=1)})}><p id='hashTag1'/><MdCancel className='tag-cancle' id='hashTag1-cancle' onClick={cancleTag}/></div>
                <div className={cn('hashTag-box',{true:(count==2)})}><p id='hashTag2'/><MdCancel className='tag-cancle' id='hashTag2-cancle' onClick={cancleTag}/></div>
                <input id='search-box' className='search-box'type="text" placeholder='검색할 내용을 입력 해 주세요' onKeyUp={onkeyup}></input>
                <Button variant="contained"><Link className='link' to='/search' state={{ hashTag: hashTags, value : value }}>검색</Link></Button>
                {login ? (<div className='user'><Button href="/mypage"><BiUser className='icons'/></Button><Button className='icons'onClick={logOut}><SlLogout /></Button></div>): (<div className='user'><Button href="/login" className='icons'><SlLogin /></Button></div>)}
                {/* <Button href="/login">로그인</Button> */}
            </div>
        </div>
      );
    };

export default Header;