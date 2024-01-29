/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import {
  buttonSectionFriendInvitationStyle,
  friendInvitationStyle,
} from './FriendInvitationStyle';
import RoundedButton from '../CustomButton/RoundedButton';

import { iconButtonHeaderStyle } from '../Header/HeaderStyle';
import { Image } from '../../types';

interface FriendInvitationProps {
  inviterId: string;
  inviterUsername: string;
  invitationDateTimeUtc: string;
  image: Image | null;
  acceptInvitation(userName: string): void;
  rejectInvitation(userName: string): void;
}

function FriendInvitation({
  inviterId,
  inviterUsername,
  invitationDateTimeUtc,
  image,
  acceptInvitation,
  rejectInvitation,
}: FriendInvitationProps) {
  function convertUTC(dateUTC: string) {
    const data = new Date(dateUTC);
    return data.toLocaleString();
  }
  const stackRef = useRef(null);
  const [stackStyle, setStackStyle] = useState<SxProps>(friendInvitationStyle);

  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (isRemoving) {
    return null;
  }

  return (
    <Stack ref={stackRef} sx={stackStyle}>
      <ListItemText
        sx={{
          ' > *': {
            color: 'white',
            fontFamily: 'Open Sans',
          },
        }}
        primary={
          <NavLink to={`/user/${inviterId}`}>
            <Stack flexDirection="row" gap="10px">
              <Avatar sx={{ transform: 'translateY(-20%)' }}>
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
              <Typography color="white">
                <b>{inviterUsername}</b> wysłał ci zaproszenie do znajomych
              </Typography>
            </Stack>
          </NavLink>
        }
        secondary={
          <Typography variant="caption" color="lime">
            {convertUTC(invitationDateTimeUtc)}
          </Typography>
        }
      />

      <Box sx={buttonSectionFriendInvitationStyle}>
        <RoundedButton
          text="Zaakceptuj"
          onClick={() => {
            setStackStyle({
              ...friendInvitationStyle,
              opacity: 0,
              transition: 'opacity 0.5s ease',
            });
            setTimeout(() => {
              acceptInvitation(inviterId);
              setStackStyle({
                ...friendInvitationStyle,
                opacity: 1,
              });
            }, 500);
          }}
        />
        <RoundedButton
          text="Odrzuć"
          onClick={() => {
            setStackStyle({
              ...friendInvitationStyle,
              opacity: 0,
              transition: 'opacity 0.5s ease',
            });
            setTimeout(() => {
              rejectInvitation(inviterId);
              setStackStyle({
                ...friendInvitationStyle,
                opacity: 1,
              });
            }, 500);
          }}
        />
      </Box>
    </Stack>
  );
}

export default FriendInvitation;
