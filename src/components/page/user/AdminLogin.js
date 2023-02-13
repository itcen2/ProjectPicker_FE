import React from "react";
import {Grid, Button, Container, Typography, TextField} from "@mui/material";

import { BASE_URL, ADMIN } from "../../../config/host-config";

const Login = () => {
    const API_BASE_URL = BASE_URL + ADMIN;
    
    const loginHandler = e => {
        e.preventDefault();

        // 이메일입력태그, 비번입력태그
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                adminEmail: $email.value,
                adminPassword: $password.value
            })
        })
        .then(res => res.json())
        .then(result => {
            //console.log(result);
            if (result.message) {
                // 로그인 실패
                alert("로그인 실패");
            } else {
                alert('로그인 성공!');

                localStorage.setItem('ACCESS_TOKEN', result.token);
                console.log(result);
                localStorage.setItem('LOGIN_USERNAME', result.userName);

                window.location.href='/admin';
            }
        });
    };



    return (
        <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
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
            </form>
        </Container>
    );
};

export default Login;