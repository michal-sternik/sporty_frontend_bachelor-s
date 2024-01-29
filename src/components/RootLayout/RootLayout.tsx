import React from 'react';

import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function RootLayout() {
  return (
    <Stack flexDirection="column" sx={{ height: '100vh' }}>
      <Header />
      <Outlet />
    </Stack>
  );
}

export default RootLayout;
