import { SxProps } from '@mui/material';

const whiteTextAndOpenSansFont: SxProps = {
  flex: 'none',
  ' > *': {
    color: 'white',
    fontFamily: 'Open Sans',
  },
};

const outerStackUserProfileStyle: SxProps = {
  width: '100%',
  height: { xs: 'auto', sm: 'calc(100vh - 67px)' },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: '20px',
  padding: '20px',
  backgroundColor: '#202020',
  fontFamily: 'Open Sans',
};
const friendsStackUserProfileStyle: SxProps = {
  width: { xs: '100%', md: '30%', lg: '25%' },
  borderRadius: '5px',
  alignSelf: 'normal',
  backgroundColor: '#2C2C2C',
  height: { xs: '220px', md: 'auto' },
};
const userProfileInfoStyle: SxProps = {
  width: '100%',
  borderRadius: '5px',
  alignItems: 'center',
  display: 'flex',
  minHeight: { xs: 'calc(100vh - 67px - 260px)', md: '50vh' },
  overflowY: { xs: 'scroll', md: 'hidden' },
  alignSelf: 'normal',
  backgroundColor: '#2C2C2C',
  position: 'relative',
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
const userProfileInfoUpperPartStyle: SxProps = {
  minHeight: { xs: 'auto', md: '50%' },
  width: '100%',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  position: 'relative',
};
const iconButtonUserInfoStyle: SxProps = {
  '&:hover': {
    backgroundColor: '#C0C0C0',
  },
  p: 1,
  borderRadius: '33%',
  backgroundColor: '#ffffff',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
};
const avatarAreaUserInfoStyle: SxProps = {
  width: '60%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};
const avatarUserInfoStyle: SxProps = {
  width: '60%',
  padding: '30%',
  boxSizing: 'border-box',
  position: 'relative',
};
const bottomUserProfileSectionStyle: SxProps = {
  width: '100%',
  height: '100%',
  flexDirection: { sm: 'column', md: 'row' },
  fontFamily: 'Open Sans',
};
const achievementsSectionStyle: SxProps = {
  width: { xs: '100%', md: '50%' },
  height: '100%',
  display: 'flex',
  color: 'white',
  padding: '30px',
  justifyContent: 'space-between',
};
const achievementsListSectionStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  width: '100%',
};
const singleAchievementStyle: SxProps = {
  width: '20%',
  position: 'relative',
  boxSizing: 'border-box',
  padding: '10%',
  backgroundColor: '#D9D9D9',
  borderRadius: '50%',
  '&:nth-last-child(2), &:last-child': {
    opacity: 0.5,
  },
};
const singleEventInUserInfoWrapper: SxProps = {
  width: '100%',
  position: 'relative',
  boxSizing: 'border-box',
};
export {
  outerStackUserProfileStyle,
  friendsStackUserProfileStyle,
  userProfileInfoStyle,
  userProfileInfoUpperPartStyle,
  iconButtonUserInfoStyle,
  avatarAreaUserInfoStyle,
  avatarUserInfoStyle,
  achievementsSectionStyle,
  bottomUserProfileSectionStyle,
  achievementsListSectionStyle,
  singleAchievementStyle,
  whiteTextAndOpenSansFont,
  singleEventInUserInfoWrapper,
};
