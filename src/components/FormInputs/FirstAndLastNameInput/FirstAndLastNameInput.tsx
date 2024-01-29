import { Grid, TextField } from '@mui/material';
import React from 'react';

interface FormProps {
  firstNameValue?: string;
  lastNameValue?: string;
  handleFirstNameChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  handleLastNameChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

function FirstAndLastNameInput({
  firstNameValue = ' ',
  lastNameValue = ' ',
  handleFirstNameChange = () => {},
  handleLastNameChange = () => {},
}: FormProps) {
  const isDisabled = window.location.pathname === '/profile/accountsettings';
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="Imię"
          autoFocus={!isDisabled}
          value={firstNameValue !== ' ' ? firstNameValue : undefined}
          onChange={firstNameValue !== ' ' ? handleFirstNameChange : undefined}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Nazwisko"
          name="lastName"
          autoComplete="family-name"
          value={lastNameValue !== ' ' ? lastNameValue : undefined}
          onChange={lastNameValue !== ' ' ? handleLastNameChange : undefined}
        />
      </Grid>
    </>
  );
}

export default FirstAndLastNameInput;
