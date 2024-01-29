import { SxProps } from '@mui/material';

const outerStackFriendsInvitationListStyle: SxProps = {
  width: '100%',
  height: '100%',
  gap: '20px',
  overflowY: 'scroll',
  padding: '10px',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '5px',
    background: '#2C2C2C',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'grey',
    borderRadius: '10px',
  },
};

export default outerStackFriendsInvitationListStyle;
