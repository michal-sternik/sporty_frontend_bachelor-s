import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Stack, Typography } from '@mui/material';
import {
  activePageOptionUserSidebarStyle,
  inactivePageOptionUserSidebarStyle,
  innerStackUserSidebarStyle,
  outerStackUserSidebarStyle,
} from './UserSidebarStyle';

interface Props {
  activePage: string;
}

function UserSidebar({ activePage }: Props) {
  return (
    <Stack sx={outerStackUserSidebarStyle}>
      <Stack sx={innerStackUserSidebarStyle}>
        <span>Menu</span>
        <WidgetsIcon />
      </Stack>
      <Link to="/profile/accountsettings">
        <Stack
          sx={
            activePage === 'accountsettings'
              ? activePageOptionUserSidebarStyle
              : inactivePageOptionUserSidebarStyle
          }
        >
          <AccountCircleOutlinedIcon />
          <Typography>Ustawienia konta</Typography>
        </Stack>
      </Link>

      <Link to="/profile/changepassword">
        <Stack
          sx={
            activePage === 'changepassword'
              ? activePageOptionUserSidebarStyle
              : inactivePageOptionUserSidebarStyle
          }
        >
          <LockOutlinedIcon />
          <Typography>Zmiana hasła</Typography>
        </Stack>
      </Link>
      <Link to="/profile/deleteprofilepic">
        <Stack
          sx={
            activePage === 'deleteprofilepic'
              ? activePageOptionUserSidebarStyle
              : inactivePageOptionUserSidebarStyle
          }
        >
          <LockOutlinedIcon />
          <Typography>Usuń zdjęcie profilowe</Typography>
        </Stack>
      </Link>
    </Stack>
  );
}

export default UserSidebar;
