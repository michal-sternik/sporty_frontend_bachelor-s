import React from 'react';
import { Box, Stack } from '@mui/material';
import FriendsList from '../FriendsList/FriendsList';
import {
  outerStackUserProfileStyle,
  friendsStackUserProfileStyle,
} from '../UserProfile/UserProfileStyle';
import {
  invitationSectionStyle,
  outerFriendsInvitationListStyle,
  outerEventsInvitationListStyle,
} from '../Notifications/NotificationsStyle';
import JoinedEventHistory from './JoinedEventHistory';
import OrganisedEventHistory from './OrganisedEventHistory';

interface EventHistoryProps {
  foreign: boolean;
}

function EventHistory({ foreign }: EventHistoryProps) {
  return (
    <Box sx={outerStackUserProfileStyle}>
      <Stack sx={friendsStackUserProfileStyle}>
        <FriendsList />
      </Stack>
      <Stack sx={invitationSectionStyle}>
        <Stack sx={outerFriendsInvitationListStyle}>
          <JoinedEventHistory foreign={foreign} />
        </Stack>
        <Stack sx={outerEventsInvitationListStyle}>
          <OrganisedEventHistory foreign={foreign} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default EventHistory;
