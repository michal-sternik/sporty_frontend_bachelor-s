import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  avatarResetPasswordStyle,
  innerBoxResetPasswordStyle,
  outerBoxResetPasswordStyle,
  resetPasswordButtonStyle,
  typographyResetPasswordStyle,
} from './ResetPasswordStyle';
import { convertError } from '../../utils/errorHandleUtils';
import AccountService from '../../services/accountService';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const requestData = data.get('email')!.toString();
      await AccountService.forgotPassword(requestData);
      navigate('/reset-password-send');
    } catch (err: any) {
      convertError(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={outerBoxResetPasswordStyle}>
        <Avatar sx={avatarResetPasswordStyle} />
        <Typography
          sx={typographyResetPasswordStyle}
          component="h1"
          variant="h5"
        >
          Resetuj hasło
        </Typography>
        <Typography>Wprowadź e-mail, by zresetować hasło.</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={innerBoxResetPasswordStyle}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={resetPasswordButtonStyle}
          >
            Resetuj hasło
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
