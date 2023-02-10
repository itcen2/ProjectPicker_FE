import React, {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const QuoteItem = ({name, value, plusTotal,minTotal}) => {

  const [isChecked, setIsChecked] = useState(false);

  const clickEvent = (e) => {
    if(isChecked){
      minTotal(e.target.value);
      setIsChecked(!isChecked);
    }else{
      plusTotal(e.target.value);
      setIsChecked(!isChecked);
    }
  };

  return (
    <>
      <FormGroup >
        <FormControlLabel value={value} control={<Checkbox  />} onClick={clickEvent} label={name} />
      </FormGroup>
    </>

  );
};

export default QuoteItem;