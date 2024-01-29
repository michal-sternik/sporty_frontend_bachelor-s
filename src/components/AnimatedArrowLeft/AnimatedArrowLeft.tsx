import * as React from 'react';

import { makeStyles } from 'tss-react/mui';
import { keyframes } from 'tss-react';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import Container from '@mui/material/Container';
import containerStyle from './AnimatedArrowLeftStyles';

const useStyles = makeStyles()(() => ({
  rotateIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    padding: 0,
    animation: `${keyframes`
            0% {
              transform: translateX(30px);
              opacity: 0%;
            }
            50% {
              transform: translateX(10px);
              opacity: 100%;
            }
            100% {
              transform: translateX(0px);
              opacity: 0%;
            }
            `} 2s infinite linear`,
  },
}));

export default function AnimatedArrowLeft() {
  const { classes } = useStyles();
  return (
    <Container sx={containerStyle}>
      <KeyboardDoubleArrowLeftRoundedIcon className={classes.rotateIcon} />
    </Container>
  );
}
