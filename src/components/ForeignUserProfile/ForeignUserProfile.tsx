/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  CircularProgress,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import { BarChart } from '@mui/x-charts';
import { useSelector } from 'react-redux';
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
} from './ForeignUserProfileStyle';
import FriendsList from '../FriendsList/FriendsList';
import RoundedButton from '../CustomButton/RoundedButton';
import Achievement from '../Achievement/Achievement';
import EventItem from '../EventItem/EventItem';
import FriendsService from '../../services/friendsService';
import { OtherUserInfo, Statistics } from '../../types';
import { handleClickVariant, convertError } from '../../utils/errorHandleUtils';
import { API_BASE_URL } from '../../constants';
import { iconButtonHeaderStyle } from '../Header/HeaderStyle';
import zpiApi from '../../api';
import { selectUserUserName } from '../../redux/userSlice';

function ForeignUserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [otherUser, setOtherUser] = useState<OtherUserInfo>();
  const [loading, setLoading] = useState(true);
  const userName = useSelector(selectUserUserName);

  const [achievementList, setAchievementListPreview] = useState<any>();

  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
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
      const response = await zpiApi.get(
        `${API_BASE_URL}/Achievements/${id}/user_achievements`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      flattenAchievements(response.data);
    } catch (e: any) {
      convertError(e);
    }
  };

  const fetchStatistics = async () => {
    try {
      setIsLoadingStatistics(true);
      const response = await zpiApi.get(`${API_BASE_URL}/Statistics/${id}`, {
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

  const fetchUserData = async () => {
    try {
      const response = await FriendsService.getOtherUserDetails(id!);
      setOtherUser(response);
      setLoading(false);
    } catch (error) {
      convertError(error);
      console.error('Błąd podczas pobierania znajomych:', error);
    }
  };
  const inviteUserToFriends = async (userId: string) => {
    try {
      await FriendsService.inviteUserToFriends(userId);
      handleClickVariant('Użytkownik został zaproszony!', 'success');
      fetchUserData();
    } catch (err: any) {
      convertError(err);
    }
  };
  const acceptUserToFriends = async (userId: string) => {
    try {
      await FriendsService.acceptUserToFriends(userId);
      handleClickVariant('Użytkownik został zaakceptowany!', 'success');
      fetchUserData();
    } catch (err: any) {
      convertError(err);
    }
  };
  const removeUserFromFriends = async (userId: string) => {
    try {
      await FriendsService.removeUserFromFriends(userId);
      handleClickVariant('Użytkownik został usunięty!', 'success');
      fetchUserData();
    } catch (err: any) {
      convertError(err);
    }
  };

  const blockUser = async (userId: string) => {
    try {
      await FriendsService.blockUser(userId);
      handleClickVariant('Użytkownik został zablokowany!', 'success');
      fetchUserData();
    } catch (err: any) {
      convertError(err);
    }
  };

  const unblockUser = async (userId: string) => {
    try {
      await FriendsService.unblockUser(userId);
      handleClickVariant('Użytkownik został odblokowany!', 'success');
      fetchUserData();
    } catch (err: any) {
      convertError(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchStatistics();
    fetchAchievementPreview();
  }, [id]);

  let avatarContent;
  if (otherUser?.image) {
    avatarContent = (
      <img
        src={otherUser?.image.url}
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

  let firstButton;
  if (
    otherUser?.friendshipStatusDto.status === 0 &&
    otherUser?.friendshipStatusDto.isOriginated === true
  ) {
    firstButton = (
      <RoundedButton text="Zaproszenie wysłane" onClick={() => {}} disabled />
    );
  } else if (
    otherUser?.friendshipStatusDto.status === 0 &&
    otherUser?.friendshipStatusDto.isOriginated === false
  ) {
    firstButton = (
      <RoundedButton text="Akceptuj" onClick={() => acceptUserToFriends(id!)} />
    );
  } else if (otherUser?.friendshipStatusDto.status === 1) {
    firstButton = (
      <RoundedButton text="Usuń" onClick={() => removeUserFromFriends(id!)} />
    );
  } else if (
    otherUser?.friendshipStatusDto.status === 3 &&
    otherUser?.friendshipStatusDto.isOriginated === false
  ) {
    firstButton = (
      <RoundedButton text="Jesteś zablokowany" onClick={() => {}} disabled />
    );
  } else if (
    otherUser?.friendshipStatusDto.status === 3 &&
    otherUser?.friendshipStatusDto.isOriginated === true
  ) {
    firstButton = (
      <RoundedButton
        text="Zablokowałeś tę osobę."
        onClick={() => {}}
        disabled
      />
    );
  } else
    firstButton = (
      <RoundedButton text="Zaproś" onClick={() => inviteUserToFriends(id!)} />
    );

  let secondButton;
  if (
    otherUser?.friendshipStatusDto.status === 3 &&
    otherUser?.friendshipStatusDto.isOriginated === true
  ) {
    secondButton = (
      <RoundedButton text="Odblokuj" onClick={() => unblockUser(id!)} />
    );
  } else if (
    otherUser?.friendshipStatusDto.status === 3 &&
    otherUser?.friendshipStatusDto.isOriginated === false
  ) {
    secondButton = (
      <RoundedButton text="Jesteś zablokowany" onClick={() => {}} disabled />
    );
  } else
    secondButton = (
      <RoundedButton text="Zablokuj" onClick={() => blockUser(id!)} />
    );

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
              {loading ? (
                <CircularProgress sx={{ color: 'info.main' }} size={100} />
              ) : (
                <Avatar sx={avatarUserInfoStyle}>
                  <IconButton sx={iconButtonUserInfoStyle}>
                    {avatarContent}
                  </IconButton>
                </Avatar>
              )}
            </ListItemAvatar>

            <Stack p={4} sx={{ justifyContent: 'space-evenly' }}>
              <ListItemText
                sx={whiteTextAndOpenSansFont}
                primary={
                  otherUser?.firstName ? (
                    <Typography variant="h3">
                      <b>
                        {otherUser?.firstName} {otherUser?.lastName} (
                        {otherUser?.age}){' '}
                      </b>
                    </Typography>
                  ) : (
                    <Typography variant="h3">
                      <b>{otherUser?.username}</b>
                    </Typography>
                  )
                }
                secondary={
                  otherUser?.firstName ? (
                    <Typography variant="subtitle1">
                      {otherUser?.username}
                    </Typography>
                  ) : null
                }
              />
              <Stack direction="row" gap={2}>
                {firstButton}
                {secondButton}
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
                        to={
                          statisticsList.favoriteParticipant.userIdentityDto
                            .username === userName
                            ? '/profile'
                            : `/user/${statisticsList.favoriteParticipant.userIdentityDto.id}`
                        }
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
            ) : // kod moze zostac uzyty pozniej <Friend
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
                    },
                  }}
                  dataset={barStatistic}
                  yAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'yAxis',
                      tickMinStep: 1,
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
              {achievementList &&
                achievementList.map((achievement: any) => (
                  <Achievement
                    id={achievement.id}
                    description={achievement.description}
                    obtained={achievement.obtained}
                  />
                ))}
            </Stack>
            <Stack direction="row">
              <RoundedButton
                text="Zobacz więcej..."
                onClick={() => navigate(`/achievements/${id}`)}
              />
            </Stack>
          </Stack>
          <Stack spacing={4} sx={achievementsSectionStyle}>
            <Typography variant="h4">Ostatnie wydarzenie:</Typography>
            <Stack sx={achievementsListSectionStyle}>
              {otherUser?.recentMeetings.length ? (
                otherUser?.recentMeetings.map((event) => (
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
                <Typography>
                  Użytkownik nie wziął jeszcze udziału w żadnym wydarzeniu.
                </Typography>
              )}
            </Stack>
            <Stack direction="row">
              <RoundedButton
                text="Zobacz wszystkie wydarzenia"
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

export default ForeignUserProfile;
