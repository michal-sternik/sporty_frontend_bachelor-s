/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import UserSidebar from './UserSidebar';
import AccountSettings from './AccountSettings';
import { selectUserFirstName } from '../../redux/userSlice';
import ChangePassword from './ChangePassword';
import {
  activePageStackUserProfileStyle,
  // backIconEditUserInfoStyle,
  innerStackUserProfileStyle,
  outerStackUserProfileStyle,
  stackUserProfileStyle,
  typographyMyProfileUserProfileStyle,
  userGreetingTypographyStyle,
} from './EditUserProfileStyle';
import DeleteProfilePic from './DeleteProfilePic';

function EditUserProfile() {
  const { activepage } = useParams();
  const navigate = useNavigate();
  const firstName = useSelector(selectUserFirstName);

  return (
    <Stack flexGrow={1} sx={outerStackUserProfileStyle}>
      <Typography
        component="h1"
        variant="h3"
        sx={typographyMyProfileUserProfileStyle}
      >
        Mój profil
      </Typography>
      {/* <Typography sx={userGreetingTypographyStyle}>
        <b>{firstName}, </b>here you can manage your profile
      </Typography> */}
      <Stack sx={stackUserProfileStyle}>
        <Stack sx={innerStackUserProfileStyle}>
          <UserSidebar activePage={activepage!} />
        </Stack>
        <Stack sx={activePageStackUserProfileStyle}>
          {activepage === 'accountsettings' && <AccountSettings />}
          {activepage === 'changepassword' && <ChangePassword />}
          {activepage === 'deleteprofilepic' && <DeleteProfilePic />}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default EditUserProfile;
