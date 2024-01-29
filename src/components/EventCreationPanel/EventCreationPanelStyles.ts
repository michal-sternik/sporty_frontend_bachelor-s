import type { SxProps } from '@mui/system';

const eventCreationPanelStyle: SxProps = {
  height: '100%',
  padding: '12px 12px 12px 12px',
};

const eventCreationPanelContentStyle: SxProps = {
  padding: '24px',
  backgroundColor: '#2C2C2C',
  borderRadius: '5px',
};

const eventCreationPanelControlsStyle: SxProps = { marginBottom: '24px' };

const eventCreationPanelBackArrowIconStyle: SxProps = {
  color: '#DDDDDD',
};

const eventCreationPanelAcceptButtonStyle: SxProps = {
  '&:hover': {
    '& svg': {
      color: '#1EC66C',
    },
  },
};

const eventCreationPanelAcceptIconStyle: SxProps = { color: '#DDDDDD' };

const eventCreationPanelTitleStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#DDDDDD',
  fontSize: '24px',
  fontWeight: '600',
};

const eventCreationPanelEventCreationSectionStyle: SxProps = {
  paddingRight: '16px',
  '&::-webkit-scrollbar': {
    width: '10px',
    backgroundColor: '#202020',
    borderRadius: '5px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#343434',
    borderRadius: '5px',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '#202020',
    borderRadius: '5px',
  },
};

const eventCreationPanelEventCreationFormStyle: SxProps = {
  marginTop: '24px',
};

const eventCreationPanelEventCreationFormTitleStyle: SxProps = {};

const eventCreationPanelEventCreationFormDisciplineFormControlStyle: SxProps =
  {};

const eventCreationPanelEventCreationFormDisciplineSelectStyle: SxProps = {};

const eventCreationPanelEventCreationFormDescriptionStyle: SxProps = {};

const eventCreationPanelEventCreationFormPlayersAndDifficultyRowStyle: SxProps =
  {
    gap: '16px',
    flexWrap: 'wrap',
  };

const eventCreationPanelEventCreationFormPlayersStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

const eventCreationPanelEventCreationFormDifficultyStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

const eventCreationPanelEventCreationFormDatesRowStyle: SxProps = {
  gap: '16px',
  flexWrap: 'wrap',
};

const eventCreationPanelEventCreationFormStartDateStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

const eventCreationPanelEventCreationFormEndDateStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

const eventCreationPanelEventCreationFormCoordsRowStyle: SxProps = {
  gap: '16px',
  flexWrap: 'wrap',
};

const eventCreationPanelEventCreationFormCoordsLatStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

const eventCreationPanelEventCreationFormCoordsLonStyle: SxProps = {
  flexGrow: 1,
  flexBasis: 0,
  minWidth: '240px',
};

export {
  eventCreationPanelTitleStyle,
  eventCreationPanelStyle,
  eventCreationPanelContentStyle,
  eventCreationPanelAcceptIconStyle,
  eventCreationPanelBackArrowIconStyle,
  eventCreationPanelControlsStyle,
  eventCreationPanelAcceptButtonStyle,
  eventCreationPanelEventCreationSectionStyle,
  eventCreationPanelEventCreationFormStyle,
  eventCreationPanelEventCreationFormTitleStyle,
  eventCreationPanelEventCreationFormDisciplineFormControlStyle,
  eventCreationPanelEventCreationFormDisciplineSelectStyle,
  eventCreationPanelEventCreationFormDescriptionStyle,
  eventCreationPanelEventCreationFormPlayersAndDifficultyRowStyle,
  eventCreationPanelEventCreationFormPlayersStyle,
  eventCreationPanelEventCreationFormDifficultyStyle,
  eventCreationPanelEventCreationFormDatesRowStyle,
  eventCreationPanelEventCreationFormStartDateStyle,
  eventCreationPanelEventCreationFormEndDateStyle,
  eventCreationPanelEventCreationFormCoordsRowStyle,
  eventCreationPanelEventCreationFormCoordsLatStyle,
  eventCreationPanelEventCreationFormCoordsLonStyle,
};
