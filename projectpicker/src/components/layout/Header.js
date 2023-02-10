import Button from '@mui/material/Button';
import './css/Header.css'
import React, {useState, useEffect} from 'react';
import {SlLogout, SlLogin} from 'react-icons/sl';
import {BiUser} from 'react-icons/bi';
import { getToken } from '../util/login-util';

const Header = () => {

  const [login, setLogin] = useState();
  const token= getToken();

  const goMain = () =>{
    window.location.href ="/"
  };
  const logOut = () => {
    window.location.href ="/"

    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('LOGIN_USERNAME');
  };
useEffect(() => {
  if(token !== null){
    setLogin(true);
  }
  }, []);
  return (
    <div className='header'>
        <div className='header-box'>
            <p className='project-title' onClick={goMain}>ProjectPicker</p>
            <input className='search-box'type="text" placeholder='검색할 내용을 입력 해 주세요'/>
            <Button variant="contained" href="/search">검색</Button>
            {login ? (<div className='user'><Button href="/login"><BiUser className='icons'/></Button><Button className='icons'onClick={logOut}><SlLogout /></Button></div>): (<div className='user'><Button href="/login" className='icons'><SlLogin /></Button></div>)}
            {/* <Button href="/login">로그인</Button> */}
        </div>
    </div>
  );
};

export default Header;