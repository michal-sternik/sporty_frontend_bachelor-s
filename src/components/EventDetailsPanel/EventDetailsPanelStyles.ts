import { SxProps } from '@mui/material';

const eventDetailsPanelStyle: SxProps = {
  height: '100%',
  padding: '12px 12px 12px 12px',
};

const eventDetailsPanelContentStyle: SxProps = {};

const eventDetailsPanelHeaderTitleStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#DDDDDD',
  fontSize: '24px',
  fontWeight: '600',
};

const eventDetailsPanelControlsStyle: SxProps = {
  minHeight: '88px',
  padding: '24px',
};

const eventDetailsPanelBackArrowIconStyle: SxProps = { color: '#DDDDDD' };

const eventDetailsPanelAcceptButtonStyle: SxProps = {
  '&:hover': {
    '& svg': {
      color: '#1EC66C',
    },
  },
};

const eventDetailsPanelAcceptIconStyle: SxProps = { color: '#DDDDDD' };

const eventDetailsPanelHeaderContentStyle: SxProps = {
  padding: '8px 0px',
  marginLeft: '24px',
};

const eventDetailsPanelFirstInfoLineStyle: SxProps = { marginBottom: '4px' };

const eventDetailsPanelFirstInfoLineUserIconStyle: SxProps = {
  marginRight: '6px',
  color: '#DDDDDD',
  fontSize: '24px',
  fontWeight: '600',
};

const eventDetailsPanelFirstInfoLineUserNameStyle: SxProps = {
  color: '#DDDDDD',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelFirstInfoLineParticipantsIconStyle: SxProps = {
  marginRight: '8px',
  color: '#DDDDDD',
  fontSize: '26px',
  fontWeight: '400',
};

const eventDetailsPanelFirstInfoLineParticipantsStyle: SxProps = {
  color: '#DDDDDD',
  fontWeight: '400',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelSecondInfoLineStartTimeIconStyle: SxProps = {
  marginRight: '6px',
  color: '#1EC66C',
  fontSize: '24px',
};

const eventDetailsPanelSecondInfoLineEndTimeIconStyle: SxProps = {
  marginRight: '6px',
  color: '#FF3700',
  fontSize: '24px',
};

const eventDetailsPanelSecondInfoLineStartTimeStyle: SxProps = {
  color: '#1EC66C',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelSecondInfoLineEndTimeStyle: SxProps = {
  color: '#FF3700',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelExtraInfoStyle: SxProps = {
  marginTop: '24px',
};

const eventDetailsPanelMainAreaStyle: SxProps = {
  margin: '0px 24px 24px 24px',
  padding: '0px 24px 0px 0px',
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

const eventDetailsPanelDescriptionStyle: SxProps = {
  marginTop: '24px',
};

const eventDetailsPanelDescriptionTitleStyle: SxProps = {
  marginBottom: '4px',
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelDescriptionContentStyle: SxProps = {
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: 'Open Sans, sans-serif',
};

const eventDetailsPanelParticipantsListGreenIconStyle: SxProps = {
  color: '#1EC66C',
  marginRight: '8px',
  fontSize: '26px',
};

const eventDetailsPanelParticipantsListYellowIconStyle: SxProps = {
  color: '#FFD000',
  marginRight: '8px',
  fontSize: '26px',
};

const eventDetailsPanelParticipantsListRedIconStyle: SxProps = {
  color: '#FF3700',
  marginRight: '8px',
  fontSize: '26px',
};

const eventDetailsPanelParticipantsTitleStyle: SxProps = {
  marginBottom: '16px',
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Open Sans, sans-serif',
};

export {
  eventDetailsPanelHeaderTitleStyle,
  eventDetailsPanelStyle,
  eventDetailsPanelContentStyle,
  eventDetailsPanelControlsStyle,
  eventDetailsPanelBackArrowIconStyle,
  eventDetailsPanelAcceptIconStyle,
  eventDetailsPanelHeaderContentStyle,
  eventDetailsPanelAcceptButtonStyle,
  eventDetailsPanelFirstInfoLineStyle,
  eventDetailsPanelFirstInfoLineUserIconStyle,
  eventDetailsPanelFirstInfoLineUserNameStyle,
  eventDetailsPanelSecondInfoLineStartTimeIconStyle,
  eventDetailsPanelSecondInfoLineEndTimeIconStyle,
  eventDetailsPanelSecondInfoLineStartTimeStyle,
  eventDetailsPanelSecondInfoLineEndTimeStyle,
  eventDetailsPanelExtraInfoStyle,
  eventDetailsPanelDescriptionStyle,
  eventDetailsPanelDescriptionTitleStyle,
  eventDetailsPanelDescriptionContentStyle,
  eventDetailsPanelMainAreaStyle,
  eventDetailsPanelFirstInfoLineParticipantsIconStyle,
  eventDetailsPanelFirstInfoLineParticipantsStyle,
  eventDetailsPanelParticipantsListGreenIconStyle,
  eventDetailsPanelParticipantsListYellowIconStyle,
  eventDetailsPanelParticipantsListRedIconStyle,
  eventDetailsPanelParticipantsTitleStyle,
};
