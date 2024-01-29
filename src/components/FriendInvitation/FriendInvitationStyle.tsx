import { SxProps } from '@mui/material';

const friendInvitationStyle: SxProps = {
  display: 'flex',
  backgroundColor: '#2C2C2C',
  width: '100%',
  minHeight: { xs: '35%', sm: '30%', md: '25%', lg: '25%' },
  borderRadius: '15px',
  padding: '20px',
  gap: '20px',
  position: 'relative',
  overflow: 'hidden',
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  '&::before': {
    content: '" "',
    position: 'absolute',
    top: '-100%',
    left: { xs: '-90%', lg: '-60%' },
    height: '140vh',
    width: '140vh',
    // width: '100%',
    // top: { xs: '-50vh', lg: '-40vh' },
    // left: { xs: '-30%', lg: '-10%' },
    // height: { xs: '100vh', lg: '80vh' },
    // padding: { xs: '200px', lg: '100px' },
    background: 'linear-gradient(#00ccff, #d400d4)',
    animation: 'rotate 4s linear infinite;',
  },
  '&::after': {
    content: '" "',
    position: 'absolute',
    background: '#2C2C2C',
    inset: '3px',
    borderRadius: '15px',
  },
  '& > *': {
    zIndex: '99',
  },
};
const buttonSectionFriendInvitationStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
};
export { friendInvitationStyle, buttonSectionFriendInvitationStyle };
