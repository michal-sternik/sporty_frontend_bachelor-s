/* eslint-disable no-nested-ternary */
import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FriendInvitation from '../FriendInvitation/FriendInvitation';
import outerStackFriendsInvitationListStyle from './FriendsInvitationListStyle';
import { FriendInvitationItem } from '../../types';
import FriendsService from '../../services/friendsService';
import { useAppDispatch } from '../../redux/store';
import {
  fetchFriendInvitations,
  selectFriendInvitaionList,
  selectIsLoadingNotificationList,
} from '../../redux/notificationSlice';
import { convertError } from '../../utils/errorHandleUtils';
import { getFriendsList } from '../../redux/friendsSlice';

function FriendsInvitationList() {
  const dispatch = useAppDispatch();
  const friendInvitations: FriendInvitationItem[] = useSelector(
    selectFriendInvitaionList,
  );
  const isLoadingNotificationList: boolean = useSelector(
    selectIsLoadingNotificationList,
  );

  const fetchFriendInvitationsList = async () => {
    try {
      await dispatch(fetchFriendInvitations({}));
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania znajomych:', error);
    }
  };

  useEffect(() => {
    fetchFriendInvitationsList();
  }, []);

  const handleAcceptFriendInvitation = async (inviterId: string) => {
    try {
      await FriendsService.acceptUserToFriends(inviterId).then(() =>
        dispatch(fetchFriendInvitations({})).then(() =>
          dispatch(getFriendsList({})),
        ),
      );
    } catch (err: any) {
      convertError(err);
    }
  };

  const handleRejectFriendInvitation = async (inviterId: string) => {
    try {
      FriendsService.rejectUserInvitation(inviterId).then(() =>
        dispatch(fetchFriendInvitations({})),
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
      <Typography sx={{ color: 'white' }} variant="h5">
        Zaproszenia do znajomych:
      </Typography>
      {!isLoadingNotificationList ? (
        friendInvitations.length ? (
          friendInvitations.map((invitation) => (
            <FriendInvitation
              inviterId={invitation.inviterId}
              inviterUsername={invitation.inviterUsername}
              invitationDateTimeUtc={invitation.invitationDateTimeUtc}
              image={invitation.image}
              acceptInvitation={handleAcceptFriendInvitation}
              rejectInvitation={handleRejectFriendInvitation}
            />
          ))
        ) : (
          <Typography sx={{ color: 'white' }}>
            Brak zaproszeń do znajomych.
          </Typography>
        )
      ) : (
        <CircularProgress size="160px" thickness={2} />
      )}
    </Stack>
  );
}
export default FriendsInvitationList;
