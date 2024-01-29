/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import EventInvitation from '../EventInvitation/EventInvitation';
import outerStackFriendsInvitationListStyle from '../FriendsInvitationList/FriendsInvitationListStyle';
import EventsService from '../../services/eventsService';
import { useAppDispatch } from '../../redux/store';
import {
  fetchMeetingInvitations,
  selectIsLoadingNotificationList,
  selectMeetingInvtitataionList,
} from '../../redux/notificationSlice';
import { convertError } from '../../utils/errorHandleUtils';

function EventsList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const eventsList = useSelector(selectMeetingInvtitataionList);
  const isLoadingNotificationList: boolean = useSelector(
    selectIsLoadingNotificationList,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMeetingInvitations({}));
      } catch (error) {
        convertError(error);
      }
    };

    fetchData();
  }, []);

  const handleAcceptEventInvitation = async (eventId: string) => {
    try {
      const response = await EventsService.joinMeeting(eventId).then(() =>
        // dispatch(fetchMeetingInvitations({})),
        navigate(`/events/${eventId}`),
      );
    } catch (err: any) {
      convertError(err);
    }
  };

  const handleRejectEventInvitation = async (eventId: string) => {
    try {
      const response = await EventsService.rejectInvitation(eventId).then(() =>
        dispatch(fetchMeetingInvitations({})),
      );
    } catch (err: any) {
      convertError(err);
    }
  };

  return (
    <Stack
      sx={
        isLoadingNotificationList
          ? {
              ...outerStackFriendsInvitationListStyle,
              alignItems: 'center',
            }
          : outerStackFriendsInvitationListStyle
      }
    >
      <>
        <Typography variant="h5" sx={{ color: 'white' }}>
          Zaproszenia do spotkań:
        </Typography>
        {!isLoadingNotificationList ? (
          eventsList.length ? (
            eventsList.map((e) => (
              <EventInvitation
                id={e.id}
                title={e.title}
                startDateTimeUtc={e.startDateTimeUtc}
                endDateTimeUtc={e.endDateTimeUtc}
                organizer={e.organizer}
                acceptInvitation={handleAcceptEventInvitation}
                rejectInvitation={handleRejectEventInvitation}
              />
            ))
          ) : (
            <Typography sx={{ color: 'white' }}>
              Brak zaproszeń do spotkań.
            </Typography>
          )
        ) : (
          <CircularProgress size="160px" thickness={2} />
        )}
      </>
    </Stack>
  );
}
export default EventsList;
