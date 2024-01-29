import { SxProps } from '@mui/material';

const outerStackAccountSettingsStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
};
const innerStackAccountSettingsStyle: SxProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '20px 20px',
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
};
const formControlLabelSwitchEditDataStyle: SxProps = {
  position: 'absolute',
  top: '40%',
  left: '5%',
};
const editDataContainerStyle: SxProps = {
  height: '100%',
};
const editDataToggerOnStyle: SxProps = {
  mt: 3,
  position: 'relative',
  height: '100%',
};
const editDataToggerOffStyle: SxProps = {
  mt: 3,
  pointerEvents: 'none',
  opacity: 0.5,
  position: 'relative',
  height: '100%',
};
const buttonSubmitEditDataStyle: SxProps = {
  mt: 3,
  mb: 2,
  position: 'absolute',
  bottom: 24,
};
export {
  outerStackAccountSettingsStyle,
  innerStackAccountSettingsStyle,
  formControlLabelSwitchEditDataStyle,
  editDataContainerStyle,
  editDataToggerOnStyle,
  editDataToggerOffStyle,
  buttonSubmitEditDataStyle,
};
