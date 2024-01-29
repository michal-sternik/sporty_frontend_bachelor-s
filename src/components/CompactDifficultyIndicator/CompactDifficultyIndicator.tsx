import { Stack } from '@mui/material';
import React from 'react';
import {
  BeginnerDifficultyDotStyle,
  AmateurDifficultyDotStyle,
  IntermediateDifficultyDotStyle,
  ProfessionalDifficultyDotStyle,
} from './CompactDifficultyIndicatorStyles';
import { DifficultyIndicatorProps } from '../../types';

function CompactDifficultyIndicator({ difficulty }: DifficultyIndicatorProps) {
  return (
    <Stack>
      <Stack flexDirection="row" gap="4px">
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
    </Stack>
  );
}

export default CompactDifficultyIndicator;
