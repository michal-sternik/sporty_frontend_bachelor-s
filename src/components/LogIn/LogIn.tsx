import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { logInPerson } from '../../redux/userSlice';
import {
  avatarLoginFormStyle,
  innerBoxLoginFormStyle,
  loginFormButtonStyle,
  outerBoxLoginFormStyle,
} from './LogInStyle';
import { convertError } from '../../utils/errorHandleUtils';
import THEME from '../../theme';
import {
  fetchFriendInvitations,
  fetchMeetingInvitations,
} from '../../redux/notificationSlice';

export default function LogIn() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
    return; // for mocking purposes
    // event.preventDefault(); turned off to refresh page after click, for mocking purpose
    const data = new FormData(event.currentTarget);
    try {
      await dispatch(
        logInPerson({
          email: data.get('email') as string,
          password: data.get('password') as string,
        }),
      ).unwrap();
      dispatch(fetchFriendInvitations({}));
      dispatch(fetchMeetingInvitations({}));
      navigate(-1);
    } catch (error: any) {
      convertError(error);
      return;
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
      <Box sx={outerBoxLoginFormStyle}>
        <Avatar sx={avatarLoginFormStyle} />
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={innerBoxLoginFormStyle}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres e-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={loginFormButtonStyle}
          >
            {isSubmitted ? (
              <CircularProgress size={28} color="inherit" />
            ) : (
              'Zaloguj się'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/reset-password">Zapomniałeś hasła?</NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/sign-up">Nie masz konta? Zarejestuj się!</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
