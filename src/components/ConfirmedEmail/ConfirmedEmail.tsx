import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  avatarStyle,
  boxStyle,
  buttonStyle,
  succesTypographyStyle,
} from './ConfirmedEmailStyles';
import AccountService from '../../services/accountService';
import { convertError } from '../../utils/errorHandleUtils';

export default function ConfirmedEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/events');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      const requestData = token.toString();
      try {
        AccountService.verifyEmail(requestData);
      } catch (error) {
        convertError(error);
      }
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={boxStyle}>
        <Avatar sx={avatarStyle} />
        <Typography sx={succesTypographyStyle} component="h1" variant="h2">
          Sukces
        </Typography>
        <Typography component="h1">Z powodzeniem aktywowałeś konto.</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={buttonStyle}
          onClick={() => {
            navigate('/log-in');
          }}
        >
          Zaloguj
        </Button>
      </Box>
    </Container>
  );
}
