/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { BarChart } from '@mui/x-charts/BarChart';

import {
  achievementsListSectionStyle,
  achievementsSectionStyle,
  avatarAreaUserInfoStyle,
  avatarUserInfoStyle,
  bottomUserProfileSectionStyle,
  friendsStackUserProfileStyle,
  iconButtonUserInfoStyle,
  outerStackUserProfileStyle,
  singleEventInUserInfoWrapper,
  userProfileInfoStyle,
  userProfileInfoUpperPartStyle,
  whiteTextAndOpenSansFont,
} from './UserProfileStyle';
import FriendsList from '../FriendsList/FriendsList';
import {
  saveUserPhoto,
  selectUserAge,
  selectUserFirstName,
  selectUserLastName,
  selectUserPhoto,
  selectUserRecentMeetings,
  selectUserUserName,
} from '../../redux/userSlice';
import RoundedButton from '../CustomButton/RoundedButton';
import Achievement from '../Achievement/Achievement';
import EventItem from '../EventItem/EventItem';
import { API_BASE_URL } from '../../constants';
import { convertError, handleClickVariant } from '../../utils/errorHandleUtils';
import { useAppDispatch } from '../../redux/store';
import { Statistics } from '../../types';
// import Friend from '../Friend/Friend';
import { iconButtonHeaderStyle } from '../Header/HeaderStyle';

