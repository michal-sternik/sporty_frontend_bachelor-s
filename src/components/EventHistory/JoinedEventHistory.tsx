/* eslint-disable no-nested-ternary */
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import outerStackFriendsInvitationListStyle from '../FriendsInvitationList/FriendsInvitationListStyle';
import EventItem from '../EventItem/EventItem';
import { singleEventInUserInfoWrapper } from '../UserProfile/UserProfileStyle';
import EventsService from '../../services/eventsService';
import { convertError } from '../../utils/errorHandleUtils';

interface EventHistoryProps {
  foreign: boolean;
}

function JoinedEventHistory({ foreign }: EventHistoryProps) {
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const id = useParams();

  const fetchJoinedMeetings = async () => {
    setIsLoading(true);
    try {
      const response = foreign
        ? await EventsService.getJoinedMeetingListForeignUser(id.id!)
        : await EventsService.getJoinedMeetingsList();
      setJoinedEvents(response);
      setIsLoading(false);
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania joinedMeetings:', error);
    }
  };

  useEffect(() => {
    fetchJoinedMeetings();
  }, []);

  return (
    <Stack
      sx={
        isLoading
          ? {
              ...outerStackFriendsInvitationListStyle,
              alignItems: 'center',
            }
          : outerStackFriendsInvitationListStyle
      }
    >
      <Typography sx={{ color: 'white' }} variant="h5">
        Wydarzenia do których dołączyłeś:
      </Typography>
      {!isLoading ? (
        joinedEvents.length ? (
          joinedEvents.map((event) => (
            <Box sx={singleEventInUserInfoWrapper}>
              <EventItem
                id={event.id}
                title={event.title}
                startDateTimeUtc={event.startDateTimeUtc}
                endDateTimeUtc={event.endDateTimeUtc}
                organizerUsername={event.organizerUsername}
              />
            </Box>
          ))
        ) : (
          <Typography sx={{ color: 'white' }}>No event history.</Typography>
        )
      ) : (
        <CircularProgress size="160px" thickness={2} />
      )}
    </Stack>
  );
}
export default JoinedEventHistory;
