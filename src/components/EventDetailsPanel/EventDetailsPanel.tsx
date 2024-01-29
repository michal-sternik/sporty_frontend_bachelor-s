/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  debounce,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LngLatBoundsLike, useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ArrowRightIcon, ArrowLeftIcon } from '@mui/x-date-pickers';
import { Event, SearchedUserInfo } from '../../types';

import { API_BASE_URL, CLOSE_ZOOM } from '../../constants';
import {
  eventDetailsPanelStyle,
  eventDetailsPanelControlsStyle,
  eventDetailsPanelContentStyle,
  eventDetailsPanelHeaderContentStyle,
  eventDetailsPanelHeaderTitleStyle,
  eventDetailsPanelFirstInfoLineStyle,
  eventDetailsPanelFirstInfoLineUserIconStyle,
  eventDetailsPanelFirstInfoLineUserNameStyle,
  eventDetailsPanelExtraInfoStyle,
  eventDetailsPanelDescriptionStyle,
  eventDetailsPanelDescriptionTitleStyle,
  eventDetailsPanelDescriptionContentStyle,
  eventDetailsPanelMainAreaStyle,
  eventDetailsPanelFirstInfoLineParticipantsStyle,
  eventDetailsPanelFirstInfoLineParticipantsIconStyle,
  eventDetailsPanelParticipantsTitleStyle,
  eventDetailsPanelParticipantsListGreenIconStyle,
  eventDetailsPanelParticipantsListRedIconStyle,
  eventDetailsPanelParticipantsListYellowIconStyle,
  eventDetailsPanelSecondInfoLineStartTimeIconStyle,
  eventDetailsPanelSecondInfoLineEndTimeIconStyle,
  eventDetailsPanelSecondInfoLineEndTimeStyle,
  eventDetailsPanelSecondInfoLineStartTimeStyle,
} from './EventDetailsPanelStyles';
import convertToTitleCase from '../../utils/textUtils';
import jordan from '../../assets/images/jordan.jpg';
import convertToFormattedDateString from '../../utils/dateUtils';
import goImage from '../../assets/images/go.svg';
import {
  selectUserHasAdminRole,
  selectUserUserName,
} from '../../redux/userSlice';
import DifficultyIndicator from '../DifficultyIndicator/DifficultyIndicator';
import RoundedButton from '../CustomButton/RoundedButton';
import { useAppDispatch } from '../../redux/store';
import { selectDesiredBounds, setRecentEvent } from '../../redux/eventsSlice';
import SignalRContext from '../../signalRContext';
import { selectMessages } from '../../redux/chatSlice';
import { convertError } from '../../utils/errorHandleUtils';
import AnimatedArrowLeft from '../AnimatedArrowLeft/AnimatedArrowLeft';
import {
  selectIsChatOpen,
  setIsChatOpen,
  setIsMapVisible,
} from '../../redux/mapSlice';
import footballImage from '../../assets/images/disciplines/football.png';
import volleyballImage from '../../assets/images/disciplines/volleyball.png';
import basketballImage from '../../assets/images/disciplines/basketball.png';
import tennisImage from '../../assets/images/disciplines/tennis.png';
import badmintonImage from '../../assets/images/disciplines/badminton.png';
import tableTennisImage from '../../assets/images/disciplines/table-tennis.png';
import runningImage from '../../assets/images/disciplines/running.png';
import handballImage from '../../assets/images/disciplines/handball.png';
import golfImage from '../../assets/images/disciplines/golf.png';
import cyclingImage from '../../assets/images/disciplines/cycling.png';
import dancingImage from '../../assets/images/disciplines/dancing.png';
import gymImage from '../../assets/images/disciplines/gym.png';
import iceSkatingImage from '../../assets/images/disciplines/ice-skating.png';
import otherImage from '../../assets/images/disciplines/other.png';
// import EventsService from '../../services/eventsService';
// import EventsService from '../../services/eventsService';

