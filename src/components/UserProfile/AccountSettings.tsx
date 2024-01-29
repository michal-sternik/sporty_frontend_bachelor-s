import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Container,
  FormControlLabel,
  Switch,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import RowRadioButtonsGroup from '../FormInputs/RowRadioButtonsGroup/RowRadioButtonsGroup';
import BirthDateInput from '../FormInputs/BirthDateInput/BirthDateInput';
import EmailAddressInput from '../FormInputs/EmailAddressInput/EmailAddressInput';
import FirstAndLastNameInput from '../FormInputs/FirstAndLastNameInput/FirstAndLastNameInput';
import UsernameInput from '../FormInputs/UsernameInput/UsernameInput';
import {
  selectUserUserName,
  selectUserEmailAddress,
  selectUserAge,
  selectUserGender,
  selectUserFirstName,
  selectUserLastName,
  retrieveAfterRefresh,
} from '../../redux/userSlice';
import {
  buttonSubmitEditDataStyle,
  editDataContainerStyle,
  editDataToggerOffStyle,
  editDataToggerOnStyle,
  formControlLabelSwitchEditDataStyle,
  innerStackAccountSettingsStyle,
  outerStackAccountSettingsStyle,
} from './AccountSettingsStyle';
import UserDetailsService from '../../services/userDetailsService';
import { handleClickVariant, convertError } from '../../utils/errorHandleUtils';

function AccountSettings() {
  const [editData, setEditData] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>(
    useSelector(selectUserFirstName),
  );
  const [lastName, setLastName] = useState<string>(
    useSelector(selectUserLastName),
  );
  const [userName, setUserName] = useState<string>(
    useSelector(selectUserUserName),
  );
  const [email, setEmail] = useState<string>(
    useSelector(selectUserEmailAddress),
  );
  const [birthDate, setBirthDate] = useState<Dayjs>(
    dayjs(useSelector(selectUserAge), { format: 'YYYY-MM-DD' }),
  );

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [radioButtonGroup, setRadioButtonGroup] = useState<number>(
    useSelector(selectUserGender),
  );

  const handleGenderChange = (gender: number) => {
    setRadioButtonGroup(gender);
  };
  const dateChangeHandler = (newDate: Dayjs) => {
    setBirthDate(newDate);
  };
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await UserDetailsService.getUserDetails();

      const userData = response;

      dispatch(
        retrieveAfterRefresh({
          age: userData.age,
          gender: userData.gender,
          userName: userData.username,
          emailAddress: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image,
          recentMeetings: userData.recentMeetings,
          hasAdminRole: userData.hasAdminRole,
        }),
      );
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania danych użytkownika:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const json: any = {
        firstName,
        lastName,
        username: userName,
        email,
        dateOfBirth: dayjs(birthDate).format('YYYY-MM-DD'),
        gender: +radioButtonGroup,
      };
      await UserDetailsService.changeUserDetails(json);
      handleClickVariant(`Dane zostały zmienione z sukcesem`, 'success');
      setIsLoading(false);
      fetchData();
    } catch (err: any) {
      convertError(err);
    }
  };

  return (
    <Stack sx={outerStackAccountSettingsStyle}>
      <Stack sx={innerStackAccountSettingsStyle}>
        <FormControlLabel
          sx={formControlLabelSwitchEditDataStyle}
          control={<Switch size="small" />}
          label="Zmień dane"
          onChange={() => setEditData(!editData)}
        />
        <Typography component="h1" variant="h4">
          Zmień swoje informacje
        </Typography>
      </Stack>
      <Container component="main" maxWidth="md" sx={editDataContainerStyle}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={editData ? editDataToggerOnStyle : editDataToggerOffStyle}
        >
          <Grid container spacing={2}>
            <FirstAndLastNameInput
              firstNameValue={firstName}
              lastNameValue={lastName}
              handleFirstNameChange={handleFirstNameChange}
              handleLastNameChange={handleLastNameChange}
            />
            <UsernameInput
              userNameInput={userName}
              handleUserNameInputChange={handleUsernameChange}
            />
            <EmailAddressInput
              emailAddressInput={email}
              handleEmailAddressInputChange={handleEmailChange}
            />

            <Grid item xs={12} sm={6}>
              <RowRadioButtonsGroup
                whichButtonChecked={+radioButtonGroup}
                handleChangeGender={handleGenderChange}
              />
            </Grid>
            <BirthDateInput
              date={birthDate}
              dateChangeHandler={dateChangeHandler}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonSubmitEditDataStyle}
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

export default AccountSettings;
