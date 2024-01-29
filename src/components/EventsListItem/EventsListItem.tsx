import React from 'react';
import { NavLink } from 'react-router-dom';
import { Chip, Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EventsListItemProps } from '../../types';
import {
  eventsListItemStyle,
  eventsListItemContentStyle,
  eventsListItemTitleStyle,
  eventsListItemContentOrganizerIconStyle,
  eventsListItemContentOrganizerTextStyle,
  eventsListItemContentLinkStyle,
  eventsListItemContentParticipantsIconStyle,
  eventsListItemContentParticipantsTextStyle,
  eventsListItemContentEndTimeIconStyle,
  eventsListItemContentEndTimeTextStyle,
  eventsListItemContentStartTimeIconStyle,
  eventsListItemContentStartTimeTextStyle,
} from './EventsListItemStyles';
import convertToFormattedDateString from '../../utils/dateUtils';
import convertToTitleCase from '../../utils/textUtils';
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

import CompactDifficultyIndicator from '../CompactDifficultyIndicator/CompactDifficultyIndicator';

function EventsListItem({ event }: EventsListItemProps) {
  return (
    <Stack flexDirection="column" sx={eventsListItemStyle}>
      <NavLink
        to={`/events/${event.id}`}
        style={eventsListItemContentLinkStyle}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          boxShadow={3}
          sx={eventsListItemContentStyle}
        >
          <Stack sx={{ width: '60px', marginRight: '12px' }}>
            {event.sportsDiscipline === 0 && (
              <img src={footballImage} alt="Piłka nożna" />
            )}
            {event.sportsDiscipline === 1 && (
              <img src={volleyballImage} alt="Siatkówka" />
            )}
            {event.sportsDiscipline === 2 && (
              <img src={basketballImage} alt="Koszykówka" />
            )}
            {event.sportsDiscipline === 3 && (
              <img src={tennisImage} alt="Tenis" />
            )}
            {event.sportsDiscipline === 4 && (
              <img src={badmintonImage} alt="Badmintion" />
            )}
            {event.sportsDiscipline === 5 && (
              <img src={tableTennisImage} alt="Tenis stołowy" />
            )}
            {event.sportsDiscipline === 6 && (
              <img src={runningImage} alt="Bieganie" />
            )}
            {event.sportsDiscipline === 7 && (
              <img src={handballImage} alt="Piłka ręczna" />
            )}
            {event.sportsDiscipline === 8 && <img src={golfImage} alt="Golf" />}
            {event.sportsDiscipline === 9 && (
              <img src={cyclingImage} alt="Kolarstwo" />
            )}
            {event.sportsDiscipline === 10 && (
              <img src={dancingImage} alt="Taniec" />
            )}
            {event.sportsDiscipline === 11 && (
              <img src={gymImage} alt="Siłownia" />
            )}
            {event.sportsDiscipline === 12 && (
              <img src={iceSkatingImage} alt="Łyżwy" />
            )}
            {event.sportsDiscipline === 13 && (
              <img src={otherImage} alt="Inne" />
            )}
          </Stack>
          <Stack
            flexGrow={1}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              columnGap="8px"
              rowGap="2px"
              flexWrap="wrap"
              marginBottom="8px"
            >
              <Typography sx={eventsListItemTitleStyle}>
                {`${convertToTitleCase(event.title)}`}
              </Typography>
              <Stack flexDirection="row" gap="4px">
                <Chip
                  variant="outlined"
                  size="small"
                  label={
                    event.visibility === 1 ? (
                      <Visibility
                        sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                          fontSize: '16px',
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                          fontSize: '16px',
                        }}
                      />
                    )
                  }
                  sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 'bold',
                  }}
                />
                <Chip
                  variant="outlined"
                  size="small"
                  label={`${event.minParticipantsAge} +`}
                  sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                />
                <Chip
                  variant="outlined"
                  size="small"
                  label={
                    <CompactDifficultyIndicator difficulty={event.difficulty} />
                  }
                  sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap="12px"
              marginBottom="4px"
            >
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <PersonOutlineOutlinedIcon
                  sx={eventsListItemContentOrganizerIconStyle}
                />
                <Typography sx={eventsListItemContentOrganizerTextStyle}>
                  {event.organizerUsername}
                </Typography>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <GroupsOutlinedIcon
                  sx={eventsListItemContentParticipantsIconStyle}
                />
                <Typography sx={eventsListItemContentParticipantsTextStyle}>
                  {`${event.currentParticipantsQuantity}/${event.maxParticipantsQuantity}`}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
              columnGap="8px"
              rowGap="4px"
            >
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <AccessTimeIcon sx={eventsListItemContentStartTimeIconStyle} />
                <Typography
                  sx={eventsListItemContentStartTimeTextStyle}
                >{`${convertToFormattedDateString(
                  event.startDateTimeUtc,
                )}`}</Typography>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <AccessTimeIcon sx={eventsListItemContentEndTimeIconStyle} />
                <Typography
                  sx={eventsListItemContentEndTimeTextStyle}
                >{`${convertToFormattedDateString(
                  event.endDateTimeUtc,
                )}`}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </NavLink>
    </Stack>
  );
}

export default EventsListItem;
