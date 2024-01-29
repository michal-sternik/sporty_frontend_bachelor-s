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

function OrganisedEventHistory({ foreign }: EventHistoryProps) {
  const [organisedEvents, setOrganisedEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const id = useParams();

  const fetchOrganisedMeetings = async () => {
    try {
      setIsLoading(true);
      const response = foreign
        ? await EventsService.getOrganisedMeetingsListForeignUser(id.id!)
        : await EventsService.getOrganisedMeetingsList();

      setOrganisedEvents(response);
      setIsLoading(false);
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania organisedMeetings:', error);
    }
  };

  useEffect(() => {
    fetchOrganisedMeetings();
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
        Organizowałeś:
      </Typography>
      {!isLoading ? (
        organisedEvents.length ? (
          organisedEvents.map((event) => (
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
export default OrganisedEventHistory;
