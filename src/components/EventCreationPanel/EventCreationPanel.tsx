import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { plPL } from '@mui/x-date-pickers/locales/plPL';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import { useMap } from 'react-map-gl';
import {
  eventCreationPanelContentStyle,
  eventCreationPanelControlsStyle,
  eventCreationPanelEventCreationFormCoordsLatStyle,
  eventCreationPanelEventCreationFormCoordsLonStyle,
  eventCreationPanelEventCreationFormCoordsRowStyle,
  eventCreationPanelEventCreationFormDatesRowStyle,
  eventCreationPanelEventCreationFormDescriptionStyle,
  eventCreationPanelEventCreationFormDifficultyStyle,
  eventCreationPanelEventCreationFormDisciplineFormControlStyle,
  eventCreationPanelEventCreationFormDisciplineSelectStyle,
  eventCreationPanelEventCreationFormEndDateStyle,
  eventCreationPanelEventCreationFormPlayersAndDifficultyRowStyle,
  eventCreationPanelEventCreationFormPlayersStyle,
  eventCreationPanelEventCreationFormStartDateStyle,
  eventCreationPanelEventCreationFormStyle,
  eventCreationPanelEventCreationFormTitleStyle,
  eventCreationPanelEventCreationSectionStyle,
  eventCreationPanelStyle,
  eventCreationPanelTitleStyle,
} from './EventCreationPanelStyles';
import {
  setEventCreationCoordinates,
  setIsEventCreationOn,
  setIsMapVisible,
} from '../../redux/mapSlice';
import { useAppDispatch } from '../../redux/store';
import { addEvent, selectRecentEvent } from '../../redux/eventsSlice';
import { EventCreationPanelProps } from '../../types';
import RoundedButton from '../CustomButton/RoundedButton';
import { API_BASE_URL, CLOSE_ZOOM } from '../../constants';
import { convertError } from '../../utils/errorHandleUtils';

