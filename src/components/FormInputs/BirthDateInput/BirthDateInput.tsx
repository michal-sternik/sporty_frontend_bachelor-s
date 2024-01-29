import { FormLabel, Grid } from '@mui/material';
import { LocalizationProvider, plPL, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface FormProps {
  date: null | Dayjs;
  dateChangeHandler(date: null | Dayjs): void;
}

function BirthDateInput({ date, dateChangeHandler }: FormProps) {
  return (
    <Grid item xs={12} sm={6}>
      <FormLabel id="birthdate-id">Data urodzenia</FormLabel>

      <LocalizationProvider
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterDayjs}
        adapterLocale="pl"
      >
        <DatePicker
          disableFuture
          slotProps={{ textField: { fullWidth: true } }}
          defaultValue={dayjs()}
          value={date}
          onChange={dateChangeHandler}
        />
      </LocalizationProvider>
    </Grid>
  );
}

export default BirthDateInput;
