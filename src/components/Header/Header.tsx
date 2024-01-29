import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import Face2RoundedIcon from '@mui/icons-material/Face2Rounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import AnimatedArrowLeft from '../AnimatedArrowLeft/AnimatedArrowLeft';
import {
  selectUserUserName,
  selectUserGender,
  selectUserFirstName,
  selectUserLastName,
  logoutPerson,
  retrieveAfterRefresh,
  selectUserPhoto,
} from '../../redux/userSlice';
import { useAppDispatch } from '../../redux/store';
import {
  boxAvatarHeaderStyle,
  dropMenuHeaderStyle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  helloUserTypographyStyle,
  iconButtonHeaderStyle,
  innerStackHeaderStyle,
  navLinkLogoStyle,
  notificationButtonStyle,
  notoficationButtonExclamationMarkStyle,
  outerStackHeaderStyle,
  typographyLogInSignUpHeaderStyle,
} from './HeaderStyle';
import UserDetailsService from '../../services/userDetailsService';
import {
  fetchFriendInvitations,
  fetchMeetingInvitations,
  logoutPersonInvitations,
  selectFriendInvitaionList,
  selectMeetingInvtitataionList,
} from '../../redux/notificationSlice';
import { FriendInvitationItem } from '../../types';
import { convertError } from '../../utils/errorHandleUtils';

function Header() {
  const eventsList = useSelector(selectMeetingInvtitataionList);
  const friendInvitations: FriendInvitationItem[] = useSelector(
    selectFriendInvitaionList,
  );
  const is900pxOrLowerScreen = useMediaQuery('(max-width:900px)');
  const is600pxOrLowerScreen = useMediaQuery('(max-width:600px)');

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const firstName = useSelector(selectUserFirstName);
  const lastName = useSelector(selectUserLastName);
  const gender = useSelector(selectUserGender);
  const userName = useSelector(selectUserUserName);
  const userPhotoUrl = useSelector(selectUserPhoto);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        if (token) {
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
        }
      } catch (error) {
        convertError(error);
        console.error('Błąd podczas pobierania danych użytkownika:', error);
      }
    };
    fetchData();
    if (token) {
      dispatch(fetchFriendInvitations({}));
      dispatch(fetchMeetingInvitations({}));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutPerson());
    dispatch(logoutPersonInvitations());
    localStorage.removeItem('token');
    setAnchorElUser(null);
    navigate('/');
  };

  const handleToggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElUser !== null) {
      setAnchorElUser(null);
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavigateUserProfile = () => {
    navigate('/profile');
    setAnchorElUser(null);
  };

  const handleNavigatePosts = () => {
    navigate('/posts');
    setAnchorElUser(null);
  };

  const handleNavigateNotifications = () => {
    navigate('/notifications');
    setAnchorElUser(null);
  };

  const settings = is900pxOrLowerScreen
    ? [
        { name: 'Profil', function: handleNavigateUserProfile },
        {
          name: `Powiadomienia (${
            eventsList.length + friendInvitations.length
          })`,
          function: handleNavigateNotifications,
        },
        { name: 'Ogłoszenia', function: handleNavigatePosts },
        { name: 'Wyloguj', function: handleLogout },
      ]
    : [
        { name: 'Profil', function: handleNavigateUserProfile },
        { name: 'Wyloguj', function: handleLogout },
      ];

  let avatarContent;

  if (userPhotoUrl) {
    avatarContent = (
      <img
        src={userPhotoUrl}
        alt="Avatar"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'cover',
          borderRadius: '33%',
          overflow: 'hidden',
          position: 'absolute',
        }}
      />
    );
  } else if (Number(gender) === 0)
    avatarContent = <FaceRoundedIcon color="info" fontSize="large" />;
  else if (Number(gender) === 1) {
    avatarContent = <Face2RoundedIcon color="secondary" fontSize="large" />;
  } else
    avatarContent = <Person2RoundedIcon color="warning" fontSize="large" />;

  return (
    <Stack sx={outerStackHeaderStyle} boxShadow={3}>
      <Stack flexDirection="row" alignItems="center">
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <NavLink to="/events">
          <Typography component="h1" variant="h5" sx={navLinkLogoStyle}>
            SporTy
          </Typography>
        </NavLink>
      </Stack>

      {userName ? (
        <Stack sx={innerStackHeaderStyle}>
          {!is900pxOrLowerScreen ? (
            <>
              <NavLink to="/posts">
                <Typography sx={notificationButtonStyle}>Ogłoszenia</Typography>
              </NavLink>
              <NavLink to="/notifications">
                <Typography sx={notificationButtonStyle}>
                  Powiadomienia
                  {eventsList.length + friendInvitations.length > 0 ? (
                    <PriorityHighRoundedIcon
                      sx={notoficationButtonExclamationMarkStyle}
                    />
                  ) : null}
                </Typography>
              </NavLink>
            </>
          ) : null}
          <Stack
            sx={{
              height: '50px',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              textWrap: 'nowrap',
            }}
          >
            <Typography
              sx={{
                position: { xs: 'absolute', sm: 'unset' },
                width: { xs: '250%', sm: 'unset' },
                height: '100%',
                margin: 0,
                lineHeight: '50px',
                textAlign: 'center',

                /* Starting position */
                transform: { xs: 'translateX(100%)', sm: 'none' },

                /* Apply animation to this element */
                animation: { xs: 'example1 5s linear infinite', sm: 'none' },
                '@keyframes example1': {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
              }}
            >
              Witaj,{' '}
              <b>
                {firstName} {lastName}!
              </b>
            </Typography>
            <div
              style={
                is600pxOrLowerScreen
                  ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(to right, #2c2c2c, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), #2c2c2c)',
                      pointerEvents: 'none',
                    }
                  : {}
              }
            />
          </Stack>
          <Box sx={boxAvatarHeaderStyle}>
            <Tooltip title="Pokaż menu" placement="left">
              <IconButton
                onClick={handleToggleUserMenu}
                sx={
                  userPhotoUrl
                    ? { ...iconButtonHeaderStyle, padding: '25px' }
                    : { ...iconButtonHeaderStyle, padding: '8px' }
                }
              >
                {avatarContent}
              </IconButton>
            </Tooltip>
            <Menu
              sx={dropMenuHeaderStyle}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.function}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AnimatedArrowLeft />
        </Stack>
      ) : (
        <Stack sx={innerStackHeaderStyle}>
          <NavLink to="/log-in">
            <Typography
              sx={typographyLogInSignUpHeaderStyle}
              component="h1"
              variant="h5"
            >
              ZALOGUJ SIĘ
            </Typography>
          </NavLink>
          <NavLink to="/sign-up">
            <Typography
              sx={typographyLogInSignUpHeaderStyle}
              component="h1"
              variant="h5"
            >
              ZAREJESTRUJ SIĘ
            </Typography>
          </NavLink>
        </Stack>
      )}
    </Stack>
  );
}

export default Header;
