import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../FormInputs/PasswordInput/PasswordInput';
import ConfirmPasswordInput from '../FormInputs/ConfirmPasswordInput/ConfirmPasswordInput';
import OldPasswordInput from '../FormInputs/OldPasswordInput.tsx/OldPasswordInput';
import {
  boxChangePasswordStyle,
  buttonChangePasswordStyle,
  containerChangePasswordStyle,
  outerStackChangePasswordStyle,
  typographyChangePasswordLabel,
} from './ChangePasswordStyle';
import UserDetailsService from '../../services/userDetailsService';
import { convertError, handleClickVariant } from '../../utils/errorHandleUtils';

function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    try {
      await UserDetailsService.changePassword(
        data.get('oldpassword')!.toString(),
        data.get('password')!.toString(),
        data.get('confirmPassword')!.toString(),
      );
      handleClickVariant(`Hasło zostało zmienione z sukcesem`, 'success');
      navigate('/profile/accountsettings');
    } catch (err: any) {
      convertError(err);
    }
    setIsLoading(false);
  };

  return (
    <Stack sx={outerStackChangePasswordStyle}>
      <Typography
        component="h1"
        sx={typographyChangePasswordLabel}
        variant="h4"
      >
        Zmień hasło
      </Typography>

      <Container
        component="main"
        maxWidth="md"
        sx={containerChangePasswordStyle}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={boxChangePasswordStyle}
        >
          <Grid container spacing={2}>
            <OldPasswordInput />
            <PasswordInput />
            <ConfirmPasswordInput />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonChangePasswordStyle}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={28} />
            ) : (
              'Zapisz'
            )}
          </Button>
        </Box>
      </Container>
    </Stack>
  );
}

export default ChangePassword;
