import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';

import React from 'react';
import { NavLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { iconButtonHeaderStyle } from '../Header/HeaderStyle';
import { FriendItem } from '../../types';
import FriendsService from '../../services/friendsService';
import { convertError, handleClickVariant } from '../../utils/errorHandleUtils';

function Friend({
  id,
  firstName,
  lastName,
  friendUsername,
  image,
}: FriendItem) {
  const inviteUserToFriends = async (userId: string) => {
    try {
      await FriendsService.inviteUserToFriends(userId);
      handleClickVariant('Użytkownik został zaproszony!', 'success');
    } catch (err: any) {
      convertError(err);
    }
  };
  return (
    <ListItem sx={{ borderRadius: '15px', border: '2px solid #1976D2' }}>
      <ListItemAvatar>
        <NavLink to={`/user/${id}`}>
          <Avatar>
            <IconButton sx={{ ...iconButtonHeaderStyle, padding: '20px' }}>
              {image ? (
                <img
                  src={image.url}
                  alt="Avatar"
                  style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'absolute',
                  }}
                />
              ) : (
                <FaceRoundedIcon color="info" fontSize="large" />
              )}
            </IconButton>
          </Avatar>
        </NavLink>
      </ListItemAvatar>
      <ListItemText
        sx={{
          ' > *': {
            color: 'white',
          },
        }}
        primary={
          <Typography>
            <b>
              {firstName} {lastName}
            </b>
          </Typography>
        }
        secondary={<Typography variant="caption">{friendUsername}</Typography>}
      />
      {firstName === undefined ? (
        <Tooltip title="Invite to friends" placement="right">
          <IconButton onClick={() => inviteUserToFriends(id)}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </ListItem>
  );
}

export default Friend;
