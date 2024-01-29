import { SxProps } from '@mui/material';

const outerStackUserSidebarStyle: SxProps = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const innerStackUserSidebarStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '80d8ff',
  padding: '20px',
  gap: '10px',
  fontSize: '1.3rem',
  fontWeight: '600',
};
const activePageOptionUserSidebarStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '20px',
  backgroundColor: 'rgb(246, 246, 246)',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'black',
};
const inactivePageOptionUserSidebarStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '20px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(246, 246, 246)',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'black',
  },
};

export {
  outerStackUserSidebarStyle,
  innerStackUserSidebarStyle,
  activePageOptionUserSidebarStyle,
  inactivePageOptionUserSidebarStyle,
};
