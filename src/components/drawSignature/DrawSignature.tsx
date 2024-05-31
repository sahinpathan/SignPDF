import { Button } from '@mui/material';
import { useContext, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { MyContext } from '../../context/SignatureProvider';

interface Props {
  handleClose: () => void;
}

const DrawSignature: React.FC<Props> = ({ handleClose }) => {
  const sigRef = useRef<SignatureCanvas>(null);
  const { setSignature = () => {  }} = useContext(MyContext)|| {}!;

  const onUploadDraw = () => {
    const sigURL = sigRef.current?.toDataURL(); // Safe nullish check
    if (!sigURL) {
      console.error('Error: Signature canvas is empty');
      return;
    }

    setSignature(sigURL);
    handleClose();
  };

  const handleClearClick = () => {
    sigRef.current?.clear(); // Safe nullish check
  };

  return (
    <>
      <SignatureCanvas
        backgroundColor="rgba(223, 207, 215, 0.8)"
        velocityFilterWeight={1}
        ref={sigRef}
        canvasProps={{
          width: 500, // Removed quotes for consistency
          height: 200,
          className: "sigCanvas",
        }}
      />
      <div>
        <Button  color="primary" onClick={onUploadDraw}>
          Save Signature
        </Button>
        <Button  color="error" onClick={handleClearClick}>
          Clear
        </Button>
      </div>
    </>
  );
};

export default DrawSignature;