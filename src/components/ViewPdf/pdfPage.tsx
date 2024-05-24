import { PDFViewer } from '@react-pdf/renderer';
import { PdfView } from './PdfView';
import { useContext } from 'react';
import { MyContext } from '../../context/SignatureProvider';


function PdfPage() {
  const context = useContext(MyContext) || {signature:""}!;
    
  console.log("context",context?.signature)
  return (
    <>
       <PDFViewer
        key="pdfDocument"
        style={{
          flex: 1,
          width: "100%",
          height: "100vh",
        }}
      >
        <PdfView
          // handleChange={handleChange}
          signatureImg={context?.signature}
          signatureDate={new Date().toISOString()}
        />
      </PDFViewer>
    </>
  )
}

export { PdfPage };

