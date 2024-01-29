import type { SxProps } from '@mui/system';

const eventsListPanelStyles: SxProps = {
  '&::-webkit-scrollbar': {
    width: '10px',
    backgroundColor: '#2C2C2C',
    borderRadius: '5px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#343434',
    borderRadius: '5px',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '#2C2C2C',
    borderRadius: '5px',
  },
};

export default eventsListPanelStyles;
