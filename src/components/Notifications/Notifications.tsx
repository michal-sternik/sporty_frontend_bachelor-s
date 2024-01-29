import { Box, Stack } from '@mui/material';
import React from 'react';
import {
  friendsStackUserProfileStyle,
  outerStackNofificationStyle,
  invitationSectionStyle,
  outerEventsInvitationListStyle,
  outerFriendsInvitationListStyle,
} from './NotificationsStyle';
import EventsList from '../EventsInvitationList/EventsInvitationList';
import FriendsInvitationList from '../FriendsInvitationList/FriendsInvitationList';
import FriendsList from '../FriendsList/FriendsList';

function Notifications() {
  return (
    <Box sx={outerStackNofificationStyle}>
      <Stack sx={friendsStackUserProfileStyle}>
        <FriendsList />
      </Stack>
      <Stack sx={invitationSectionStyle}>
        <Stack sx={outerFriendsInvitationListStyle}>
          <FriendsInvitationList />
        </Stack>
        <Stack sx={outerEventsInvitationListStyle}>
          <EventsList />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Notifications;
