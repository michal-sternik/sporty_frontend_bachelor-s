import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FriendsList from '../FriendsList/FriendsList';
import {
  friendsStackUserProfileStyle,
  outerStackUserProfileStyle,
} from '../UserProfile/UserProfileStyle';
import { API_BASE_URL } from '../../constants';
import Achievement from '../Achievement/Achievement';
import {
  achievementCategoryStyle,
  achievementsSectionStyle,
} from './AchievementsStyle';
import outerStackFriendsInvitationListStyle from '../FriendsInvitationList/FriendsInvitationListStyle';
import { convertError } from '../../utils/errorHandleUtils';
import zpiApi from '../../api';

interface AchievementsProps {
  foreign: boolean;
}

function Achievements({ foreign }: AchievementsProps) {
  const [achievementListByCategory, setAchievementList] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams();

  const sortAchievements = (achievementsList: any) => {
    return achievementsList.map((category: any) => {
      const sortedAchievements = category.achievements.sort(
        (a: any, b: any) => {
          if (a.obtained === b.obtained) {
            return 0;
          }

          if (a.obtained) {
            return -1;
          }
          return 1;
        },
      );

      return { ...category, achievements: sortedAchievements };
    });
  };

  const handleGetAchievements = async () => {
    setIsLoading(true);
    try {
      if (foreign) {
        const response = await zpiApi.get(
          `${API_BASE_URL}/Achievements/${id.friendId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        setAchievementList(sortAchievements(response.data));
      } else {
        const response = await zpiApi.get(`${API_BASE_URL}/Achievements`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setAchievementList(sortAchievements(response.data));
      }
      setIsLoading(false);
    } catch (e: any) {
      convertError(e);
    }
  };

  useEffect(() => {
    handleGetAchievements();
  }, []);

  return (
    <Box sx={outerStackUserProfileStyle}>
      <Stack sx={friendsStackUserProfileStyle}>
        <FriendsList />
      </Stack>
      <Stack sx={outerStackFriendsInvitationListStyle}>
        <Stack
          sx={
            isLoading
              ? {
                  ...achievementsSectionStyle,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : achievementsSectionStyle
          }
        >
          {!isLoading ? (
            achievementListByCategory &&
            achievementListByCategory.map((achievementCategory: any) => (
              <>
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    marginLeft: '1%',
                  }}
                >
                  {achievementCategory.category}
                </Typography>
                <Divider />
                <Stack sx={achievementCategoryStyle}>
                  {achievementCategory.achievements.map((achievement: any) => (
                    <Achievement
                      id={achievement.id}
                      description={achievement.description}
                      obtained={achievement.obtained}
                    />
                  ))}
                </Stack>
              </>
            ))
          ) : (
            <CircularProgress size="160px" thickness={2} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Achievements;
