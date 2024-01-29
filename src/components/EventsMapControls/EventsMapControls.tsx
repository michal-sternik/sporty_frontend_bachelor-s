import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import eventsMapControlsContainerStyle from './EventsMapControlsStyles';
import {
  selectDifficultySelection,
  selectDisciplineSelection,
  selectSortBySelection,
  selectSortDirectionSelection,
  setDifficultySelection,
  setDisciplineSelection,
  setSortBySelection,
  setSortDirectionSelection,
} from '../../redux/eventsSlice';
import { useAppDispatch } from '../../redux/store';

function EventsMapControls() {
  const dispatch = useAppDispatch();

  const disciplineSelection = useSelector(selectDisciplineSelection);
  const difficultySelection = useSelector(selectDifficultySelection);
  const sortBySelection = useSelector(selectSortBySelection);
  const sortDirectionSelection = useSelector(selectSortDirectionSelection);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      sx={eventsMapControlsContainerStyle}
    >
      <FormControl
        size="small"
        sx={{
          marginRight: '16px',
          minWidth: 200,
          '.MuiInputLabel-outlined': { color: '#DDDDDD' },
        }}
      >
        <InputLabel id="map-controls-discipline-select-label">
          Dyscyplina
        </InputLabel>
        <Select
          value={disciplineSelection}
          onChange={(changeEvent) => {
            dispatch(
              setDisciplineSelection(changeEvent.target.value as number),
            );
          }}
          labelId="map-controls-discipline-select-label"
          id="map-controls-discipline-select"
          label="Dyscyplina"
          sx={{
            color: '#DDDDDD',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#DDDDDD',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '.MuiSvgIcon-root ': {
              fill: '#DDDDDD',
            },
          }}
        >
          <MenuItem value={0}>Wszystkie</MenuItem>
          <MenuItem value={1}>Piłka nożna</MenuItem>
          <MenuItem value={2}>Siatkówka</MenuItem>
          <MenuItem value={3}>Koszykówka</MenuItem>
          <MenuItem value={4}>Tenis</MenuItem>
          <MenuItem value={5}>Inne</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{
          marginRight: '16px',
          minWidth: 200,
          '.MuiInputLabel-outlined': { color: '#DDDDDD' },
        }}
      >
        <InputLabel id="map-controls-difficulty-select-label">
          Poziom zaawansowania
        </InputLabel>
        <Select
          value={difficultySelection}
          onChange={(changeEvent) => {
            dispatch(
              setDifficultySelection(changeEvent.target.value as number),
            );
          }}
          labelId="map-controls-difficulty-select-label"
          id="map-controls-difficulty-select"
          label="Poziom zaawansowania"
          sx={{
            color: '#DDDDDD',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#DDDDDD',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '.MuiSvgIcon-root ': {
              fill: '#DDDDDD',
            },
          }}
        >
          <MenuItem value={0}>Wszystkie</MenuItem>
          <MenuItem value={1}>Początkujący</MenuItem>
          <MenuItem value={2}>Amator</MenuItem>
          <MenuItem value={3}>Średniozaawansowany</MenuItem>
          <MenuItem value={4}>Profesjonalista</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{
          marginRight: '16px',
          minWidth: 200,
          '.MuiInputLabel-outlined': { color: '#DDDDDD' },
        }}
      >
        <InputLabel id="map-controls-sort-select-label">
          Kryterium sortowania
        </InputLabel>
        <Select
          defaultValue={sortBySelection}
          value={sortBySelection}
          onChange={(changeEvent) => {
            dispatch(setSortBySelection(changeEvent.target.value as string));
          }}
          labelId="map-controls-sort-select-label"
          id="map-controls-sort-select"
          label="Kryterium sortowania"
          sx={{
            color: '#DDDDDD',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#DDDDDD',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '.MuiSvgIcon-root ': {
              fill: '#DDDDDD',
            },
          }}
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
        size="small"
        sx={{
          marginRight: '16px',
          minWidth: 200,
          '.MuiInputLabel-outlined': { color: '#DDDDDD' },
        }}
      >
        <InputLabel id="map-controls-sort-direction-select-label">
          Kolejność sortowania
        </InputLabel>
        <Select
          value={sortDirectionSelection}
          onChange={(changeEvent) => {
            dispatch(
              setSortDirectionSelection(changeEvent.target.value as number),
            );
          }}
          labelId="map-controls-sort-direction-select-label"
          id="map-controls-sort-direction-select"
          label="Kolejność sortowania"
          sx={{
            color: '#DDDDDD',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#DDDDDD',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '.MuiSvgIcon-root ': {
              fill: '#DDDDDD',
            },
          }}
        >
          <MenuItem value={0}>Domyślna</MenuItem>
          <MenuItem value={1}>Malejąca</MenuItem>
          <MenuItem value={2}>Rosnąca</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default EventsMapControls;
