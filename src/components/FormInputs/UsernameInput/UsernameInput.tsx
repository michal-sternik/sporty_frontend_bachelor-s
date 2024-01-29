import { Grid, TextField } from '@mui/material';
import React from 'react';

interface FormProps {
  userNameInput?: string;
  handleUserNameInputChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

function UsernameInput({
  userNameInput = ' ',
  handleUserNameInputChange = () => {},
}: FormProps) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="userName"
        label="Nazwa użytkownika"
        name="userName"
        autoComplete="userName"
        value={userNameInput !== ' ' ? userNameInput : undefined}
        onChange={userNameInput !== ' ' ? handleUserNameInputChange : undefined}
      />
    </Grid>
  );
}

export default UsernameInput;
