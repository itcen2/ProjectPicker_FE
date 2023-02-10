import React, {useState} from 'react';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';


const QuoteItem2 = ({name, value, setEvent}) => {

  const buttonClick = e => {
    setEvent(e.target.value)
  };

  return (
    <>
        <FormControlLabel value={value} control={<Radio />} label={name} onClick = {buttonClick}/>
    </>

  );
};

export default QuoteItem2;