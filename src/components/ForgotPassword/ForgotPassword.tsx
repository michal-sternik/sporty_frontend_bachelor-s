import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  boxStyleForgotPassword,
  avatarStyleForgotPassword,
  innerBoxStyleForgotPassword,
  resetPasswordButtonStyle,
  resetPasswordTypographyStyle,
} from './ForgotPasswordStyle';
import AccountService from '../../services/accountService';
import { convertError } from '../../utils/errorHandleUtils';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        await AccountService.resetPassword(
          token.toString(),
          data.get('password')!.toString(),
          data.get('confirmPassword')!.toString(),
        );

        navigate('/reset-password-success');
      } catch (err: any) {
        convertError(err);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={boxStyleForgotPassword}>
        <Avatar sx={avatarStyleForgotPassword} />
        <Typography
          sx={resetPasswordTypographyStyle}
          component="h1"
          variant="h5"
        >
          Reset password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={innerBoxStyleForgotPassword}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={resetPasswordButtonStyle}
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
