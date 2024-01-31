import { SxProps } from '@mui/material';

const achievementsSectionStyle: SxProps = {
  width: '100%',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: { xs: '85%', sm: '60%', md: '50vh' },
  alignSelf: 'normal',
  gap: '40px',
};

const achievementCategoryStyle: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  justifyContent: { xs: 'center', md: 'flex-start' },
};

const singleAchievementStyleInList: SxProps = {
  width: { xs: '18%', lg: '9%' },
  position: 'relative',
  boxSizing: 'border-box',
  padding: { xs: '9%', lg: '4.5%' },
  backgroundColor: '#D9D9D9',
  borderRadius: '50%',
  '&:nth-last-child(2), &:last-child': {
    opacity: 0.5,
  },
};

export {
  achievementsSectionStyle,
  achievementCategoryStyle,
  singleAchievementStyleInList,
};
