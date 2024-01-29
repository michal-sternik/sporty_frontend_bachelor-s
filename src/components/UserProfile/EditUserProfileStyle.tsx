import { SxProps } from '@mui/material';
import THEME from '../../theme';

const outerStackUserProfileStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Open Sans',
  backgroundColor: THEME.palette.background.paper,
  flexGrow: 1,
  position: 'relative',
  height: '100vh',
};
const typographyMyProfileUserProfileStyle: SxProps = {
  marginTop: '3vh',
  marginBottom: '3vh',
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Open Sans',
};
const userGreetingTypographyStyle: SxProps = {
  marginTop: '3vh',
  padding: '0 0 1% 10%',
  fontSize: { sm: '14px', md: '18px', lg: '20px', xl: '25px' },
  backgroundColor: 'linear-gradient(90deg, #000, #fff, #000)',
  animation: 'animate 3s linear infinite',
  width: { xl: '60%', md: '100%' },
  WebkitMaskImage:
    'linear-gradient(-75deg, rgba(255,255,255,0.1), #ffffff 99%, rgba(255,255,255,0.1))',
  WebkitMaskSize: '200%',
  WebkitBackgroundClip: 'text',
  '@keyframes animate': {
    '0%': {
      WebkitMaskPosition: '150%',
    },
    '100%': {
      WebkitMaskPosition: '-50%',
    },
  },
};
const stackUserProfileStyle: SxProps = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  width: '100%',
  justifyContent: { xs: 'flex-start', sm: 'center' },
  gap: '20px',
  minHeight: { sm: '65vh', md: '65vh', xl: '65vh' },
  padding: '2%',
};
const innerStackUserProfileStyle: SxProps = {
  width: { xs: '97%', sm: '30%', md: '20%' },
  border: '1px solid rgb(207,207,207)',
  borderRadius: '5px',
  alignSelf: { xs: 'center', sm: 'normal' },
};

const activePageStackUserProfileStyle: SxProps = {
  width: { xs: '97%', md: '60%', lg: '68%' },
  border: '1px solid rgb(207,207,207)',
  borderRadius: '5px',
  alignItems: 'center',
  display: 'flex',
  minHeight: { xs: '85%', sm: '60%', md: '50vh' },
  alignSelf: { xs: 'center', sm: 'normal' },
};
const backIconEditUserInfoStyle: SxProps = {
  position: 'absolute',
  top: '10%',
  left: '5%',
  color: 'black',
};
export {
  outerStackUserProfileStyle,
  typographyMyProfileUserProfileStyle,
  userGreetingTypographyStyle,
  stackUserProfileStyle,
  innerStackUserProfileStyle,
  activePageStackUserProfileStyle,
  backIconEditUserInfoStyle,
};
