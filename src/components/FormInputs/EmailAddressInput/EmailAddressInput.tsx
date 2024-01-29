import { Grid, TextField } from '@mui/material';
import React from 'react';

interface FormProps {
  emailAddressInput?: string;
  handleEmailAddressInputChange?(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void;
}
function EmailAddressInput({
  emailAddressInput = ' ',
  handleEmailAddressInputChange = () => {},
}: FormProps) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="email"
        label="Adres e-mail"
        name="email"
        value={emailAddressInput !== ' ' ? emailAddressInput : undefined}
        onChange={
          emailAddressInput !== ' ' ? handleEmailAddressInputChange : undefined
        }
        autoComplete="email"
      />
    </Grid>
  );
}

export default EmailAddressInput;
