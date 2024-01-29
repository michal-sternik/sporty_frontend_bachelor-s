import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React from 'react';

interface OptionalFunctionProp {
  whichButtonChecked?: Number;
  handleChangeGender?(gender: Number): void;
}

function RowRadioButtonsGroup({
  whichButtonChecked = undefined,
  handleChangeGender = () => {},
}: OptionalFunctionProp) {
  const [buttonChecked, setButtonChecked] = React.useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (whichButtonChecked !== undefined) {
      handleChangeGender(parseInt(e.target.value, 10));
    }
    setButtonChecked(parseInt(e.target.value, 10));
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Płeć</FormLabel>
      <RadioGroup
        value={whichButtonChecked || buttonChecked}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel value={0} control={<Radio />} label="Mężczyzna" />
        <FormControlLabel value={1} control={<Radio />} label="Kobieta" />
        <FormControlLabel value={2} control={<Radio />} label="Inne" />
      </RadioGroup>
    </FormControl>
  );
}

export default RowRadioButtonsGroup;
