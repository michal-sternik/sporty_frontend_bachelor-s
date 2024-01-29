import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { LngLatBoundsLike, useMap } from 'react-map-gl';
import axios from 'axios';
import utc from 'dayjs/plugin/utc';
import TuneIcon from '@mui/icons-material/Tune';
import {
  LocalizationProvider,
  MobileDateTimePicker,
  plPL,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  selectAllEvents,
  selectDesiredBounds,
  selectDifficultySelection,
  selectDisciplineSelection,
  selectMaxParticipantsQuantitySelection,
  selectCurrentParticipantsQuantitySelection,
  selectMinParticipantsAgeFromSelection,
  selectMinParticipantsAgeToSelection,
  selectSortBySelection,
  selectSortDirectionSelection,
  selectStartTimeSelection,
  setDifficultySelection,
  setDisciplineSelection,
  setEvents,
  setSortBySelection,
  setSortDirectionSelection,
  setStartTimeSelection,
  setMaxParticipantsQuantitySelection,
  setCurrentParticipantsQuantitySelection,
  setMinParticipantsAgeFromSelection,
  setMinParticipantsAgeToSelection,
  setEndTimeSelection,
  selectEndTimeSelection,
  selectAreIncomingMeetingChosen,
  setAreIncomingMeetingChosen,
  selectAsOrganizerSelection,
  setAsOrganizerSelection,
  selectMeetingVisibilitySelection,
  setMeetingVisibilitySelection,
  selectCurrentParticipantsQuantityToSelection,
  setCurrentParticipantsQuantityToSelection,
} from '../../redux/eventsSlice';
import eventsListPanelStyles from './EventsListPanelStyles';
import EventsListItem from '../EventsListItem/EventsListItem';
import { useAppDispatch } from '../../redux/store';
import { API_BASE_URL } from '../../constants';
import { convertError } from '../../utils/errorHandleUtils';
import RoundedButton from '../CustomButton/RoundedButton';

