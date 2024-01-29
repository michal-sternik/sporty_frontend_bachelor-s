/* eslint-disable import/no-duplicates */
import { Box, Tooltip } from '@mui/material';
import React from 'react';
import { AchievementType } from '../../types';
import CHAT_img from '../../assets/images/achievements/CHAT_img.png';
import ORGN01_img from '../../assets/images/achievements/ORGN01_img.png';
import ORGN05_img from '../../assets/images/achievements/ORGN05_img.png';
import ORGN10_img from '../../assets/images/achievements/ORGN10_img.png';
import ORGN50_img from '../../assets/images/achievements/ORGN50_img.png';
import PART01_img from '../../assets/images/achievements/PART01_img.png';
import PART05_img from '../../assets/images/achievements/PART05_img.png';
import PART10_img from '../../assets/images/achievements/PART10_img.png';
import PART50_img from '../../assets/images/achievements/PART50_img.png';
import TIME01_img from '../../assets/images/achievements/TIME01_img.png';
import TIME10_img from '../../assets/images/achievements/TIME10_img.png';
import TIME24_img from '../../assets/images/achievements/TIME24_img.png';
import FRIE01_img from '../../assets/images/achievements/FRIE01_img.png';
import FRIE05_img from '../../assets/images/achievements/FRIE05_img.png';
import FRIE10_img from '../../assets/images/achievements/FRIE10_img.png';
import FRIE100_img from '../../assets/images/achievements/FRIE100_img.png';
import FRIE50_img from '../../assets/images/achievements/FRIE50_img.png';
import FRIE500_img from '../../assets/images/achievements/FRIE500_img.png';
import NOTOBTAINED_img from '../../assets/images/achievements/NOTOBTAINED_img.png';
import convertToFormattedDateString from '../../utils/dateUtils';

type AchievementImageKey = keyof typeof achievementsImages;

const achievementsImages = {
  CHAT: CHAT_img,
  ORGN01: ORGN01_img,
  ORGN05: ORGN05_img,
  ORGN10: ORGN10_img,
  ORGN50: ORGN50_img,
  PART01: PART01_img,
  PART05: PART05_img,
  PART10: PART10_img,
  PART50: PART50_img,
  TIME01: TIME01_img,
  TIME10: TIME10_img,
  TIME24: TIME24_img,
  FRIE01: FRIE01_img,
  FRIE05: FRIE05_img,
  FRIE10: FRIE10_img,
  FRIE100: FRIE100_img,
  FRIE50: FRIE50_img,
  FRIE500: FRIE500_img,
  NOTOBTAINED: NOTOBTAINED_img,
};

function Achievement({ id, description, obtained }: AchievementType) {
  if (id && (id as AchievementImageKey) in achievementsImages) {
    const textObtained = obtained
      ? `, otrzymano: ${convertToFormattedDateString(obtained!)}`
      : '';
    const tooltipContent = `${description}${textObtained}`;
    return (
      <Tooltip title={tooltipContent} placement="right">
        <Box
          sx={{
            position: 'relative',
            boxSizing: 'border-box',
            padding: { xs: '8%', lg: '8%' },
            borderRadius: '50%',
            backgroundColor: '#D9D9D9',
            overflow: 'hidden',
            opacity: obtained ? 1 : 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${
              achievementsImages[id as AchievementImageKey]
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: obtained
                ? 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.8),rgba(255,255,255,0) 70% )'
                : 'none',
              animation: 'shineEffect 3s linear infinite',
            },
            '@keyframes shineEffect': {
              '0%': { left: '-100px' },
              '20%': { left: '100%' },
              '100%': { left: '100%' },
            },
          }}
        />
      </Tooltip>
    );
  }
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
      <span>{description}</span>
    </Box>
  );
}

export default Achievement;
