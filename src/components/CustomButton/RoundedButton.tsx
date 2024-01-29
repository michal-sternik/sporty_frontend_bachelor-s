import React from 'react';
import Button from '@mui/material/Button';

interface RoundedButtonProps {
  text: string;
  onClick: (arg?: any) => void;
  disabled?: boolean;
}

function RoundedButton({
  text,
  onClick,
  disabled = false,
}: RoundedButtonProps) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={() => onClick && onClick()}
      sx={{
        borderRadius: '50px',
        fontFamily: 'Open Sans',
        textTransform: 'none',
      }}
    >
      <b>{text}</b>
    </Button>
  );
}

export default RoundedButton;
