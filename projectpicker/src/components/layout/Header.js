import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {SlLogout, SlLogin} from 'react-icons/sl';
import {BiUser} from 'react-icons/bi';
import { getToken } from '../util/login-util';
import './css/Header.css'

const Header = () => {

    const[login,setLogin] = useState();
    const token = getToken();


    const goMain = () => {
        window.location.href = "/"
    };

    const logOut = () => {
        window.location.href = "/"

        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LOGIN_USERNAME');
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
            <input className='search-box' type="text" placeholder='검색할 내용을 입력 해 주세요'></input>
            <Button variant = "contained" href="/search">검색</Button>
            
            {login ? ( 
            <div className='user'>
                <Button href="/mypage" className='icons'> <BiUser /> </Button>
                <Button onClick={logOut} className='icons'><SlLogout /></Button>
            </div>
            ):
            (<div className='user'>
                <Button href='/login' className='icons' title='로그인'> <SlLogin /> </Button>
            </div>) 
            }

        </div>
    </div>
    );
};

export default Header;