import * as React from 'react';
import { useState } from 'react';
import {Box, Button, Typography, Modal, styled} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  maxWidth: "500px",
  margin:"0 8px",
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 1,
  p: 0,

  display: "flex",
  flexDirection: "column",
  flexWarp: "nowrap",

  // important for modal body scroll
  maxHeight: "100%",
  overflow: "hidden",
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

const modalHeaderStyle = {
  padding: "20px",
}
const modalBodyStyle = {
  padding: "10px 20px",
  overflowY: "auto",
}
const modalFooterStyle = {
  marginTop: "auto",
  padding: "20px",
}

/*
{
  btn: {
    btnVariant= "outlined",
    disableElevation= true,
    value= "New Sales Invoice",
  },
  modalBodyMaxHeight: 260,
}
*/
export function ModalComponent({
  btn= {
    variant,
    disableElevation,
    value,
  },
  btnUpload= {
    text,
  },
  btnCancel= {
    text,
  },
  btnSubmit= {
    text,
  },
  modalBodyMaxHeight= 225,
  head= {
    text,
  }
}) {
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
      <Button onClick={handleOpen} variant={btn.variant} disableElevation={btn.disableElevation}>{btn.value}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...modalStyle, maxHeight:modalBodyMaxHeight}}>
          <Box sx={modalHeaderStyle}>
            <Typography id="modal-modal-title" variant="h4" component="h3" fontWeight={700} sx={{ mb:1 }}>{head.text}</Typography>
          </Box>
          <Box sx={modalBodyStyle}>
            <Typography id="modal-modal-description">
              { selectedFile ? `File Selected: ${selectedFileName}` : "Choose a file"}
            </Typography>
          </Box>
          <Box sx={modalFooterStyle}>
            {!selectedFile && <Button component="label" variant="contained" sx={{ marginRight:"1rem" }}>
              {btnUpload.text} <VisuallyHiddenInput onChange={(e) => handleFileChange(e)} type="file" />
            </Button>}
            <Button variant="contained" onClick={handleClose} sx={{ marginRight:"1rem" }}>{btnCancel.text}</Button>
            {selectedFile && (
              <Button variant="contained" onClick={handleSubmit} disabled>{btnSubmit.text}</Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}