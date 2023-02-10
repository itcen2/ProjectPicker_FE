import React, {useState, useEffect}from 'react';
import QuoteItem2 from './QuoteItem2';
import Button from '@mui/material/Button';

import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import QuoteItem from './QuoteItem';

import '../css/Quote.css'

const Quote = () => {

 

  const [totalValue, setTotalValue] = useState({
    categori1 : 0,
    categori2 : 0,
    categori3 : 0,
    categori4 : 0
  });

  const [submit, setSubmit] = useState(false);

  const plusTotalValue = (value) => {
    const result = parseInt(totalValue.categori4) + parseInt(value);
    setTotalValue({...totalValue, categori4:result});
  }; 

  const minTotalValue = value => {
    const result = parseInt(totalValue.categori4) - parseInt(value);
    setTotalValue({...totalValue, categori4:result});
  };
  const setCategori1 = (value) => {
    setTotalValue({...totalValue, categori1:value});
  };
  const setCategori2 = (value) => {
    setTotalValue({...totalValue, categori2:value});
  };

  const setCategori3 = (value) => {
    setTotalValue({...totalValue, categori3:value});
  };

  const writePost = () => {
    //견적 작성페이지를 리다이렉트로 연결
  };

  const buttonClick = e => {
    if(totalValue.categori1 !==0 && totalValue.categori2 !==0 && totalValue.categori3 !== 0 && totalValue.categori4 !== 0){
    const result = parseInt(totalValue.categori1) + parseInt(totalValue.categori2) + parseInt(totalValue.categori3) + parseInt(totalValue.categori4);
    document.getElementsByClassName('totalValueText')[0].innerText='총 가격은 : '+ result;
    setSubmit(!submit);
    }else{
      alert("선택을 해주세요.");
    }
  };
  return (
    <div className='quote'>
      <h1 className='title'>예상 견적 프로그램</h1>
         <FormControl>
          <table className='left'>
          <td className='table-type'>플랫폼</td>
          <td className='table-radio'>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <QuoteItem2 name = "naver" value="50000" setEvent={setCategori1}/>
              <QuoteItem2 name = "aws" value="70000" setEvent={setCategori1}/>
              <QuoteItem2 name = "google" value="40000" setEvent={setCategori1}/>
            </RadioGroup>
            </td>
            <tr/>
            <td className='table-type'>타입</td>
            <td className='table-radio'>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <QuoteItem2 name = "홈페이지" value="120000" setEvent={setCategori2}/>
              <QuoteItem2 name = "커뮤니티" value="300000" setEvent={setCategori2}/>
              <QuoteItem2 name = "쇼핑몰" value="700000" setEvent={setCategori2}/>
            </RadioGroup>
            </td>
            <tr/>
            <td className='table-type'>템플릿</td>
            <td className='check-box'>
            <QuoteItem name={'pc'} value="100000" plusTotal={plusTotalValue} minTotal = {minTotalValue}/>
            <QuoteItem name={'mobile'} value="100000" plusTotal={plusTotalValue} minTotal = {minTotalValue}/>
            </td>
            <tr/>
            <td className='table-type'>운영체제</td>
            <td className='table-radio'>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <QuoteItem2 name = "naver" value="50000" setEvent={setCategori3}/>
              <QuoteItem2 name = "aws" value="70000" setEvent={setCategori3}/>
              <QuoteItem2 name = "google" value="40000" setEvent={setCategori3}/>
            </RadioGroup>
            </td>
            </table>

            </FormControl>
          <h1 id = 'totalValueText' className='totalValueText'></h1>
          <Button className='result' variant="contained" onClick={submit ? writePost:buttonClick}>{submit? '글 작성하기':'예상 견적 확인하기'}</Button>
    </div>
  );
};

export default Quote;