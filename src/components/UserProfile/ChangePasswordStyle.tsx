import { SxProps } from '@mui/material';
import { outerStackAccountSettingsStyle } from './AccountSettingsStyle';

const outerStackChangePasswordStyle: SxProps = outerStackAccountSettingsStyle;

const typographyChangePasswordLabel: SxProps = {
  padding: '20px',
};
const containerChangePasswordStyle: SxProps = {
  height: '100%',
};
const boxChangePasswordStyle: SxProps = {
  mt: 3,
  position: 'relative',
  height: '100%',
};
const buttonChangePasswordStyle: SxProps = {
  mt: 3,
  mb: 2,
  position: 'absolute',
  bottom: '24px',
};
export {
  outerStackChangePasswordStyle,
  typographyChangePasswordLabel,
  containerChangePasswordStyle,
  boxChangePasswordStyle,
  buttonChangePasswordStyle,
};
