import React from "react";
import {Grid, Button, Container, Typography, TextField, Link} from "@mui/material";
import './css/User.css'
import user from '../../../img/user.png'


import { BASE_URL, USER } from "../../../config/host-config";

const Login = () => {
    const API_BASE_URL = BASE_URL + USER;

    const goMain = () =>{
        window.location.href ="/"
      };
    
    const loginHandler = e => {
        e.preventDefault();

        // 이메일입력태그, 비번입력태그
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.message) {
                // 로그인 실패
                alert('로그인 정보가 일치하지 않습니다.');
            } else {
                alert('로그인에 성공하였습니다.');

                // 발급받은 토큰을 저장, 회원정보 저장
                // 브라우저가 제공 로컬스토리지(브라우저가 종료되어도 남아있음)
                // 세션스토리지(브라우저종료되면 사라짐)
                localStorage.setItem('ACCESS_TOKEN', result.token);
                localStorage.setItem('LOGIN_USERNAME', result.userName);

                window.location.href='/';
            }
        });
    };

    return (
        <>
        <div className="user">
        <Container className="container" component="main" maxWidth="xs" style={{ margin: "100px auto" }}>
        <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography className='auth_title' component="h1" variant="h2" onClick={goMain} textAlign="center" marginBottom="50px">
                        ProjectPicker
                    </Typography>
                </Grid>
                <Grid item xs={12} className='logo'>
                    <img src={user} alt='user_log' width={'50px'} height={'50px'}/>
                </Grid>
        </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" textAlign="center" marginBottom="15px">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={loginHandler}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                    </Grid>
                    <Grid item textAlign="center">
                    <Link href="/join" variant="body2">
                        계정이 없으십니까? 회원가입 하세요.
                    </Link>
                </Grid>
            </form>
        </Container>
        </div>
    </>
        
    );
};

export default Login;