function EventDetailsPanel() {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<SearchedUserInfo | null | string>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SearchedUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isChatOpen = useSelector(selectIsChatOpen);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
  const messages = useSelector(selectMessages);
  const [messageInputValue, setMessageInputValue] = useState<string>('');
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [kickedId, setKickedId] = useState<string | null>(null);
  const [isJordanActivated, setIsJordanActivated] = useState<boolean>(false);

  const { connection } = useContext(SignalRContext);

  const { eventId } = useParams();
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const { eventsMap: mapRef } = useMap();
  const desiredBounds = useSelector(selectDesiredBounds);
  const userUserName = useSelector(selectUserUserName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLeavingOrJoining, setIsLeavingOrJoining] = useState<boolean>(false);

  const isAdmin = useSelector(selectUserHasAdminRole);
  const isOrganizer = currentEvent?.organizer.username === userUserName;
  const isParticipant = currentEvent?.meetingParticipants.some(
    (participant) =>
      participant.username === userUserName && participant.status === 1,
  );
  const isParticipantOrOrganizer = isParticipant || isOrganizer;

  useEffect(() => {
    if (
      isParticipantOrOrganizer &&
      currentEvent &&
      connection?.state === 'Connected'
    ) {
      connection
        ?.invoke('JoinChat', currentEvent.id)
        .then(() => console.log('Joined Chat'))
        .catch((error) => convertError(error));
    }

    return () => {
      if (
        isParticipantOrOrganizer &&
        currentEvent &&
        connection?.state === 'Connected'
      ) {
        connection
          ?.invoke('LeaveChat', currentEvent.id)
          .then(() => console.log('Left Chat'))
          .catch((error) => convertError(error));
      }
    };
  }, [connection, connection?.state, currentEvent, isParticipantOrOrganizer]);

  useEffect(() => {
    dispatch(setIsMapVisible(false));

    if (currentEvent) {
      mapRef?.flyTo({
        center: [currentEvent.longitude, currentEvent.latitude],
        zoom: CLOSE_ZOOM,
      });
    }

    return () => {
      mapRef?.fitBounds(desiredBounds as LngLatBoundsLike);
    };
  }, [mapRef, desiredBounds, currentEvent, dispatch]);

  const handleAccept = () => {
    const API_TOKEN = localStorage.getItem('token');

    if (!API_TOKEN) {
      navigate('/log-in');
    }

    if (API_TOKEN) {
      axios
        .post(
          `${API_BASE_URL}/meeting/${eventId}/join`,
          {},
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          },
        )
        .then(() => {
          const fetchEvent = async () => {
            if (eventId) {
              try {
                const response = await axios.get(
                  `${API_BASE_URL}/meeting/${eventId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${API_TOKEN}`,
                    },
                  },
                );
                const responseData: Event = response.data;
                setCurrentEvent(responseData);
              } catch (error) {
                convertError(error);
              }
            }
          };

          fetchEvent();
        })
        .catch((error) => {
          convertError(error);
        })
        .finally(() => {
          setIsLeavingOrJoining(false);
        });
    }
    setIsLeavingOrJoining(true);
  };

  const handleLeave = () => {
    const API_TOKEN = localStorage.getItem('token');

    setIsLeavingOrJoining(true);

    axios
      .post(
        `${API_BASE_URL}/meeting/${eventId}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      )
      .then(() => {
        const fetchEvent = async () => {
          if (eventId) {
            try {
              const response = await axios.get(
                `${API_BASE_URL}/meeting/${eventId}`,
                {
                  headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                  },
                },
              );
              const responseData: Event = response.data;
              setCurrentEvent(responseData);
            } catch (error) {
              convertError(error);
            }
          }
        };

        fetchEvent();
      })
      .catch((error) => {
        convertError(error);
      })
      .finally(() => {
        setIsLeavingOrJoining(false);
      });
  };

  const handleDelete = () => {
    const API_TOKEN = localStorage.getItem('token');

    setIsLeavingOrJoining(true);

    axios
      .delete(`${API_BASE_URL}/meeting/${eventId}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        convertError(error);
      })
      .finally(() => {
        setIsLeavingOrJoining(false);
      });
  };

  const handleKick = (participantId: string) => {
    const API_TOKEN = localStorage.getItem('token');

    setKickedId(participantId);

    axios
      .post(
        `${API_BASE_URL}/meeting/${eventId}/remove/${participantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      )
      .then(() => {
        const fetchEvent = async () => {
          if (eventId) {
            try {
              const response = await axios.get(
                `${API_BASE_URL}/meeting/${eventId}`,
                {
                  headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                  },
                },
              );
              const responseData: Event = response.data;
              setCurrentEvent(responseData);
            } catch (error) {
              convertError(error);
            } finally {
              setKickedId(null);
            }
          }
        };

        fetchEvent();
      })
      .catch((error) => {
        convertError(error);
      });
  };

  const handleEdit = () => {
    navigate(
      `/events/edit/${eventId}?lat=${currentEvent?.latitude}&lng=${currentEvent?.longitude}`,
    );
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const API_TOKEN = localStorage.getItem('token');

          const response = await axios.get(
            `${API_BASE_URL}/meeting/${eventId}`,
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            },
          );
          const responseData: Event = response.data;
          setCurrentEvent(responseData);
          dispatch(setRecentEvent(responseData));
        } catch (error) {
          convertError(error);
        }
      }
    };

    fetchEvent();
  }, [eventId, dispatch]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const fetch = React.useMemo(
    () =>
      debounce((searchedName) => {
        if (searchedName.length > 0) {
          const API_TOKEN = localStorage.getItem('token');

          axios
            .get(`${API_BASE_URL}/friends/search/${searchedName}`, {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
              },
            })
            .then((response) => {
              const responseData: SearchedUserInfo[] = response.data;
              setOptions(responseData);
            })
            .catch(() => {});
        } else {
          setOptions([]);
        }
      }, 300),
    [],
  );

  useEffect(() => {
    fetch(inputValue);
  }, [inputValue, fetch]);

  useEffect(() => {
    return () => {
      dispatch(setIsChatOpen(false));
      dispatch(setIsMapVisible(false));
    };
  }, [dispatch]);

  return (
    <Stack sx={eventDetailsPanelStyle}>
      {currentEvent && isParticipantOrOrganizer && !isLeavingOrJoining && (
        <>
          {isJordanActivated && currentEvent.sportsDiscipline === 2 && (
            <Stack
              sx={{
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                left: '50%',
                right: 0,
                top: '80px',
                bottom: 0,
                zIndex: 4,
              }}
            >
              <img
                style={{ height: '100%' }}
                src={jordan}
                alt="Michael Jordan"
              />
            </Stack>
          )}
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
              position: 'absolute',
              left: { xs: 0, md: '50%' },
              opacity: isChatOpen ? 1 : 0,
              right: 0,
              top: '80px',
              bottom: 0,
              zIndex: 5,
              visibility: isChatOpen ? 'visible' : 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '16px',
              transition: 'opacity 0.1s ease-in-out, visibility 0.1s', // Added transition property
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(setIsChatOpen(false));
                dispatch(setIsMapVisible(false));
              }}
              sx={{
                position: 'absolute',
                left: '16px',
                top: '16px',
                backgroundColor: 'rgba(25, 118, 210, 0.5)',

                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Stack
              sx={{
                maxHeight: 'calc(100% - 100px)',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '10px',
                  backgroundColor: '#202020',
                  borderRadius: '5px',
                },

                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#343434',
                  borderRadius: '5px',
                },

                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#202020',
                  borderRadius: '5px',
                },
              }}
            >
              {[...messages]
                .reverse()
                .map((message, messageIndex, messagesArray) => {
                  const isMyMessage = message.username === userUserName;
                  const isPreviousMessageFromSameUser =
                    messageIndex > 0 &&
                    messagesArray[messageIndex - 1].username ===
                      message.username;
                  const isLastMessageFromSameUser = !(
                    messageIndex < messagesArray.length - 1 &&
                    messagesArray[messageIndex + 1].username ===
                      message.username
                  );

                  return (
                    <Stack
                      direction="column"
                      sx={{
                        overflowWrap: 'break-word',
                        maxWidth: '40%',
                        marginLeft: isMyMessage ? '0px' : 'auto',
                        marginRight: isMyMessage ? 'auto' : '8px',
                      }}
                    >
                      <Stack>
                        {!isPreviousMessageFromSameUser && (
                          <NavLink to={`/user/${message.userId}`}>
                            <Typography
                              sx={{
                                fontSize: '16px',
                                fontWeight: 700,
                                marginBottom: '4px',
                                marginLeft: isMyMessage ? '0px' : 'auto',
                                textAlign: isMyMessage ? 'left' : 'right',
                                color: '#FFFFFF',
                              }}
                            >
                              {message.username}
                            </Typography>
                          </NavLink>
                        )}
                      </Stack>
                      <Stack
                        sx={{
                          backgroundColor: isMyMessage ? '#1976D2' : '#2C2C2C',
                          padding: '16px 16px',
                          borderRadius: isMyMessage
                            ? '0px 16px 16px 16px'
                            : '16px 0px 16px 16px',
                          marginBottom: isLastMessageFromSameUser
                            ? '0px'
                            : '4px',
                        }}
                      >
                        <Typography sx={{ fontSize: '14px' }}>
                          {message.value}
                        </Typography>
                      </Stack>
                      {isLastMessageFromSameUser && (
                        <Stack>
                          <Typography
                            sx={{
                              fontSize: '12px',
                              padding: '4px 12px',
                              color: '#DDDDDD',
                              textAlign: isMyMessage ? 'left' : 'right',
                            }}
                          >
                            {convertToFormattedDateString(message.sentAtUtc)}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  );
                })}
              <div ref={lastMessageRef} />
            </Stack>
            <Stack
              boxShadow={5}
              sx={{
                backgroundColor: '#2C2C2C',
                borderRadius: '16px',
                padding: '16px',
              }}
            >
              <TextField
                fullWidth
                disabled={isMessageSending}
                placeholder="Napisz wiadomość..."
                value={messageInputValue}
                onChange={(event) => setMessageInputValue(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={messageInputValue.length === 0}
                        onClick={() => {
                          if (
                            messageInputValue.length > 0 &&
                            currentEvent &&
                            connection?.state === 'Connected'
                          ) {
                            setIsMessageSending(true);
                            connection
                              ?.invoke(
                                'SendMessage',
                                currentEvent.id,
                                messageInputValue,
                              )
                              .then(() => {
                                setMessageInputValue('');
                                if (lastMessageRef.current) {
                                  lastMessageRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                  });
                                }
                              })
                              .catch((error) => console.log(error))
                              .finally(() => setIsMessageSending(false));
                          }
                        }}
                      >
                        {isMessageSending ? (
                          <CircularProgress size="16px" />
                        ) : (
                          <SendIcon
                            sx={{
                              color:
                                messageInputValue.length === 0
                                  ? '#DDDDDD'
                                  : '#1976D2',
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    if (
                      messageInputValue.length > 0 &&
                      currentEvent &&
                      connection?.state === 'Connected'
                    ) {
                      setIsMessageSending(true);
                      connection
                        ?.invoke(
                          'SendMessage',
                          currentEvent.id,
                          messageInputValue,
                        )
                        .then(() => {
                          setMessageInputValue('');
                          if (lastMessageRef.current) {
                            lastMessageRef.current.scrollIntoView({
                              behavior: 'smooth',
                            });
                          }
                        })
                        .catch((error) => console.log(error))
                        .finally(() => setIsMessageSending(false));
                    }
                  }
                }}
              />
            </Stack>
          </Stack>
        </>
      )}
      <Stack
        flexDirection="column"
        boxShadow={3}
        sx={{
          display: {
            xs: isChatOpen ? 'none' : 'flex',
            md: 'flex',
          },
          height: '100%',

          backgroundColor: '#2C2C2C',
          borderRadius: '5px',
        }}
      >
        <Stack
          flexDirection="row"
          justifyContent="right"
          sx={eventDetailsPanelControlsStyle}
        >
          <Stack flexDirection="row" alignItems="center" gap="16px">
            {currentEvent &&
              !isParticipantOrOrganizer &&
              currentEvent.currentParticipantsQuantity !==
                currentEvent.maxParticipantsQuantity && (
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Dołącz"
                  onClick={handleAccept}
                />
              )}
            {currentEvent && isParticipant && (
              <>
                {!isChatOpen ? (
                  <RoundedButton
                    disabled={isLeavingOrJoining}
                    text="Czatuj"
                    onClick={() => {
                      dispatch(setIsChatOpen(true));
                      dispatch(setIsMapVisible(true));
                    }}
                  />
                ) : (
                  <RoundedButton
                    disabled={isLeavingOrJoining}
                    text="Zamknij czat"
                    onClick={() => dispatch(setIsChatOpen(false))}
                  />
                )}
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Opuść"
                  onClick={handleLeave}
                />
              </>
            )}
            {currentEvent && isOrganizer && (
              <>
                {!isChatOpen ? (
                  <RoundedButton
                    disabled={isLeavingOrJoining}
                    text="Czatuj"
                    onClick={() => {
                      dispatch(setIsChatOpen(true));
                      dispatch(setIsMapVisible(true));
                    }}
                  />
                ) : (
                  <RoundedButton
                    disabled={isLeavingOrJoining}
                    text="Zamknij czat"
                    onClick={() => dispatch(setIsChatOpen(false))}
                  />
                )}
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Edytuj"
                  onClick={handleEdit}
                />
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Odwołaj"
                  onClick={handleDelete}
                />
              </>
            )}
            {currentEvent && isAdmin && !isOrganizer && (
              <>
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Edytuj"
                  onClick={handleEdit}
                />
                <RoundedButton
                  disabled={isLeavingOrJoining}
                  text="Odwołaj"
                  onClick={handleDelete}
                />
              </>
            )}
          </Stack>
        </Stack>
        <Stack
          flexDirection="column"
          flexGrow={1}
          justifyContent={currentEvent ? 'flex-start' : 'center'}
          alignItems={currentEvent ? 'stretch' : 'center'}
          overflow="auto"
          sx={eventDetailsPanelMainAreaStyle}
        >
          {!isLeavingOrJoining && currentEvent ? (
            <>
              <Stack flexDirection="row">
                <Stack alignItems="center" justifyContent="center">
                  {currentEvent.sportsDiscipline === 0 && (
                    <img
                      src={footballImage}
                      style={{ height: '120px' }}
                      alt="Piłka nożna"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 1 && (
                    <img
                      src={volleyballImage}
                      style={{ height: '120px' }}
                      alt="Siatkówka"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 2 && (
                    <img
                      src={basketballImage}
                      style={{ height: '120px' }}
                      alt="Koszykówka"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 3 && (
                    <img
                      src={tennisImage}
                      style={{ height: '120px' }}
                      alt="Tenis"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 4 && (
                    <img
                      src={badmintonImage}
                      style={{ height: '120px' }}
                      alt="Badmintion"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 5 && (
                    <img
                      src={tableTennisImage}
                      style={{ height: '120px' }}
                      alt="Tenis stołowy"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 6 && (
                    <img
                      src={runningImage}
                      style={{ height: '120px' }}
                      alt="Bieganie"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 7 && (
                    <img
                      src={handballImage}
                      style={{ height: '120px' }}
                      alt="Piłka ręczna"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 8 && (
                    <img
                      src={golfImage}
                      style={{ height: '120px' }}
                      alt="Golf"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 9 && (
                    <img
                      src={cyclingImage}
                      style={{ height: '120px' }}
                      alt="Kolarstwo"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 10 && (
                    <img
                      src={dancingImage}
                      style={{ height: '120px' }}
                      alt="Taniec"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 11 && (
                    <img
                      src={gymImage}
                      style={{ height: '120px' }}
                      alt="Siłownia"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 12 && (
                    <img
                      src={iceSkatingImage}
                      style={{ height: '120px' }}
                      alt="Łyżwy"
                    />
                  )}
                  {currentEvent.sportsDiscipline === 13 && (
                    <img
                      src={otherImage}
                      style={{ height: '120px' }}
                      alt="Inne"
                    />
                  )}
                </Stack>
                <Stack
                  flexDirection="column"
                  justifyContent="space-between"
                  sx={eventDetailsPanelHeaderContentStyle}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    columnGap="16px"
                    rowGap="4px"
                    marginRight="16px"
                    marginBottom="16px"
                    flexWrap="wrap"
                  >
                    <Typography sx={eventDetailsPanelHeaderTitleStyle}>
                      {`${convertToTitleCase(currentEvent.title)}`}
                    </Typography>
                    <Stack flexDirection="row" gap="8px">
                      <Chip
                        variant="outlined"
                        label={
                          currentEvent.visibility === 1 ? (
                            <Visibility
                              sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            />
                          ) : (
                            <VisibilityOff
                              sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            />
                          )
                        }
                        sx={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '16px',
                        }}
                      />
                      <Chip
                        variant="outlined"
                        label={`${currentEvent?.minParticipantsAge} +`}
                        sx={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '16px',
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Stack flexDirection="column">
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      flexWrap="wrap"
                      gap="16px"
                      sx={eventDetailsPanelFirstInfoLineStyle}
                    >
                      <Stack flexDirection="row" alignItems="center">
                        <PersonOutlineOutlinedIcon
                          titleAccess="Organizator"
                          sx={eventDetailsPanelFirstInfoLineUserIconStyle}
                        />
                        <NavLink to={`/user/${currentEvent.organizer.id}`}>
                          <Typography
                            sx={eventDetailsPanelFirstInfoLineUserNameStyle}
                          >
                            {currentEvent.organizer.username}
                          </Typography>
                        </NavLink>
                      </Stack>
                      <Stack flexDirection="row" alignItems="center">
                        <GroupsOutlinedIcon
                          titleAccess="Liczba uczestników"
                          sx={
                            eventDetailsPanelFirstInfoLineParticipantsIconStyle
                          }
                        />
                        <Typography
                          sx={eventDetailsPanelFirstInfoLineParticipantsStyle}
                        >
                          {`${currentEvent.currentParticipantsQuantity}/${currentEvent.maxParticipantsQuantity}`}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      flexDirection="row"
                      columnGap="16px"
                      rowGap="4px"
                      flexWrap="wrap"
                    >
                      <Stack flexDirection="row" alignItems="center">
                        <AccessTimeIcon
                          sx={eventDetailsPanelSecondInfoLineStartTimeIconStyle}
                        />
                        <Typography
                          sx={eventDetailsPanelSecondInfoLineStartTimeStyle}
                        >{`${convertToFormattedDateString(
                          currentEvent?.startDateTimeUtc ?? '',
                        )}`}</Typography>
                      </Stack>
                      <Stack flexDirection="row" alignItems="center">
                        <AccessTimeIcon
                          sx={eventDetailsPanelSecondInfoLineEndTimeIconStyle}
                        />
                        <Typography
                          sx={eventDetailsPanelSecondInfoLineEndTimeStyle}
                        >{`${convertToFormattedDateString(
                          currentEvent?.endDateTimeUtc ?? '',
                        )}`}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack sx={eventDetailsPanelExtraInfoStyle}>
                <DifficultyIndicator difficulty={currentEvent.difficulty} />
              </Stack>
              <Stack sx={eventDetailsPanelDescriptionStyle}>
                <Typography sx={eventDetailsPanelDescriptionTitleStyle}>
                  Opis
                </Typography>
                <Typography sx={eventDetailsPanelDescriptionContentStyle}>
                  {currentEvent?.description}
                </Typography>
              </Stack>
              <Stack sx={eventDetailsPanelDescriptionStyle}>
                <Typography sx={eventDetailsPanelParticipantsTitleStyle}>
                  Uczestnicy
                </Typography>
                {isOrganizer && (
                  <Autocomplete
                    disabled={loading}
                    freeSolo
                    getOptionLabel={(option) =>
                      typeof option === 'string' ? option : option.username
                    }
                    open={open}
                    value={value}
                    inputValue={inputValue}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    onChange={(
                      event: any,
                      newValue: SearchedUserInfo | null | string,
                    ) => {
                      setValue(newValue);
                      if (newValue !== null) {
                        const API_TOKEN = localStorage.getItem('token');

                        setLoading(true);

                        axios
                          .post(
                            `${API_BASE_URL}/meeting/invite`,
                            {
                              meetingId: eventId,
                              newParticipantId: (newValue as SearchedUserInfo)
                                .id,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${API_TOKEN}`,
                              },
                            },
                          )
                          .then(() => {
                            const fetchEvent = async () => {
                              if (eventId) {
                                try {
                                  const response = await axios.get(
                                    `${API_BASE_URL}/meeting/${eventId}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${API_TOKEN}`,
                                      },
                                    },
                                  );
                                  const responseData: Event = response.data;
                                  setCurrentEvent(responseData);
                                } catch (error) {
                                  // Obsłuż błąd tutaj
                                }
                              }
                            };

                            fetchEvent();
                            setInputValue('');
                            setLoading(false);
                          })
                          .catch(() => {
                            setInputValue('');
                            setLoading(false);
                          });
                      }
                    }}
                    filterOptions={(x) => x}
                    options={options}
                    renderInput={(params) => (
                      <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        label="Zaproś uczestników"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderOption={(props, option) => {
                      return (
                        <Stack
                          component="li"
                          sx={{ width: '100%', height: '56px' }}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...props}
                          direction="row"
                          alignItems="center"
                          gap="16px"
                          padding="8px"
                        >
                          <PersonOutlineOutlinedIcon />
                          <Typography
                            sx={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                            }}
                          >
                            {(option as SearchedUserInfo).username}
                          </Typography>
                        </Stack>
                      );
                    }}
                    sx={{ width: 300, marginBottom: '16px' }}
                  />
                )}
                <Stack direction="row" flexWrap="wrap" gap="8px">
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      backgroundColor: '#202020',
                      color: '#DDDDDD',
                      width: '300px',
                      height: '56px',
                      padding: '0px 10px',
                      borderRadius: '5px',
                    }}
                  >
                    <HowToRegOutlinedIcon
                      sx={eventDetailsPanelParticipantsListGreenIconStyle}
                    />
                    <NavLink to={`/user/${currentEvent.organizer.id}`}>
                      <Typography sx={eventDetailsPanelDescriptionContentStyle}>
                        {currentEvent?.organizer.username}
                      </Typography>
                    </NavLink>
                  </Stack>

                  {[...currentEvent.meetingParticipants]
                    .sort((firstParticipant, secondParticipant) => {
                      const statusOrder: { [key: number]: number } = {
                        1: 0,
                        0: 1,
                        2: 2,
                      };

                      const firstStatus = statusOrder[firstParticipant.status];
                      const secondStatus =
                        statusOrder[secondParticipant.status];

                      return firstStatus - secondStatus;
                    })
                    .map((participant) => (
                      <Stack
                        key={participant.id}
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          backgroundColor: '#202020',
                          color: '#DDDDDD',
                          width: '300px',
                          height: '56px',
                          padding: '0px 10px',
                          borderRadius: '5px',
                        }}
                      >
                        <Stack direction="row" alignItems="center">
                          {participant.status === 0 && (
                            <ScheduleSendOutlinedIcon
                              sx={
                                eventDetailsPanelParticipantsListYellowIconStyle
                              }
                            />
                          )}
                          {participant.status === 1 && (
                            <HowToRegOutlinedIcon
                              sx={
                                eventDetailsPanelParticipantsListGreenIconStyle
                              }
                            />
                          )}
                          {participant.status === 2 && (
                            <CancelScheduleSendOutlinedIcon
                              sx={eventDetailsPanelParticipantsListRedIconStyle}
                            />
                          )}
                          <NavLink to={`/user/${participant.id}`}>
                            <Typography
                              sx={eventDetailsPanelDescriptionContentStyle}
                            >
                              {participant.username}
                            </Typography>
                          </NavLink>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          {isOrganizer &&
                            participant.status === 1 &&
                            (participant.id === kickedId ? (
                              <CircularProgress size={18} />
                            ) : (
                              !kickedId && (
                                <HighlightOffIcon
                                  sx={{
                                    marginLeft: '5px',
                                    color: '#DDDDDD',
                                    '&:hover': {
                                      cursor: 'pointer',
                                      color: kickedId ? '#DDDDDD' : '#FF3700',
                                    },
                                  }}
                                  onClick={() => handleKick(participant.id)}
                                />
                              )
                            ))}
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Stack>
              <Stack sx={eventDetailsPanelDescriptionStyle}>
                <Typography sx={eventDetailsPanelParticipantsTitleStyle}>
                  {`Wydarzenie utworzone: `}
                  <Box component="span" fontWeight={400}>
                    {convertToFormattedDateString(currentEvent.created)}
                  </Box>
                </Typography>
              </Stack>
              {currentEvent.sportsDiscipline === 2 && (
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  sx={{ display: { xs: 'none', md: 'flex' }, height: '60px' }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isJordanActivated}
                        onChange={(event) =>
                          setIsJordanActivated(event.target.checked)
                        }
                      />
                    }
                    label="Jordan"
                  />
                </Stack>
              )}
            </>
          ) : (
            <Stack flexGrow={1} justifyContent="center" alignItems="center">
              <CircularProgress size="160px" thickness={2} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default EventDetailsPanel;
