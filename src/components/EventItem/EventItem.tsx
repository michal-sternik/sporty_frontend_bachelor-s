import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import SportsVolleyballTwoToneIcon from '@mui/icons-material/SportsVolleyballTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface EventItemProps {
  id: string;
  title: string;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  organizerUsername: string;
}

function EventItem({
  id,
  title,
  startDateTimeUtc,
  endDateTimeUtc,
  organizerUsername,
}: EventItemProps) {
  const navigate = useNavigate();
  return (
    <ListItem sx={{ borderRadius: '15px', border: '2px solid #1976D2' }}>
      <ListItemAvatar>
        <Avatar>
          <IconButton
            onClick={() => {
              navigate(`/events/${id}`);
            }}
            sx={{
              '&:hover': {
                backgroundColor: '#C0C0C0',
              },
              '@keyframes rotate': {
                from: {
                  transform: 'rotate(0deg)',
                },
                to: {
                  transform: 'rotate(360deg)',
                },
              },
              animation: 'rotate 4s linear infinite;',
              p: 1,
              borderRadius: '33%',
              backgroundColor: '#ffffff',
            }}
          >
            <SportsVolleyballTwoToneIcon color="info" fontSize="large" />
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{
          ' > *': {
            color: 'white',
          },
        }}
        primary={
          <Typography>
            <b>{title}</b>
          </Typography>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'lime' }}>
              {new Date(startDateTimeUtc).toLocaleString()} -{' '}
              {new Date(endDateTimeUtc).toLocaleString()}{' '}
            </span>
            <AccountCircleIcon sx={{ transform: 'translateY(30%)' }} />{' '}
            {organizerUsername}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default EventItem;
