import { Grid, TextField } from '@mui/material';
import React from 'react';

function OldPasswordInput() {
  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name="oldpassword"
        label="Stare hasło"
        type="password"
        id="oldpassword"
        autoComplete="old-password"
      />
    </Grid>
  );
}

export default OldPasswordInput;