function UserProfile() {
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    navigate('/log-in');
  }
  const dispatch = useAppDispatch();
  const firstName = useSelector(selectUserFirstName);
  const lastName = useSelector(selectUserLastName);
  const userName = useSelector(selectUserUserName);
  const userAge = useSelector(selectUserAge);
  const userPhotoUrl = useSelector(selectUserPhoto);
  const userRecentMeeting = useSelector(selectUserRecentMeetings);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileSelected, setFileSelected] = useState<any>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [achievementList, setAchievementListPreview] = useState<any>();
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(false);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statisticsList, setStatistics] = useState<Statistics>();
  const [barStatistic, setBarStatistic] = useState<any[]>();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const flattenAchievements = (achievementListByCategory: any) => {
    let categoryLists = achievementListByCategory.map((category: any) =>
      category.achievements.slice(),
    );
    categoryLists = categoryLists.reverse();

    const flattenList = [];
    // eslint-disable-next-line no-debugger
    debugger;
    const maxLength = Math.max(0, 4);

    for (let i = 0; i < maxLength; i += 1) {
      for (let j = 0; j < categoryLists.length; j += 1) {
        const categoryAchievements = categoryLists[j];
        if (categoryAchievements.length > 0) {
          flattenList.push(categoryAchievements.pop());
        }
        if (flattenList.length >= 4) {
          setAchievementListPreview(flattenList);
          return;
        }
      }
    }

    const mockAchievements = Array.from({
      length: Math.max(0, 4 - flattenList.length),
    }).map(() => ({
      id: `NOTOBTAINED`,
      description: `Unlock more!`,
      obtained: null,
    }));

    setAchievementListPreview(flattenList.concat(mockAchievements));
  };

  const fetchAchievementPreview = async () => {
    try {
      setIsLoadingAchievements(true);
      const response = await axios.get(
        `${API_BASE_URL}/Achievements/user_achievements`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      flattenAchievements(response.data);
      setIsLoadingAchievements(false);
    } catch (e: any) {
      convertError(e);
    }
  };

  const fetchStatistics = async () => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      setIsLoadingStatistics(true);
      const response = await axios.get(`${API_BASE_URL}/Statistics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStatistics(response.data);
      const barStatisticObject = [
        {
          xAxis: response.data.meetingsOrganized,
          yAxis: 'Zorganizowane',
        },
        {
          xAxis: response.data.meetingsParticipated,
          yAxis: 'Uczestnik',
        },
      ];
      setBarStatistic(barStatisticObject);
      setIsLoadingStatistics(false);
    } catch (e: any) {
      convertError(e);
    }
  };

  const saveFileSelected = (e: any) => {
    if (e.target.files[0]) {
      setFileSelected(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async () => {
    const formData = new FormData();
    formData.append('file', fileSelected);
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios
        .post(`${API_BASE_URL}/UserDetails/image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => handleClickVariant(`Zdjęcie zostało zmienione.`, 'success'))
        .then(() => dispatch(saveUserPhoto({})))
        .then(() => setFileSelected(null))
        .then(() => setLoading(false));
    } catch (ex) {
      convertError(ex);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievementPreview();
    fetchStatistics();
    dispatch(saveUserPhoto({}));
  }, []);

  let avatarContent;

  if (fileSelected) {
    if (loading) {
      avatarContent = (
        <>
          <CircularProgress
            sx={{
              color: 'info.main',
              position: 'absolute',
              zIndex: 1,
            }}
            size={80}
          />
          <img
            src={imagePreviewUrl!}
            alt="Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              overflow: 'hidden',
              opacity: 0.5,
            }}
          />
        </>
      );
    } else {
      avatarContent = (
        <img
          src={imagePreviewUrl!}
          alt="Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        />
      );
    }
  } else if (userPhotoUrl) {
    avatarContent = (
      <img
        src={userPhotoUrl}
        alt="Avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      />
    );
  } else {
    avatarContent = (
      <FaceRoundedIcon
        sx={iconButtonUserInfoStyle}
        color="info"
        fontSize="large"
      />
    );
  }

  let editingAvatarContent;
  if (isEditing) {
    editingAvatarContent = (
      <>
        <EditIcon sx={{ zIndex: 1, fontSize: '4rem' }} />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: 0.4,
          }}
        >
          {avatarContent}
        </div>
      </>
    );
  } else {
    editingAvatarContent = avatarContent;
  }

  const chartSetting = {
    xAxis: [
      {
        label: 'Liczba spotkań',
      },
    ],
    width: isSmallScreen
      ? 300
      : isMediumScreen
      ? 500
      : isLargeScreen
      ? 450
      : 300,
    height: isSmallScreen
      ? 130
      : isMediumScreen
      ? 150
      : isLargeScreen
      ? 200
      : 150,
  };

  return (
    <Box sx={outerStackUserProfileStyle}>
      <Stack sx={friendsStackUserProfileStyle}>
        <FriendsList />
      </Stack>
      <Stack sx={userProfileInfoStyle}>
        <Stack sx={userProfileInfoUpperPartStyle}>
          <Stack
            sx={{
              // minHeight: '50%',
              width: '50%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <ListItemAvatar sx={avatarAreaUserInfoStyle}>
              <Avatar sx={avatarUserInfoStyle}>
                <IconButton
                  sx={iconButtonUserInfoStyle}
                  onClick={handleAvatarClick}
                  onMouseEnter={() => (loading ? {} : setIsEditing(true))}
                  onMouseLeave={() => setIsEditing(false)}
                >
                  {editingAvatarContent}
                </IconButton>
              </Avatar>
              {loading ? null : (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={saveFileSelected}
                  name="formFile"
                />
              )}
              {fileSelected ? (
                <Stack
                  flexDirection="row"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Tooltip title="Anuluj" placement="left">
                    <IconButton
                      color="primary"
                      aria-label="cancel-photo"
                      onClick={() => setFileSelected(null)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Zaakceptuj zdjęcie" placement="right">
                    <IconButton
                      color="primary"
                      aria-label="accept-photo"
                      onClick={handleFileChange}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ) : null}
            </ListItemAvatar>

            <Stack p={4} sx={{ justifyContent: 'space-evenly' }}>
              <ListItemText
                sx={whiteTextAndOpenSansFont}
                primary={
                  <Typography variant="h3">
                    <b>
                      {firstName} {lastName} ({userAge}){' '}
                    </b>
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle1">{userName}</Typography>
                }
              />
              <Stack direction="row">
                <RoundedButton
                  text="Edytuj konto"
                  onClick={() => navigate('accountsettings')}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            p={4}
            sx={{
              width: '50%',
              // minHeight: '50%',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {!isLoadingStatistics && statisticsList ? (
              <Stack
                display="flex"
                flexDirection="row"
                // justifyContent="center"
                alignItems="center"
                gap="20px"
              >
                <Typography>Ulubiony użytkownik: </Typography>

                {statisticsList.favoriteParticipant ? (
                  <>
                    <ListItemAvatar>
                      <NavLink
                        to={`/user/${statisticsList.favoriteParticipant.userIdentityDto.id}`}
                      >
                        <Avatar>
                          <IconButton
                            sx={{ ...iconButtonHeaderStyle, padding: '20px' }}
                          >
                            {statisticsList.favoriteParticipant.userIdentityDto
                              .image ? (
                              <img
                                src={
                                  statisticsList.favoriteParticipant
                                    .userIdentityDto.image.url
                                }
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
                      </NavLink>
                    </ListItemAvatar>
                    <Typography>
                      {
                        statisticsList.favoriteParticipant.userIdentityDto
                          .username
                      }
                    </Typography>
                  </>
                ) : (
                  <Typography>
                    Brak aktualnego ulubionego użytkownika.
                  </Typography>
                )}
              </Stack>
            ) : // <Friend
            //   id={statisticsList.favoriteParticipant.userIdentityDto.id}
            //   friendUsername={
            //     statisticsList.favoriteParticipant.userIdentityDto.username
            //   }
            //   image={statisticsList.favoriteParticipant.userIdentityDto.image}
            // />
            null}
            <Divider />
            <Stack sx={{ width: '100%' }}>
              {!isLoadingStatistics && barStatistic ? (
                <BarChart
                  sx={{
                    '.MuiChartsAxis-tickLabel': {
                      transform: 'translateX(5%)',
                      textAnchor: 'start',
                      // Stylizacja dla elementów z klasą MuiChartsAxis-tickLabel
                      /* Twój kod stylizacji tutaj */
                    },
                  }}
                  dataset={barStatistic}
                  yAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'yAxis',
                    },
                  ]}
                  series={[
                    {
                      dataKey: 'xAxis',
                      label: 'Powiązane z tobą spotkania',
                      color: '#2196f3',
                    },
                  ]}
                  layout="horizontal"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...chartSetting}
                />
              ) : (
                <CircularProgress size="80px" thickness={2} />
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={bottomUserProfileSectionStyle}>
          <Stack spacing={4} sx={achievementsSectionStyle}>
            <Typography variant="h4">Osiągnięcia:</Typography>
            <Stack sx={achievementsListSectionStyle}>
              {!isLoadingAchievements ? (
                achievementList &&
                achievementList.map((achievement: any) => (
                  <Achievement
                    id={achievement.id}
                    description={achievement.description}
                    obtained={achievement.obtained}
                  />
                ))
              ) : (
                <CircularProgress size="80px" thickness={2} />
              )}
            </Stack>
            <Stack direction="row">
              <RoundedButton
                text="Zobacz więcej..."
                onClick={() => {
                  navigate('achievements');
                }}
              />
            </Stack>
          </Stack>
          <Stack spacing={4} sx={achievementsSectionStyle}>
            <Typography variant="h4">Ostatnie wydarzenie:</Typography>
            <Stack sx={achievementsListSectionStyle}>
              {userRecentMeeting.length ? (
                userRecentMeeting.map((meeting: any) => (
                  <Box sx={singleEventInUserInfoWrapper}>
                    <EventItem
                      id={meeting.id}
                      title={meeting.title}
                      startDateTimeUtc={meeting.startDateTimeUtc}
                      endDateTimeUtc={meeting.endDateTimeUtc}
                      organizerUsername={meeting.organizerUsername}
                    />
                  </Box>
                ))
              ) : (
                <Typography>
                  Użytkownik nie wziął jeszcze udziału w żadnym wydarzeniu.
                </Typography>
              )}
            </Stack>
            <Stack direction="row">
              <RoundedButton
                text="Zobacz wszystkie"
                onClick={() => {
                  navigate('eventsHistory');
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UserProfile;
