import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Friend from '../Friend/Friend';
import FriendsService from '../../services/friendsService';
import { FriendItem } from '../../types';
import { useAppDispatch } from '../../redux/store';
import {
  getFriendsList,
  selectIsLoadingUserFriendsList,
  selectUserFriendsList,
} from '../../redux/friendsSlice';
import { convertError } from '../../utils/errorHandleUtils';

function FriendsList() {
  const [candidatesList, setCandidatesList] = useState<FriendItem[]>([]);

  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const friendsList = useSelector(selectUserFriendsList);
  const isLoadingUserFriendsList = useSelector(selectIsLoadingUserFriendsList);

  const fetchUsers = async () => {
    try {
      await dispatch(getFriendsList({}));
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania znajomych:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchForUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchPhrase(e.target.value);
  };

  useEffect(() => {
    setIsTyping(true);
    if (searchPhrase) {
      const timer = setTimeout(() => {
        FriendsService.getUsersBySearchPhrase(searchPhrase).then((response) =>
          setCandidatesList(response),
        );
        setIsTyping(false);
      }, 400);
      return () => {
        clearTimeout(timer);
      };
    }
    setIsTyping(false);
    setCandidatesList([]);
    fetchUsers();

    // Zwracamy pustą funkcję lub funkcję bez efektów ubocznych, aby spełnić wymagania ESLint
    return () => {};
  }, [searchPhrase]);

  const renderContent = () => {
    if (isTyping) {
      return (
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading...
        </Typography>
      );
    }

    if (candidatesList.length) {
      return candidatesList.map((friend) => (
        <Friend
          key={friend.id}
          id={friend.id}
          firstName={friend.firstName}
          lastName={friend.lastName}
          friendUsername={friend.friendUsername}
          image={friend.image}
        />
      ));
    }

    if (!searchPhrase) {
      return friendsList.length ? (
        friendsList.map((friend: any) => (
          <Friend
            key={friend.id}
            id={friend.id}
            firstName={friend.firstName}
            lastName={friend.lastName}
            friendUsername={friend.friendUsername}
            image={friend.image}
          />
        ))
      ) : (
        <Typography variant="h6" sx={{ color: 'white' }}>
          List is empty.
        </Typography>
      );
    }

    return (
      <Typography variant="h6" sx={{ color: 'white' }}>
        Nie znaleziono.
      </Typography>
    );
  };

  return (
    <>
      <Typography variant="h5" sx={{ color: 'white', padding: '10px' }}>
        Znajomi:
      </Typography>
      <TextField
        id="input-with-icon-textfield"
        sx={{ padding: '10px', '& > label': { padding: '15px' } }}
        label="Szukaj znajomego"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={(e) => handleSearchForUserChange(e)}
        value={searchPhrase}
        variant="standard"
      />

      <Stack
        sx={{
          width: '100%',
          flexDirection: { xs: 'row', md: 'column' },
          height: '100%',
          gap: '10px',
          padding: '10px',
          overflow: 'auto',
          justifyContent: isLoadingUserFriendsList ? 'center' : 'unset',
          alignItems: isLoadingUserFriendsList ? 'center' : 'unset',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '5px',
            background: '#2C2C2C',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '10px',
          },
        }}
      >
        {!isLoadingUserFriendsList ? (
          renderContent()
        ) : (
          <CircularProgress size="160px" thickness={2} />
        )}
      </Stack>
    </>
  );
}

export default FriendsList;
