import { Stack, Typography } from '@mui/material';
import React from 'react';
import {
  DifficultyDescriptionStyle,
  BeginnerDifficultyDotStyle,
  DifficultyDotsStyle,
  DifficultyStyle,
  AmateurDifficultyDotStyle,
  IntermediateDifficultyDotStyle,
  ProfessionalDifficultyDotStyle,
} from './DifficultyIndicatorStyles';
import { DifficultyIndicatorProps } from '../../types';

function DifficultyIndicator({ difficulty }: DifficultyIndicatorProps) {
  let difficultyLevel = '';
  if (difficulty === 0) {
    difficultyLevel = 'Początkujący';
  } else if (difficulty === 1) {
    difficultyLevel = 'Amator';
  } else if (difficulty === 2) {
    difficultyLevel = 'Średniozaawansowany';
  } else if (difficulty === 3) {
    difficultyLevel = 'Profesjonalista';
  }

  return (
    <Stack>
      <Typography sx={DifficultyStyle}>Poziom zaawansowania</Typography>
      <Stack flexDirection="row" sx={DifficultyDotsStyle}>
        {difficulty === 0 && <Stack sx={BeginnerDifficultyDotStyle} />}
        {difficulty === 1 && (
          <>
            <Stack sx={AmateurDifficultyDotStyle} />
            <Stack sx={AmateurDifficultyDotStyle} />
          </>
        )}
        {difficulty === 2 && (
          <>
            <Stack sx={IntermediateDifficultyDotStyle} />
            <Stack sx={IntermediateDifficultyDotStyle} />
            <Stack sx={IntermediateDifficultyDotStyle} />
          </>
        )}
        {difficulty === 3 && (
          <>
            <Stack sx={ProfessionalDifficultyDotStyle} />
            <Stack sx={ProfessionalDifficultyDotStyle} />
            <Stack sx={ProfessionalDifficultyDotStyle} />
            <Stack sx={ProfessionalDifficultyDotStyle} />
          </>
        )}
      </Stack>
      <Typography sx={DifficultyDescriptionStyle}>{difficultyLevel}</Typography>
    </Stack>
  );
}

export default DifficultyIndicator;
