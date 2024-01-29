import React from 'react';

import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsChatOpen, selectIsMapVisible } from '../../redux/mapSlice';

function EventsPanel() {
  const isMapVisible = useSelector(selectIsMapVisible);
  const isChatOpen = useSelector(selectIsChatOpen);

  return (
    <Stack
      flexBasis={0}
      sx={{
        minWidth: 0,
        flexGrow: {
          xs: isChatOpen ? 0 : 1,
          md: 1,
        },
        height: 'calc(100vh - 80px)',
        display: {
          xs: isMapVisible && !isChatOpen ? 'none' : 'flex',
          md: 'flex',
        },
      }}
    >
      <Outlet />
    </Stack>
  );
}

export default EventsPanel;
