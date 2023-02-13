import React, { useState } from 'react';
import {Button, Container, Grid,
     TextField, Typography, Link} from "@mui/material";

import { BASE_URL, USER } from '../../../config/host-config';

const ModifyPw = () => {

    const API_BASE_URL = BASE_URL + USER;

   // 검증 메시지 저장 
   const [message, setMessage] = useState({
      password: '',
      passwordCheck: ''
   });  

   // 검증 완료 여부
   const [validate, setValidate] = useState({
      password: false,
      passwordCheck: false
   });

   // 입력값 저장
   const [userValue, setUserValue] = useState({
      password: '',
   });

  // 비밀번호 입력란 검증 체인지 이벤트 핸들러
  const passwordHandler = e => {

    // 패스워드 확인란을 비워버리기
    document.getElementById('password-check').value = '';
    document.getElementById('check-text').textContent = '';
    setValidate({
        ...validate,
        passwordCheck: false
    });
    
    const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    // 검증 시작
    let msg;
    if (!e.target.value) { // 패스워드 안적은거
        msg = '비밀번호는 필수값입니다!';
        setValidate({
            ...validate,
            password: false
        });
    } else if (!pwRegex.test(e.target.value)) {
        msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
        setValidate({
            ...validate,
            password: false
        });
    } else {
        msg = '사용 가능한 비밀번호입니다.';
        setValidate({
            ...validate,
            password: true
        });
    }
    setMessage({
        ...message,
        password: msg
    });
    setUserValue({
        ...userValue,
        password: e.target.value
    });
  };

  // 비밀번호확인 입력란 검증 체인지 이벤트 핸들러
  const passwordCheckHandler = e => {

    // 검증 시작
    let msg;
    if (!e.target.value) { // 패스워드 안적은거
        msg = '비밀번호 확인란은 필수값입니다!';
        setValidate({
            ...validate,
            passwordCheck: false
        });
    } else if (userValue.password !== e.target.value) {
        msg = '패스워드가 일치하지 않습니다.';
        setValidate({
            ...validate,
            passwordCheck: false
        });
    } else {
        msg = '패스워드가 일치합니다.';
        setValidate({
            ...validate,
            passwordCheck: true
        });
    }
    setMessage({
        ...message,
        passwordCheck: msg
    });
  };

  // validate객체 안의 모든 논리값이 true인지 검사하는 함수
  const isValid = () => {
    
    // of : 배열 반복, in : 객체 반복
    // 객체에서 key값만 뽑아줌 'username'
    for (let key in validate) {
        let value = validate[key];
        console.log(key + ': ' +value);
        if (!value) return false;
    }
    return true;
  };

  // 회원가입 요청 서버로 보내기
  const submitHandler = e => {
     e.preventDefault();

     // 입력값 검증을 올바르게 수행했는지 검사
     if (isValid()) {
        // alert('회원가입 이제 보낼게~~');

        fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userValue)
        })
        .then(res => {
            // 현재 비밀번호와 입력한 비밀번호가 다를때 
            if (res.status === 200) {
                alert('비밀번호를 수정했습니다.');
                // 로그인페이지로 리다이렉트
                window.location.href = '/login';
            }
            else {
                alert('비밀번호 수정에에 실패했습니다. 잠시 후 다시 시도하세요.');
            }
        });

     } else {
        alert('비밀번호를 다시 입력해 주세요');
     }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
        <form noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" textAlign="center">
                        비밀번호 변경
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="rowPassword"
                        label="현재 비밀번호"
                        type="password"
                        id="rowPassword"
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={passwordHandler}
                    />
                    <span style={
                        validate.password 
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>{message.password}</span>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password-check"
                        label="비밀번호 확인"
                        type="password"
                        id="password-check"
                        autoComplete="check-password"
                        onChange={passwordCheckHandler}
                    
                    />
                    <span id="check-text" style={
                        validate.passwordCheck
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>{message.passwordCheck}</span>
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" style={{background: 'primary'}}>
                        변경
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>
  );
};

export default ModifyPw;