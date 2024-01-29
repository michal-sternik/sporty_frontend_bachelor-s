import type { SxProps } from '@mui/system';

const DifficultyStyle: SxProps = {
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

const DifficultyDotsStyle: SxProps = {
  margin: '8px 0px 4px 0px',
};

const BeginnerDifficultyDotStyle: SxProps = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  borderRadius: '50%',
  backgroundColor: '#1EC66C',
};

const AmateurDifficultyDotStyle: SxProps = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  borderRadius: '50%',
  backgroundColor: '#FFD000',
};

const IntermediateDifficultyDotStyle: SxProps = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  borderRadius: '50%',
  backgroundColor: '#FF3700',
};

const ProfessionalDifficultyDotStyle: SxProps = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  borderRadius: '50%',
  backgroundColor: '#8c1b94',
};

const DifficultyDescriptionStyle: SxProps = {
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: 'Open Sans, sans-serif',
};

export {
  DifficultyStyle,
  DifficultyDotsStyle,
  BeginnerDifficultyDotStyle,
  AmateurDifficultyDotStyle,
  DifficultyDescriptionStyle,
  IntermediateDifficultyDotStyle,
  ProfessionalDifficultyDotStyle,
};
