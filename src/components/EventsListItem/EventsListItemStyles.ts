import type { SxProps } from '@mui/system';

const eventsListItemStyle: SxProps = {
  width: '100%',
  padding: '12px 12px 0px 12px',

  '&:last-child': {
    padding: '12px 12px 12px 12px',
  },
  '&:first-of-type': {
    padding: '0px 12px 0px 12px',
  },
};

const eventsListItemContentStyle: SxProps = {
  backgroundColor: '#2C2C2C',
  borderRadius: '5px',
  padding: '12px 16px',
  cursor: 'pointer',
};

const eventsListItemContentLinkStyle = { height: '100%' };

const eventsListItemTitleStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#DDDDDD',
  fontSize: '16px',
  fontWeight: '600',
};

const eventsListItemContentStartTimeTextStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#1EC66C',
  fontSize: '11px',
  fontWeight: '600',
};

const eventsListItemContentStartTimeIconStyle: SxProps = {
  fontSize: '16px',
  color: '#1EC66C',
  fontWeight: 600,
};

const eventsListItemContentEndTimeTextStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#FF3700',
  fontSize: '11px',
  fontWeight: '600',
};

const eventsListItemContentEndTimeIconStyle: SxProps = {
  fontSize: '16px',
  color: '#FF3700',
  fontWeight: 600,
};

const eventsListItemContentOrganizerIconStyle: SxProps = {
  fontSize: '16px',
  color: '#DDDDDD',
  fontWeight: 600,
};

const eventsListItemContentOrganizerTextStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#DDDDDD',
  fontSize: '11px',
  fontWeight: '700',
};

const eventsListItemContentParticipantsIconStyle: SxProps = {
  fontSize: '18px',
  color: '#DDDDDD',
  fontWeight: 600,
};

const eventsListItemContentParticipantsTextStyle: SxProps = {
  fontFamily: 'Open Sans, sans-serif',
  color: '#DDDDDD',
  fontSize: '11px',
  fontWeight: '400',
};

export {
  eventsListItemStyle,
  eventsListItemContentStyle,
  eventsListItemTitleStyle,
  eventsListItemContentStartTimeTextStyle,
  eventsListItemContentStartTimeIconStyle,
  eventsListItemContentEndTimeTextStyle,
  eventsListItemContentEndTimeIconStyle,
  eventsListItemContentOrganizerIconStyle,
  eventsListItemContentOrganizerTextStyle,
  eventsListItemContentLinkStyle,
  eventsListItemContentParticipantsIconStyle,
  eventsListItemContentParticipantsTextStyle,
};
