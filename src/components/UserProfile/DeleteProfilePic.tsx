import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  containerChangePasswordStyle,
  outerStackChangePasswordStyle,
  typographyChangePasswordLabel,
} from './ChangePasswordStyle';
import UserDetailsService from '../../services/userDetailsService';
import { convertError, handleClickVariant } from '../../utils/errorHandleUtils';
import { iconButtonUserInfoStyle } from './UserProfileStyle';
import {
  saveUserPhoto,
  selectUserPhoto,
  selectUserPhotoPublicId,
} from '../../redux/userSlice';
import { useAppDispatch } from '../../redux/store';

function DeleteProfilePic() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const userPhotoUrl = useSelector(selectUserPhoto);
  const userPhotoPublicId = useSelector(selectUserPhotoPublicId);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await UserDetailsService.deleteProfilePic(userPhotoPublicId);
      dispatch(saveUserPhoto({}));
      handleClickVariant(
        `You've successfully deleted your profile picture.`,
        'success',
      );
      // navigate('/profile/accountsettings');
    } catch (err: any) {
      convertError(err);
    }
    setIsLoading(false);
  };

  return (
    <Stack sx={outerStackChangePasswordStyle}>
      <Typography
        component="h1"
        sx={typographyChangePasswordLabel}
        variant="h4"
      >
        {userPhotoUrl ? 'Usuń swoje zdjęcie tutaj' : 'Brak zdjęcia.'}
      </Typography>

      <Container
        component="main"
        maxWidth="md"
        sx={containerChangePasswordStyle}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            position: 'relative',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* <ListItemAvatar sx={avatarAreaUserInfoStyle}> */}
          <Avatar
            sx={{
              padding: { xs: '40%', sm: '25%', md: '20%', lg: '15%' },
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {userPhotoUrl ? (
              <IconButton
                sx={iconButtonUserInfoStyle}
                // onClick={handleAvatarClick}
              >
                <img
                  src={userPhotoUrl}
                  alt="Avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                />
              </IconButton>
            ) : (
              <span style={{ whiteSpace: 'nowrap' }}>
                Wrzuć <NavLink to="/profile">tutaj</NavLink>
              </span>
            )}
          </Avatar>
          {/* </ListItemAvatar> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            // eslint-disable-next-line no-unneeded-ternary
            disabled={!userPhotoUrl}
            sx={{ mt: 3, mb: 4, position: 'absolute', bottom: '24px' }}
          >
            {isLoading ? (
              <CircularProgress size={28} color="inherit" />
            ) : (
              'Zapisz'
            )}
          </Button>
        </Box>
      </Container>
    </Stack>
  );
}

export default DeleteProfilePic;