function EventCreationPanel({ isEditing }: EventCreationPanelProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { eventsMap: mapRef } = useMap();
  const currentEvent = useSelector(selectRecentEvent);

  const [title, setTitle] = useState<string>(
    isEditing && currentEvent ? currentEvent.title : '',
  );
  const [description, setDescription] = useState<string>(
    isEditing && currentEvent ? currentEvent.description : '',
  );
  const [maxPlayers, setMaxPlayers] = useState<number>(
    isEditing && currentEvent ? currentEvent.maxParticipantsQuantity : 1,
  );
  const [difficulty, setDifficulty] = useState<number>(
    isEditing && currentEvent ? currentEvent.difficulty : 0,
  );
  const [discipline, setDiscipline] = useState<number>(
    isEditing && currentEvent ? currentEvent.sportsDiscipline : 0,
  );
  const [minAge, setMinAge] = useState<number>(
    isEditing && currentEvent ? currentEvent.minParticipantsAge : 1,
  );
  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    isEditing && currentEvent
      ? dayjs(`${currentEvent.startDateTimeUtc}Z`)
      : null,
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    isEditing && currentEvent ? dayjs(`${currentEvent.endDateTimeUtc}Z`) : null,
  );
  const [isPrivate, setPrivate] = React.useState<boolean>(
    isEditing && currentEvent ? currentEvent.visibility === 0 : false,
  );

  const handleAccept = () => {
    dayjs.extend(utc);
    setIsSubmitting(true);

    if (!isEditing) {
      const API_TOKEN = localStorage.getItem('token');
      axios
        .post(
          `${API_BASE_URL}/meeting/`,
          {
            title: title ?? '',
            description: description ?? '',
            latitude: parseFloat(searchParams.get('lat') ?? '0'),
            longitude: parseFloat(searchParams.get('lng') ?? '0'),
            startDateTimeUtc: startTime?.utc().format() ?? '',
            endDateTimeUtc: endTime?.utc().format() ?? '',
            difficulty: difficulty ?? 0,
            sportsDiscipline: discipline ?? 0,
            maxParticipantsQuantity: maxPlayers ?? 1,
            minParticipantsAge: minAge ?? 1,
            visibility: isPrivate ? 0 : 1,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          },
        )
        .then((response) => {
          dispatch(setIsEventCreationOn(false));
          dispatch(addEvent(response.data));
          navigate(`/events/${response.data.id}`);
        })
        .catch((error) => {
          convertError(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      const API_TOKEN = localStorage.getItem('token');
      axios
        .put(
          `${API_BASE_URL}/meeting/`,
          {
            id: currentEvent?.id,
            title: title ?? '',
            description: description ?? '',
            latitude: parseFloat(searchParams.get('lat') ?? '0'),
            longitude: parseFloat(searchParams.get('lng') ?? '0'),
            startDateTimeUtc: startTime?.utc().format() ?? '',
            endDateTimeUtc: endTime?.utc().format() ?? '',
            difficulty: difficulty ?? 0,
            sportsDiscipline: discipline ?? 0,
            maxParticipantsQuantity: maxPlayers ?? 1,
            minParticipantsAge: minAge ?? 1,
            visibility: isPrivate ? 0 : 1,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          },
        )
        .then(() => {
          dispatch(setIsEventCreationOn(false));
          navigate(`/events/`);
        })
        .catch((error) => {
          convertError(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/log-in');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(setIsMapVisible(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsEventCreationOn(true));
    dispatch(
      setEventCreationCoordinates([
        Number(searchParams.get('lat')),
        Number(searchParams.get('lng')),
      ]),
    );

    mapRef?.flyTo({
      center: [
        Number(searchParams.get('lng')),
        Number(searchParams.get('lat')),
      ],
      zoom: CLOSE_ZOOM,
    });

    return () => {
      dispatch(setIsEventCreationOn(false));
    };
  }, [mapRef, searchParams, dispatch]);

  const handleIsPrivateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPrivate(event.target.checked);
  };

  return (
    <Stack sx={eventCreationPanelStyle}>
      <Stack
        boxShadow={3}
        overflow="auto"
        sx={eventCreationPanelContentStyle}
        flexGrow={1}
      >
        <Stack
          flexDirection="row"
          justifyContent="right"
          sx={eventCreationPanelControlsStyle}
        >
          {!isEditing && (
            <RoundedButton
              disabled={isSubmitting || !title || !startTime || !endTime}
              text="Utwórz"
              onClick={handleAccept}
            />
          )}
          {isEditing && (
            <RoundedButton
              disabled={isSubmitting || !title || !startTime || !endTime}
              text="Potwierdź"
              onClick={handleAccept}
            />
          )}
        </Stack>
        {isSubmitting ? (
          <Stack
            height="100%"
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size="160px" thickness={2} />
          </Stack>
        ) : (
          <Stack
            overflow="auto"
            sx={eventCreationPanelEventCreationSectionStyle}
          >
            <Typography sx={eventCreationPanelTitleStyle}>
              {isEditing
                ? 'Edytuj swoje wydarzenie'
                : 'Stwórz swoje wydarzenie'}
            </Typography>
            <Stack
              flexDirection="column"
              gap="16px"
              sx={eventCreationPanelEventCreationFormStyle}
            >
              <TextField
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                }}
                label="Tytuł"
                sx={eventCreationPanelEventCreationFormTitleStyle}
              />
              <FormControl
                sx={
                  eventCreationPanelEventCreationFormDisciplineFormControlStyle
                }
              >
                <InputLabel id="discipline-select-label">Dyscyplina</InputLabel>
                <Select
                  required
                  value={discipline}
                  onChange={(changeEvent) => {
                    setDiscipline(changeEvent.target.value as number);
                  }}
                  labelId="discipline-select-label"
                  id="discipline-select"
                  label="Dyscyplina"
                  sx={eventCreationPanelEventCreationFormDisciplineSelectStyle}
                >
                  <MenuItem value={0}>Piłka nożna</MenuItem>
                  <MenuItem value={1}>Siatkówka</MenuItem>
                  <MenuItem value={2}>Koszykówka</MenuItem>
                  <MenuItem value={3}>Tenis</MenuItem>
                  <MenuItem value={4}>Badminton</MenuItem>
                  <MenuItem value={5}>Tenis stołowy</MenuItem>
                  <MenuItem value={6}>Bieganie</MenuItem>
                  <MenuItem value={7}>Piłka ręczna</MenuItem>
                  <MenuItem value={8}>Golf</MenuItem>
                  <MenuItem value={9}>Kolarstwo</MenuItem>
                  <MenuItem value={10}>Taniec</MenuItem>
                  <MenuItem value={11}>Siłownia</MenuItem>
                  <MenuItem value={12}>Łyżwy</MenuItem>
                  <MenuItem value={13}>Inne</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={
                  eventCreationPanelEventCreationFormDisciplineFormControlStyle
                }
              >
                <InputLabel id="difficulty-select-label">
                  Poziom zaawansowania
                </InputLabel>
                <Select
                  required
                  value={difficulty}
                  onChange={(changeEvent) => {
                    setDifficulty(changeEvent.target.value as number);
                  }}
                  labelId="difficulty-select-label"
                  id="difficulty-select"
                  label="Poziom zaawansowania"
                  sx={eventCreationPanelEventCreationFormDisciplineSelectStyle}
                >
                  <MenuItem value={0}>Początkujący</MenuItem>
                  <MenuItem value={1}>Amator</MenuItem>
                  <MenuItem value={2}>Średniozaawansowany</MenuItem>
                  <MenuItem value={3}>Profesjonalista</MenuItem>
                </Select>
              </FormControl>
              <TextField
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
                }}
                label="Opis"
                multiline
                rows={10}
                sx={eventCreationPanelEventCreationFormDescriptionStyle}
              />
              <Stack
                flexDirection="row"
                sx={
                  eventCreationPanelEventCreationFormPlayersAndDifficultyRowStyle
                }
              >
                <TextField
                  label="Maksymalna liczba osób"
                  type="number"
                  value={maxPlayers}
                  inputProps={{ min: 1, max: 100 }}
                  onChange={(changeEvent) => {
                    let value = parseInt(changeEvent.target.value, 10);

                    if (value > 100) value = 100;
                    if (value < 1) value = 1;

                    setMaxPlayers(value);
                  }}
                  sx={eventCreationPanelEventCreationFormPlayersStyle}
                />
                <TextField
                  label="Minimalny wiek"
                  type="number"
                  value={minAge}
                  inputProps={{ min: 0, max: 150 }}
                  onChange={(changeEvent) => {
                    let value = parseInt(changeEvent.target.value, 10);

                    if (value > 150) value = 150;
                    if (value < 1) value = 1;

                    setMinAge(value);
                  }}
                  sx={eventCreationPanelEventCreationFormDifficultyStyle}
                />
              </Stack>
              <LocalizationProvider
                localeText={
                  plPL.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
                dateAdapter={AdapterDayjs}
                adapterLocale="pl"
              >
                <Stack
                  flexDirection="row"
                  sx={eventCreationPanelEventCreationFormDatesRowStyle}
                >
                  <MobileDateTimePicker
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    disablePast
                    label="Czas rozpoczęcia"
                    sx={eventCreationPanelEventCreationFormStartDateStyle}
                  />
                  <MobileDateTimePicker
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    disablePast
                    label="Czas zakończenia"
                    sx={eventCreationPanelEventCreationFormEndDateStyle}
                  />
                </Stack>
              </LocalizationProvider>
              <Stack
                flexDirection="row"
                sx={eventCreationPanelEventCreationFormCoordsRowStyle}
              >
                <TextField
                  disabled
                  label="Szerokość geograficzna"
                  value={searchParams.get('lat')}
                  sx={eventCreationPanelEventCreationFormCoordsLatStyle}
                />
                <TextField
                  disabled
                  label="Długość geograficzna"
                  value={searchParams.get('lng')}
                  sx={eventCreationPanelEventCreationFormCoordsLonStyle}
                />
              </Stack>
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ height: '60px', paddingLeft: '10px' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPrivate}
                      onChange={handleIsPrivateChange}
                    />
                  }
                  label="Wydarzenie prywatne"
                />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default EventCreationPanel;
