import { SxProps } from '@mui/material';

const outerBoxLoginFormStyle: SxProps = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const avatarLoginFormStyle: SxProps = {
  m: 1,
  bgcolor: 'secondary.main',
};

const innerBoxLoginFormStyle: SxProps = {
  mt: 1,
};
const loginFormButtonStyle: SxProps = {
  mt: 3,
  mb: 2,
};

export {
  outerBoxLoginFormStyle,
  avatarLoginFormStyle,
  innerBoxLoginFormStyle,
  loginFormButtonStyle,
};