function EventsListPanel() {
  const { eventsMap: mapRef } = useMap();
  const events = useSelector(selectAllEvents);
  const dispatch = useAppDispatch();
  const desiredBounds = useSelector(selectDesiredBounds);
  const difficultySelection = useSelector(selectDifficultySelection);
  const [difficultySelectionLocal, setDifficultySelectionLocal] =
    useState<number>(difficultySelection);
  const disciplineSelection = useSelector(selectDisciplineSelection);
  const [disciplineSelectionLocal, setDisciplineSelectionLocal] =
    useState<number>(disciplineSelection);
  const maxParticipantsQuantitySelection = useSelector(
    selectMaxParticipantsQuantitySelection,
  );
  const [
    maxParticipantsQuantitySelectionLocal,
    setMaxParticipantsQuantitySelectionLocal,
  ] = useState<number | string>(maxParticipantsQuantitySelection);
  const currentParticipantsQuantitySelection = useSelector(
    selectCurrentParticipantsQuantitySelection,
  );
  const [
    currentParticipantsQuantitySelectionLocal,
    setCurrentParticipantsQuantitySelectionLocal,
  ] = useState<number | string>(currentParticipantsQuantitySelection);
  const currentParticipantsQuantityToSelection = useSelector(
    selectCurrentParticipantsQuantityToSelection,
  );
  const [
    currentParticipantsQuantityToSelectionLocal,
    setCurrentParticipantsQuantityToSelectionLocal,
  ] = useState<number | string>(currentParticipantsQuantityToSelection);
  const minParticipantsAgeFromSelection = useSelector(
    selectMinParticipantsAgeFromSelection,
  );
  const [
    minParticipantsAgeFromSelectionLocal,
    setMinParticipantsAgeFromSelectionLocal,
  ] = useState<number | string>(minParticipantsAgeFromSelection);
  const minParticipantsAgeToSelection = useSelector(
    selectMinParticipantsAgeToSelection,
  );
  const [
    minParticipantsAgeToSelectionLocal,
    setMinParticipantsAgeToSelectionLocal,
  ] = useState<number | string>(minParticipantsAgeToSelection);
  const sortDirectionSelection = useSelector(selectSortDirectionSelection);
  const [sortDirectionSelectionLocal, setSortDirectionSelectionLocal] =
    useState<number>(sortDirectionSelection);
  const sortBySelection = useSelector(selectSortBySelection);
  const [sortBySelectionLocal, setSortBySelectionLocal] =
    useState<string>(sortBySelection);
  const startTimeSelection = useSelector(selectStartTimeSelection);
  const [startTimeSelectionLocal, setStartTimeSelectionLocal] =
    useState<Dayjs | null>(startTimeSelection);
  const endTimeSelection = useSelector(selectEndTimeSelection);
  const [endTimeSelectionLocal, setEndTimeSelectionLocal] =
    useState<Dayjs | null>(endTimeSelection);
  const asOrganizerSelection = useSelector(selectAsOrganizerSelection);
  const [asOrganizerSelectionLocal, setAsOrganizerSelectionLocal] =
    useState<boolean>(asOrganizerSelection);
  const areIncomingMeetingsChosen = useSelector(selectAreIncomingMeetingChosen);
  const [areIncomingMeetingsChosenLocal, setAreIncomingMeetingsChosenLocal] =
    useState<boolean>(areIncomingMeetingsChosen);
  const meetingVisibilitySelection = useSelector(
    selectMeetingVisibilitySelection,
  );
  const [meetingVisibilitySelectionLocal, setMeetingVisibilitySelectionLocal] =
    useState<boolean>(meetingVisibilitySelection);
  const [areEventsLoading, setAreEventsLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);
  const [isInitialised, setIsInitialised] = useState<boolean>(false);

  const handleFiltersOpen = () => {
    setDisciplineSelectionLocal(disciplineSelection);
    setDifficultySelectionLocal(difficultySelection);
    setMaxParticipantsQuantitySelectionLocal(maxParticipantsQuantitySelection);
    setCurrentParticipantsQuantitySelectionLocal(
      currentParticipantsQuantitySelection,
    );
    setCurrentParticipantsQuantityToSelectionLocal(
      currentParticipantsQuantityToSelection,
    );
    setMinParticipantsAgeFromSelectionLocal(minParticipantsAgeFromSelection);
    setMinParticipantsAgeToSelectionLocal(minParticipantsAgeToSelection);
    setSortBySelectionLocal(sortBySelection);
    setSortDirectionSelectionLocal(sortDirectionSelection);
    setStartTimeSelectionLocal(startTimeSelection);
    setEndTimeSelectionLocal(endTimeSelection);
    setAsOrganizerSelectionLocal(asOrganizerSelection);
    setMeetingVisibilitySelectionLocal(meetingVisibilitySelection);
    setAreIncomingMeetingsChosenLocal(areIncomingMeetingsChosen);

    setAreFiltersOpen(true);
  };

  const handleFiltersClose = () => {
    setAreFiltersOpen(false);
  };

  const handleSubmit = () => {
    dispatch(setDisciplineSelection(disciplineSelectionLocal));
    dispatch(setDifficultySelection(difficultySelectionLocal));
    dispatch(
      setMaxParticipantsQuantitySelection(
        maxParticipantsQuantitySelectionLocal,
      ),
    );
    dispatch(
      setCurrentParticipantsQuantitySelection(
        currentParticipantsQuantitySelectionLocal,
      ),
    );
    dispatch(
      setCurrentParticipantsQuantityToSelection(
        currentParticipantsQuantityToSelectionLocal,
      ),
    );
    dispatch(
      setMinParticipantsAgeFromSelection(minParticipantsAgeFromSelectionLocal),
    );
    dispatch(
      setMinParticipantsAgeToSelection(minParticipantsAgeToSelectionLocal),
    );
    dispatch(setSortBySelection(sortBySelectionLocal));
    dispatch(setSortDirectionSelection(sortDirectionSelectionLocal));
    dispatch(setStartTimeSelection(startTimeSelectionLocal));
    dispatch(setEndTimeSelection(endTimeSelectionLocal));
    dispatch(setAsOrganizerSelection(asOrganizerSelectionLocal));
    dispatch(setMeetingVisibilitySelection(meetingVisibilitySelectionLocal));
    dispatch(setAreIncomingMeetingChosen(areIncomingMeetingsChosenLocal));
    setAreFiltersOpen(false);
  };

  const handleFormClear = () => {
    setDisciplineSelectionLocal(0);
    setDifficultySelectionLocal(0);
    setMaxParticipantsQuantitySelectionLocal('');
    setCurrentParticipantsQuantitySelectionLocal('');
    setCurrentParticipantsQuantityToSelectionLocal('');
    setMinParticipantsAgeFromSelectionLocal('');
    setMinParticipantsAgeToSelectionLocal('');
    setSortBySelectionLocal('Default');
    setSortDirectionSelectionLocal(0);
    setStartTimeSelectionLocal(null);
    setEndTimeSelectionLocal(null);
    setAsOrganizerSelectionLocal(false);
    setMeetingVisibilitySelectionLocal(false);
    setAreIncomingMeetingsChosenLocal(false);
  };

  const fetch = React.useMemo(
    () =>
      debounce((searchedValue) => {
        setAreEventsLoading(true);

        if (!areIncomingMeetingsChosenLocal) {
          axios
            .get(
              `${API_BASE_URL}/meeting/list?southWestLongitude=${
                desiredBounds[0]
              }&southWestLatitude=${desiredBounds[1]}&northEastLongitude=${
                desiredBounds[2]
              }&northEastLatitude=${desiredBounds[3]}${
                difficultySelection !== 0
                  ? `&difficulty=${difficultySelection - 1}`
                  : ``
              }${
                disciplineSelection !== 0
                  ? `&sportsDiscipline=${disciplineSelection - 1}`
                  : ``
              }${
                maxParticipantsQuantitySelection !== ''
                  ? `&maxParticipantsQuantity=${maxParticipantsQuantitySelection}`
                  : ``
              }${
                currentParticipantsQuantitySelection !== ''
                  ? `&currentParticipantsQuantity=${currentParticipantsQuantitySelection}`
                  : ``
              }${
                minParticipantsAgeFromSelection !== ''
                  ? `&minParticipantsAge=${minParticipantsAgeFromSelection}`
                  : ``
              }${
                startTimeSelection !== null
                  ? `&startDateTimeUtc=${startTimeSelection.utc().format()}`
                  : ``
              }${
                minParticipantsAgeToSelection !== ''
                  ? `&minParticipantsAgeTo=${minParticipantsAgeToSelection}`
                  : ``
              }${
                sortBySelection !== 'Default'
                  ? `&sortBy=${sortBySelection}`
                  : ``
              }${
                sortDirectionSelection !== 0
                  ? `&sortDirection=${sortDirectionSelection - 1}`
                  : ``
              }${
                searchedValue !== ''
                  ? `&titleSearchPhrase=${searchedValue}`
                  : ``
              }`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              },
            )
            .then((response) => {
              dispatch(setEvents(response.data));
            })
            .catch((error) => {
              convertError(error);
            })
            .finally(() => {
              setAreEventsLoading(false);
            });
        } else {
          axios
            .get(
              `${API_BASE_URL}/meeting/upcoming?southWestLongitude=${
                desiredBounds[0]
              }&southWestLatitude=${desiredBounds[1]}&northEastLongitude=${
                desiredBounds[2]
              }&northEastLatitude=${desiredBounds[3]}${
                difficultySelection !== 0
                  ? `&difficulty=${difficultySelection - 1}`
                  : ``
              }${
                disciplineSelection !== 0
                  ? `&sportsDiscipline=${disciplineSelection - 1}`
                  : ``
              }${
                maxParticipantsQuantitySelection !== ''
                  ? `&maxParticipantsQuantity=${maxParticipantsQuantitySelection}`
                  : ``
              }${
                currentParticipantsQuantitySelection !== ''
                  ? `&currentParticipantsQuantityFrom=${currentParticipantsQuantitySelection}`
                  : ``
              }${
                currentParticipantsQuantityToSelection !== ''
                  ? `&currentParticipantsQuantityTo=${currentParticipantsQuantityToSelection}`
                  : ``
              }${
                minParticipantsAgeFromSelection !== ''
                  ? `&minParticipantsAgeFrom=${minParticipantsAgeFromSelection}`
                  : ``
              }${
                startTimeSelection !== null
                  ? `&startDateTimeUtcFrom=${startTimeSelection.utc().format()}`
                  : ``
              }${
                endTimeSelection !== null
                  ? `&startDateTimeUtcTo=${endTimeSelection.utc().format()}`
                  : ``
              }${
                minParticipantsAgeToSelection !== ''
                  ? `&minParticipantsAgeTo=${minParticipantsAgeToSelection}`
                  : ``
              }${
                sortBySelection !== 'Default'
                  ? `&sortBy=${sortBySelection}`
                  : ``
              }${
                sortDirectionSelection !== 0
                  ? `&sortDirection=${sortDirectionSelection - 1}`
                  : ``
              }${
                searchedValue !== ''
                  ? `&titleSearchPhrase=${searchedValue}`
                  : ``
              }${
                meetingVisibilitySelection !== false
                  ? `&meetingVisibility=${1}`
                  : ``
              }${asOrganizerSelection !== false ? `&asOrganizer=true` : ``}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              },
            )
            .then((response) => {
              dispatch(setEvents(response.data));
            })
            .catch((error) => {
              convertError(error);
            })
            .finally(() => {
              setAreEventsLoading(false);
            });
        }
      }, 300),
    [
      areIncomingMeetingsChosen,
      asOrganizerSelection,
      currentParticipantsQuantitySelection,
      currentParticipantsQuantityToSelection,
      desiredBounds,
      difficultySelection,
      disciplineSelection,
      dispatch,
      endTimeSelection,
      maxParticipantsQuantitySelection,
      meetingVisibilitySelection,
      minParticipantsAgeFromSelection,
      minParticipantsAgeToSelection,
      sortBySelection,
      sortDirectionSelection,
      startTimeSelection,
    ],
  );

  useEffect(() => {
    if (isInitialised) fetch(inputValue);
  }, [inputValue]);

  useEffect(() => {
    dayjs.extend(utc);
    const abortController = new AbortController();
    const { signal } = abortController;

    setAreEventsLoading(true);

    if (!areIncomingMeetingsChosenLocal) {
      axios
        .get(
          `${API_BASE_URL}/meeting/list?southWestLongitude=${
            desiredBounds[0]
          }&southWestLatitude=${desiredBounds[1]}&northEastLongitude=${
            desiredBounds[2]
          }&northEastLatitude=${desiredBounds[3]}${
            difficultySelection !== 0
              ? `&difficulty=${difficultySelection - 1}`
              : ``
          }${
            disciplineSelection !== 0
              ? `&sportsDiscipline=${disciplineSelection - 1}`
              : ``
          }${
            maxParticipantsQuantitySelection !== ''
              ? `&maxParticipantsQuantity=${maxParticipantsQuantitySelection}`
              : ``
          }${
            currentParticipantsQuantitySelection !== ''
              ? `&currentParticipantsQuantity=${currentParticipantsQuantitySelection}`
              : ``
          }${
            minParticipantsAgeFromSelection !== ''
              ? `&minParticipantsAge=${minParticipantsAgeFromSelection}`
              : ``
          }${
            startTimeSelection !== null
              ? `&startDateTimeUtc=${startTimeSelection.utc().format()}`
              : ``
          }${
            minParticipantsAgeToSelection !== ''
              ? `&minParticipantsAgeTo=${minParticipantsAgeToSelection}`
              : ``
          }${
            sortBySelection !== 'Default' ? `&sortBy=${sortBySelection}` : ``
          }${
            sortDirectionSelection !== 0
              ? `&sortDirection=${sortDirectionSelection - 1}`
              : ``
          }${inputValue !== '' ? `&titleSearchPhrase=${inputValue}` : ``}`,
          {
            signal,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((response) => {
          dispatch(setEvents(response.data));
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') {
            convertError(error);
          }
        })
        .finally(() => {
          setAreEventsLoading(false);
          setIsInitialised(true);
        });
    } else {
      axios
        .get(
          `${API_BASE_URL}/meeting/upcoming?southWestLongitude=${
            desiredBounds[0]
          }&southWestLatitude=${desiredBounds[1]}&northEastLongitude=${
            desiredBounds[2]
          }&northEastLatitude=${desiredBounds[3]}${
            difficultySelection !== 0
              ? `&difficulty=${difficultySelection - 1}`
              : ``
          }${
            disciplineSelection !== 0
              ? `&sportsDiscipline=${disciplineSelection - 1}`
              : ``
          }${
            maxParticipantsQuantitySelection !== ''
              ? `&maxParticipantsQuantity=${maxParticipantsQuantitySelection}`
              : ``
          }${
            currentParticipantsQuantitySelection !== ''
              ? `&currentParticipantsQuantityFrom=${currentParticipantsQuantitySelection}`
              : ``
          }${
            currentParticipantsQuantityToSelection !== ''
              ? `&currentParticipantsQuantityTo=${currentParticipantsQuantityToSelection}`
              : ``
          }${
            minParticipantsAgeFromSelection !== ''
              ? `&minParticipantsAgeFrom=${minParticipantsAgeFromSelection}`
              : ``
          }${
            startTimeSelection !== null
              ? `&startDateTimeUtcFrom=${startTimeSelection.utc().format()}`
              : ``
          }${
            endTimeSelection !== null
              ? `&startDateTimeUtcTo=${endTimeSelection.utc().format()}`
              : ``
          }${
            minParticipantsAgeToSelection !== ''
              ? `&minParticipantsAgeTo=${minParticipantsAgeToSelection}`
              : ``
          }${
            sortBySelection !== 'Default' ? `&sortBy=${sortBySelection}` : ``
          }${
            sortDirectionSelection !== 0
              ? `&sortDirection=${sortDirectionSelection - 1}`
              : ``
          }${inputValue !== '' ? `&titleSearchPhrase=${inputValue}` : ``}${
            meetingVisibilitySelection !== false
              ? `&meetingVisibility=${0}`
              : ``
          }${asOrganizerSelection !== false ? `&asOrganizer=true` : ``}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((response) => {
          dispatch(setEvents(response.data));
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') {
            convertError(error);
          }
        })
        .finally(() => {
          setAreEventsLoading(false);
          setIsInitialised(true);
        });
    }
    // Anuluj poprzednie zapytanie przy kolejnym renderowaniu komponentu
    return () => abortController.abort();
  }, [
    areIncomingMeetingsChosen,
    asOrganizerSelection,
    currentParticipantsQuantitySelection,
    currentParticipantsQuantityToSelection,
    desiredBounds,
    difficultySelection,
    disciplineSelection,
    dispatch,
    endTimeSelection,
    maxParticipantsQuantitySelection,
    meetingVisibilitySelection,
    minParticipantsAgeFromSelection,
    minParticipantsAgeToSelection,
    sortBySelection,
    sortDirectionSelection,
    startTimeSelection,
  ]);

  useEffect(() => {
    mapRef?.fitBounds(desiredBounds as LngLatBoundsLike);
  }, [mapRef]);

  return (
    <Stack flexDirection="column" alignItems="center" height="100%">
      <Stack
        flexDirection="row"
        sx={{ width: '100%', minHeight: '80px', padding: '12px' }}
      >
        <TextField
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          fullWidth
          placeholder="Szukaj wydarzeń..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(221, 221, 221, 0.4)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFiltersOpen}>
                  <TuneIcon sx={{ color: '#DDDDDD' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ input: { color: '#DDDDDD', fontFamily: 'Open Sans' } }}
        />
      </Stack>
      <Stack
        width="100%"
        flexGrow={1}
        flexDirection="column"
        alignItems="center"
        overflow="auto"
        sx={eventsListPanelStyles}
      >
        {areEventsLoading ? (
          <Stack flexGrow={1} justifyContent="center" alignItems="center">
            <CircularProgress size="160px" thickness={2} />
          </Stack>
        ) : (
          events.map((event) => <EventsListItem key={event.id} event={event} />)
        )}
      </Stack>
      <Dialog
        open={areFiltersOpen}
        onClose={handleFiltersClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ backgroundColor: '#2C2C2C' }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: 'Open Sans',
              }}
            >
              Dostosuj wyszukiwanie
            </Typography>
            <IconButton onClick={handleFiltersClose}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#2C2C2C',
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
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Open Sans',
            }}
          >
            Filtrowanie
          </Typography>
          <Stack direction="column" padding="16px 0" rowGap="16px">
            <Stack direction="row" columnGap="16px" flexWrap="wrap">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areIncomingMeetingsChosenLocal}
                    onChange={(event) => {
                      setAreIncomingMeetingsChosenLocal(event.target.checked);
                    }}
                  />
                }
                label="Tylko moje nadchodzące wydarzenia"
              />
              {areIncomingMeetingsChosenLocal && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={asOrganizerSelectionLocal}
                      onChange={(event) => {
                        setAsOrganizerSelectionLocal(event.target.checked);
                      }}
                    />
                  }
                  label="Jako organizator"
                />
              )}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="16px"
              flexWrap="wrap"
            >
              <FormControl
                sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
              >
                <InputLabel id="map-controls-discipline-select-label">
                  Dyscyplina
                </InputLabel>
                <Select
                  value={disciplineSelectionLocal}
                  onChange={(changeEvent) => {
                    setDisciplineSelectionLocal(
                      changeEvent.target.value as number,
                    );
                  }}
                  labelId="map-controls-discipline-select-label"
                  id="map-controls-discipline-select"
                  label="Dyscyplina"
                >
                  <MenuItem value={0}>Wszystkie</MenuItem>
                  <MenuItem value={1}>Piłka nożna</MenuItem>
                  <MenuItem value={2}>Siatkówka</MenuItem>
                  <MenuItem value={3}>Koszykówka</MenuItem>
                  <MenuItem value={4}>Tenis</MenuItem>
                  <MenuItem value={5}>Badminton</MenuItem>
                  <MenuItem value={6}>Tenis stołowy</MenuItem>
                  <MenuItem value={7}>Bieganie</MenuItem>
                  <MenuItem value={8}>Piłka ręczna</MenuItem>
                  <MenuItem value={9}>Golf</MenuItem>
                  <MenuItem value={10}>Kolarstwo</MenuItem>
                  <MenuItem value={11}>Taniec</MenuItem>
                  <MenuItem value={12}>Siłownia</MenuItem>
                  <MenuItem value={13}>Łyżwy</MenuItem>
                  <MenuItem value={14}>Inne</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
              >
                <InputLabel id="map-controls-difficulty-select-label">
                  Poziom zaawansowania
                </InputLabel>
                <Select
                  value={difficultySelectionLocal}
                  onChange={(changeEvent) => {
                    setDifficultySelectionLocal(
                      changeEvent.target.value as number,
                    );
                  }}
                  labelId="map-controls-difficulty-select-label"
                  id="map-controls-difficulty-select"
                  label="Poziom zaawansowania"
                >
                  <MenuItem value={0}>Wszystkie</MenuItem>
                  <MenuItem value={1}>Początkujący</MenuItem>
                  <MenuItem value={2}>Amator</MenuItem>
                  <MenuItem value={3}>Średniozaawansowany</MenuItem>
                  <MenuItem value={4}>Profesjonalista</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="16px"
              flexWrap="wrap"
            >
              <TextField
                label="Maksymalna liczba uczestników"
                type="number"
                value={maxParticipantsQuantitySelectionLocal}
                inputProps={{ min: 0, max: 100 }}
                onChange={(changeEvent) => {
                  let value: number | string =
                    changeEvent.target.value === ''
                      ? ''
                      : parseInt(changeEvent.target.value, 10);

                  if (typeof value === 'number') {
                    if (value > 100) value = 100;
                    if (value < 1) value = '';
                  }

                  setMaxParticipantsQuantitySelectionLocal(value);
                }}
                sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="16px"
              flexWrap="wrap"
            >
              <TextField
                label="Minimalna aktualna liczba uczestników"
                type="number"
                value={currentParticipantsQuantitySelectionLocal}
                inputProps={{ min: -1, max: 100 }}
                onChange={(changeEvent) => {
                  let value: number | string =
                    changeEvent.target.value === ''
                      ? ''
                      : parseInt(changeEvent.target.value, 10);

                  if (typeof value === 'number') {
                    if (value > 100) value = 100;
                    if (value < 0) value = '';
                  }

                  setCurrentParticipantsQuantitySelectionLocal(value);
                }}
                sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
              />
              {areIncomingMeetingsChosenLocal && (
                <TextField
                  label="Maksymalna aktualna liczba uczestników"
                  type="number"
                  value={currentParticipantsQuantityToSelectionLocal}
                  inputProps={{ min: -1, max: 100 }}
                  onChange={(changeEvent) => {
                    let value: number | string =
                      changeEvent.target.value === ''
                        ? ''
                        : parseInt(changeEvent.target.value, 10);

                    if (typeof value === 'number') {
                      if (value > 100) value = 100;
                      if (value < 0) value = '';
                    }

                    setCurrentParticipantsQuantityToSelectionLocal(value);
                  }}
                  sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
                />
              )}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="16px"
              flexWrap="wrap"
            >
              <TextField
                label="Minimalny wiek od..."
                type="number"
                value={minParticipantsAgeFromSelectionLocal}
                inputProps={{ min: 0, max: 150 }}
                onChange={(changeEvent) => {
                  let value: number | string =
                    changeEvent.target.value === ''
                      ? ''
                      : parseInt(changeEvent.target.value, 10);

                  if (typeof value === 'number') {
                    if (value > 100) value = 100;
                    if (value < 1) value = '';
                  }

                  setMinParticipantsAgeFromSelectionLocal(value);
                }}
                sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
              />
              {areIncomingMeetingsChosenLocal && (
                <TextField
                  label="Minimalny wiek do..."
                  type="number"
                  value={minParticipantsAgeToSelectionLocal}
                  inputProps={{ min: 0, max: 150 }}
                  onChange={(changeEvent) => {
                    let value: number | string =
                      changeEvent.target.value === ''
                        ? ''
                        : parseInt(changeEvent.target.value, 10);

                    if (typeof value === 'number') {
                      if (value > 100) value = 100;
                      if (value < 1) value = '';
                    }

                    setMinParticipantsAgeToSelectionLocal(value);
                  }}
                  sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
                />
              )}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap="16px"
              flexWrap="wrap"
            >
              <LocalizationProvider
                localeText={
                  plPL.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
                dateAdapter={AdapterDayjs}
                adapterLocale="pl"
              >
                <MobileDateTimePicker
                  value={startTimeSelectionLocal}
                  onChange={(newValue) => setStartTimeSelectionLocal(newValue)}
                  disablePast
                  label="Czas rozpoczęcia"
                  sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
                />
                {areIncomingMeetingsChosenLocal && (
                  <MobileDateTimePicker
                    value={endTimeSelectionLocal}
                    onChange={(newValue) => setEndTimeSelectionLocal(newValue)}
                    disablePast
                    label="Czas zakończenia"
                    sx={{ flexGrow: 1, flexBasis: 0, minWidth: '240px' }}
                  />
                )}
              </LocalizationProvider>
            </Stack>
            {areIncomingMeetingsChosenLocal && (
              <Stack flexDirection="row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={meetingVisibilitySelectionLocal}
                      onChange={(event) => {
                        setMeetingVisibilitySelectionLocal(
                          event.target.checked,
                        );
                      }}
                    />
                  }
                  label="Prywatne"
                />
              </Stack>
            )}
          </Stack>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Open Sans',
            }}
          >
            Sortowanie
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap="16px"
            paddingTop="16px"
            flexWrap="wrap"
          >
            <FormControl
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                minWidth: '240px',
              }}
            >
              <InputLabel id="map-controls-sort-select-label">
                Kryterium sortowania
              </InputLabel>
              <Select
                defaultValue={sortBySelection}
                value={sortBySelectionLocal}
                onChange={(changeEvent) => {
                  setSortBySelectionLocal(changeEvent.target.value as string);

                  if (changeEvent.target.value === 'Default') {
                    setSortDirectionSelectionLocal(0);
                  }
                }}
                labelId="map-controls-sort-select-label"
                id="map-controls-sort-select"
                label="Kryterium sortowania"
              >
                <MenuItem value="Default">Domyślne</MenuItem>
                <MenuItem value="StartDateTimeUtc">Czas rozpoczęcia</MenuItem>
                <MenuItem value="Difficulty">Poziom zaawansowania</MenuItem>
                <MenuItem value="MaxParticipantsQuantity">
                  Liczba uczestników
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                minWidth: '240px',
              }}
            >
              <InputLabel id="map-controls-sort-direction-select-label">
                Kolejność sortowania
              </InputLabel>
              <Select
                value={sortDirectionSelectionLocal}
                disabled={sortBySelectionLocal === 'Default'}
                onChange={(changeEvent) => {
                  setSortDirectionSelectionLocal(
                    changeEvent.target.value as number,
                  );
                }}
                labelId="map-controls-sort-direction-select-label"
                id="map-controls-sort-direction-select"
                label="Kolejność sortowania"
              >
                <MenuItem value={0}>Domyślna</MenuItem>
                <MenuItem value={1}>Rosnąca</MenuItem>
                <MenuItem value={2}>Malejąca</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            columnGap: '16px',
            padding: '16px 24px',
            backgroundColor: '#2C2C2C',
          }}
        >
          <Stack
            flexDirection="row"
            flexGrow={1}
            flexBasis={0}
            justifyContent="right"
          >
            <RoundedButton text="Zastosuj" onClick={handleSubmit} />
          </Stack>
          <Stack
            flexDirection="row"
            flexGrow={1}
            flexBasis={0}
            justifyContent="left"
            marginLeft="0px !important"
          >
            <RoundedButton text="Wyczyść" onClick={handleFormClear} />
          </Stack>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default EventsListPanel;
