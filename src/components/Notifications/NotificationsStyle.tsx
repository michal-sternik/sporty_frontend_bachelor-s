import { SxProps } from '@mui/material';

const whiteTextAndOpenSansFont: SxProps = {
  ' > *': {
    color: 'white',
    fontFamily: 'Open Sans',
  },
};

const outerStackNofificationStyle: SxProps = {
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
  borderRadius: '15px',
  alignSelf: 'normal',
  backgroundColor: '#2C2C2C',
};
const invitationSectionStyle: SxProps = {
  width: '100%',
  borderRadius: '15px',
  // alignItems: 'center',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  minHeight: { xs: '85%', sm: 'calc(100vh - 67px - 260px)', md: '50vh' },
  alignSelf: 'normal',
  gap: '40px',
};
const userProfileInfoUpperPartStyle: SxProps = {
  minHeight: '50%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
};
const notificationNavigationPanelStyle: SxProps = {
  border: '2px solid #1976D2',
  borderRadius: '15px',
  padding: '20px',
  gap: '20px',
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
  width: '30%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const avatarUserInfoStyle: SxProps = {
  width: '70%',
  padding: '35%',
  boxSizing: 'border-box',
  position: 'relative',
};
const bottomUserProfileSectionStyle: SxProps = {
  width: '100%',
  height: '50%',
  flexDirection: 'row',
  fontFamily: 'Open Sans',
};
const achievementsSectionStyle: SxProps = {
  width: '50%',
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
const outerFriendsInvitationListStyle: SxProps = {
  width: { xs: '100%', sm: '50%' },
};
const outerEventsInvitationListStyle: SxProps = {
  width: { xs: '100%', sm: '50%' },
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: 'Open Sans',
};
export {
  outerStackNofificationStyle,
  friendsStackUserProfileStyle,
  invitationSectionStyle,
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
  notificationNavigationPanelStyle,
  outerFriendsInvitationListStyle,
  outerEventsInvitationListStyle,
};
