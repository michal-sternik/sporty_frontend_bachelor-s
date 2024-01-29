import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  boxStyle,
  avatarStyle,
  succesTypographyStyle,
  buttonStyle,
} from './ConfirmActionStyles';

interface ConfirmActionProps {
  label: string;
  link: string;
  textNavigate: string;
}

export default function ConfirmAction({
  label,
  link,
  textNavigate,
}: ConfirmActionProps) {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={boxStyle}>
        <Avatar sx={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography sx={succesTypographyStyle} component="h1" variant="h2">
          Success
        </Typography>
        <Typography component="h1">{label}</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={buttonStyle}
          onClick={() => {
            navigate(link);
          }}
        >
          {textNavigate}
        </Button>
      </Box>
    </Container>
  );
}
