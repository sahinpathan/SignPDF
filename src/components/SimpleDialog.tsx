import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import "./SimpleDialog.css";
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import ImgCrop from './imageCropper/ImgCrop';


export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  isUpload: boolean;
}

interface SimpleDialogDemoProps {
  title: string;
  isUpload?:boolean;
}
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open,isUpload } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Signature</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isUpload ? (<ImgCrop handleClose={handleClose}/>):null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default function SimpleDialogDemo({title,isUpload = false}:SimpleDialogDemoProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='sub-container'>
      <Button  variant="outlined" onClick={handleClickOpen}>
        {title}
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        isUpload={isUpload}
      />
    </div>
  );
}
