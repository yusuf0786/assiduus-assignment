import * as React from 'react';
import { useState } from 'react';
import {Box, Button, Typography, Modal, styled} from '@mui/material';

const modalBodyStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: "500px",
  margin:"0 8px",
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 1,
  p: 2,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function ModalComponent() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedFile(null)
    setOpen(false)
  };

  const handleSubmit = () => {
    console.log("Uploaded:", selectedFileName);
    setSelectedFile(null)
    setOpen(false);
  };
  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0])
      let fileName = e.target.files[0].name
      let fileNameLength = fileName.length;

      if (fileNameLength < 20) {
        setSelectedFileName(fileName)
      } else {
        let extensionDelimiterIndex = fileName.lastIndexOf('.');
        let middleRemovedName = `${fileName.substring(0,10)}...${fileName.substring(extensionDelimiterIndex - 5)}`
        setSelectedFileName(middleRemovedName)
      }
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button onClick={handleOpen} variant="outlined" disableElevation>New Sales Invoice</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBodyStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h3" fontWeight={700} sx={{ mb:1 }}>
            Upload a File
          </Typography>
          <Typography id="modal-modal-description">
            { selectedFile ? "File Selected" : "Choose a file"}
          </Typography>
          {selectedFile ? <Typography variant='body1' marginRight="1rem" sx={{ mb:1 }}>{selectedFileName}</Typography>
          :<Button component="label" variant="contained" sx={{ marginRight:"1rem" }}> Upload file <VisuallyHiddenInput onChange={(e) => handleFileChange(e)} type="file" />
            </Button>}
          <Button variant="contained" onClick={handleClose} sx={{ marginRight:"1rem" }}>
            Cancel
          </Button>
          {selectedFile && (
            <Button variant="contained" onClick={handleSubmit} disabled> Submit </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}