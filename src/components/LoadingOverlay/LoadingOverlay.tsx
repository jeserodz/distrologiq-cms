import React from 'react';
import * as Mui from '@material-ui/core';

export function LoadingOverlay() {
  return (
    <Mui.Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="rgba(255,255,255,0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Mui.CircularProgress variant="indeterminate" color="primary" />
    </Mui.Box>
  );
}
