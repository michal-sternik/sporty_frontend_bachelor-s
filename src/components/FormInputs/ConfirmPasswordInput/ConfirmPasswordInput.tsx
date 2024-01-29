import { Grid, TextField } from '@mui/material';
import React from 'react';

function ConfirmPasswordInput() {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        name="confirmPassword"
        label="Potwierdź hasło"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
      />
    </Grid>
  );
}

export default ConfirmPasswordInput;
