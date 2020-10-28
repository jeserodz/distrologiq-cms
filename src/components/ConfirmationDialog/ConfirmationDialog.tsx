import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

interface Props {
  open: boolean;
  title?: string;
  body?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => any;
  onConfirm: () => any;
}

export function ConfirmationDialog(props: Props) {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>{props.title || 'Confirmar'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.body || '¿Está seguro que desea realizar esta acción?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={props.onConfirm} color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
