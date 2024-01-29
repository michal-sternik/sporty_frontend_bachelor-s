import { Grid, TextField } from '@mui/material';
import React from 'react';

function PasswordInput() {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        name="password"
        label="Hasło"
        type="password"
        id="password"
        autoComplete="new-password"
      />
    </Grid>
  );
}

export default PasswordInput;
