import {
  Avatar,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import BirthDateInput from '../../FormInputs/BirthDateInput/BirthDateInput';
import ConfirmPasswordInput from '../../FormInputs/ConfirmPasswordInput/ConfirmPasswordInput';
import EmailAddressInput from '../../FormInputs/EmailAddressInput/EmailAddressInput';
import FirstAndLastNameInput from '../../FormInputs/FirstAndLastNameInput/FirstAndLastNameInput';
import PasswordInput from '../../FormInputs/PasswordInput/PasswordInput';
import RowRadioButtonsGroup from '../../FormInputs/RowRadioButtonsGroup/RowRadioButtonsGroup';
import UsernameInput from '../../FormInputs/UsernameInput/UsernameInput';
import {
  avatarSignUpFormStyle,
  buttonSignUpFormStyle,
} from './SignUpFormStyle';

interface SignUpFormProps {
  currentDate: null | Dayjs;
  isClicked: boolean;
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
  dateChangeHandler(date: null | Dayjs): void;
}

function SignUpForm({
  currentDate,
  isClicked,
  handleSubmit,
  dateChangeHandler,
}: SignUpFormProps) {
  return (
    <>
      <Avatar sx={avatarSignUpFormStyle}>
        <HowToRegRoundedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Zarejestruj się
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <FirstAndLastNameInput />
          <UsernameInput />
          <EmailAddressInput />

          <PasswordInput />
          <ConfirmPasswordInput />
          <Grid item xs={12} sm={6}>
            <RowRadioButtonsGroup />
          </Grid>
          <BirthDateInput
            date={currentDate}
            dateChangeHandler={dateChangeHandler}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={buttonSignUpFormStyle}
        >
          {isClicked ? (
            <CircularProgress size={28} color="inherit" />
          ) : (
            'Zarejestruj się'
          )}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/log-in">Masz już konto? Zaloguj się</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignUpForm;
