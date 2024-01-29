import { SxProps } from '@mui/material';

const outerStackHeaderStyle: SxProps = {
  width: '100%',
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 70px 0px 16px',
  fontWeight: '500',
  fontSize: '1.3rem',
  zIndex: 10,
};
const navLinkLogoStyle: SxProps = {
  fontFamily: 'Pacifico',
  fontSize: '24px',
  color: '#DDDDDD',
};
const innerStackHeaderStyle: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  '& > * ': { paddingRight: '20px' },
  width: { xs: '70%', sm: 'unset' },
};
const helloUserTypographyStyle: SxProps = {
  color: 'white',
  fontSize: { xs: '12px', sm: '14px', md: '16px' },
};
const boxAvatarHeaderStyle: SxProps = {
  flexGrow: 0,
  zIndex: 9999,
};
const iconButtonHeaderStyle: SxProps = {
  '&:hover': {
    backgroundColor: '#C0C0C0',
  },
  p: 1,
  borderRadius: '33%',
  backgroundColor: '#ffffff',
  position: 'relative',
};

const dropMenuHeaderStyle: SxProps = {
  mt: '45px',
};

const typographyLogInSignUpHeaderStyle: SxProps = {
  color: 'white',
  padding: '0 20px',
  transition: '0.3s ease-in-out',
  '&:hover': {
    color: 'rgba(156, 39, 176, 1)',
  },
};
const notificationButtonStyle: SxProps = {
  position: 'relative',
  color: 'white',
  border: '2px solid rgb(25, 118, 210, 1)',
  borderRadius: '15px',
  padding: '8px',
  transition: '0.2s',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 1)',
  },
};
const notoficationButtonExclamationMarkStyle: SxProps = {
  position: 'absolute',
  backgroundColor: 'red',
  borderRadius: '50px',
  height: '14px',
  width: '14px',
  top: -5,
  right: -5,
  animation: 'pulse 2s infinite',
  transition: 'transform 0.5s',
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.3)',
    },
  },
};

export {
  outerStackHeaderStyle,
  navLinkLogoStyle,
  innerStackHeaderStyle,
  helloUserTypographyStyle,
  boxAvatarHeaderStyle,
  iconButtonHeaderStyle,
  dropMenuHeaderStyle,
  typographyLogInSignUpHeaderStyle,
  notificationButtonStyle,
  notoficationButtonExclamationMarkStyle,
};
