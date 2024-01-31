import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/pl';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import SignUpForm from './SignUpForm/SignUpForm';
import outerBoxSignUpFormStyle from './SignUpStyle';
import { RegisterFormInputs } from '../../types';
import AccountService from '../../services/accountService';
import { convertError } from '../../utils/errorHandleUtils';
import THEME from '../../theme';

export default function SignUp() {
  const [currentDate, setCurrentDate] = useState<null | Dayjs>(dayjs());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dateChangeHandler = (newDate: null | Dayjs) => {
    setCurrentDate(newDate);
  };

  const navigate = useNavigate();

  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
    return; // for mocking purposes
    // event.preventDefault(); turned off for mocking purposes
    const data = new FormData(event.currentTarget);

    try {
      const json: RegisterFormInputs = {
        firstName: data.get('firstName')!.toString(),
        lastname: data.get('lastName')!.toString(),
        username: data.get('userName')!.toString(),
        email: data.get('email')!.toString(),
        password: data.get('password')!.toString(),
        confirmPassword: data.get('confirmPassword')!.toString(),
        dateOfBirth: dayjs(currentDate).format('YYYY-MM-DD'),
        gender: +data.get('row-radio-buttons-group')!,
      };
      await AccountService.registerUser(json);
      navigate('/activate-account');
    } catch (err: any) {
      convertError(err);
    } finally {
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/events');
    }
  }, [navigate]);

  return (
    <Stack
      component="main"
      sx={{
        backgroundColor: THEME.palette.background.paper,
        height: '100%',
        paddingLeft: { xs: '100px', md: '232px' },
        paddingRight: { xs: '100px', md: '232px' },
      }}
    >
      <CssBaseline />
      <Box sx={outerBoxSignUpFormStyle}>
        <SignUpForm
          currentDate={currentDate}
          isClicked={isSubmitted}
          handleSubmit={handleSubmit}
          dateChangeHandler={dateChangeHandler}
        />
      </Box>
    </Stack>
  );
}
