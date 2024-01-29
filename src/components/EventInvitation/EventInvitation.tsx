/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import { NavLink } from 'react-router-dom';
import EventItem from '../EventItem/EventItem';
import RoundedButton from '../CustomButton/RoundedButton';
import {
  buttonSectionEventInvitationStyle,
  eventsListInvitationStyle,
} from './EventsInvitationStyle';
import { Image } from '../../types';
import { iconButtonHeaderStyle } from '../Header/HeaderStyle';

interface Organizer {
  id: string;
  username: string;
  image: Image;
}

interface EventInvitationProps {
  id: string;
  title: string;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  organizer: Organizer;
  acceptInvitation(eventId: string): void;
  rejectInvitation(eventId: string): void;
}

function EventInvitation({
  id,
  title,
  startDateTimeUtc,
  endDateTimeUtc,
  organizer,
  acceptInvitation,
  rejectInvitation,
}: EventInvitationProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [stackStyle, setStackStyle] = useState<SxProps>(
    eventsListInvitationStyle,
  );
  const stackRef = useRef(null);

  if (isRemoving) {
    return null;
  }
  return (
    <Stack ref={stackRef} sx={stackStyle}>
      <NavLink to={`/user/${organizer.id}`}>
        <Stack flexDirection="row" gap="10px">
          <Avatar sx={{ transform: 'translateY(-20%)' }}>
            <IconButton sx={{ ...iconButtonHeaderStyle, padding: '20px' }}>
              {organizer.image ? (
                <img
                  src={organizer.image.url}
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
            <b>{organizer.username}</b> wysłał ci zaproszenie do spotkania
          </Typography>
        </Stack>
      </NavLink>
      <EventItem
        id={id}
        title={title}
        startDateTimeUtc={startDateTimeUtc}
        endDateTimeUtc={endDateTimeUtc}
        organizerUsername={organizer.username}
      />
      <Box sx={buttonSectionEventInvitationStyle}>
        <RoundedButton
          text="Zaakceptuj"
          onClick={() => {
            setStackStyle({
              ...eventsListInvitationStyle,
              opacity: 0,
              transition: 'opacity 0.5s ease',
            });
            setTimeout(() => {
              acceptInvitation(id);
              setStackStyle({
                ...eventsListInvitationStyle,
                opacity: 1,
              });
            }, 500);
          }}
        />
        <RoundedButton
          text="Odrzuć"
          onClick={() => {
            setStackStyle({
              ...eventsListInvitationStyle,
              opacity: 0,
              transition: 'opacity 0.5s ease',
            });
            setTimeout(() => {
              rejectInvitation(id);
              setStackStyle({
                ...eventsListInvitationStyle,
                opacity: 1,
              });
            }, 500);
          }}
        />
      </Box>
    </Stack>
  );
}

export default EventInvitation;
