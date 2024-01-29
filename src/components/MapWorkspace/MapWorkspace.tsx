import React, { useEffect } from 'react';
import { IconButton, Stack } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import EventsMap from '../EventsMap/EventsMap';
import {
  mapWorkspaceContainerStyle,
  mapWorkspaceMainAreaStyle,
} from './MapWorkspaceStyles';
import EventsPanel from '../EventsPanel/EventsPanel';
import { useAppDispatch } from '../../redux/store';
import { selectIsMapVisible, setIsMapVisible } from '../../redux/mapSlice';

function MapWorkspace() {
  const { eventsMap: mapRef } = useMap();
  const dispatch = useAppDispatch();
  const isMapVisible = useSelector(selectIsMapVisible);

  useEffect(() => {
    if (isMapVisible) {
      mapRef?.resize();
    }
  }, [isMapVisible, mapRef]);

  useEffect(() => {
    dispatch(setIsMapVisible(false));
  }, [dispatch]);

  return (
    <>
      <Stack direction="column" sx={mapWorkspaceContainerStyle} height="100%">
        <Stack
          direction="row"
          flexGrow={1}
          sx={mapWorkspaceMainAreaStyle}
          height="100%"
        >
          <EventsPanel />
          <EventsMap />
        </Stack>
      </Stack>
      <IconButton
        size="large"
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          backgroundColor: '#1976d2',

          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }}
        onClick={() => {
          if (!isMapVisible) {
            dispatch(setIsMapVisible(true));
          } else {
            dispatch(setIsMapVisible(false));
          }
        }}
      >
        {isMapVisible ? <ListAltIcon /> : <TravelExploreIcon />}
      </IconButton>
    </>
  );
}

export default MapWorkspace;
