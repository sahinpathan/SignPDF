import SimpleDialogDemo from "./components/SimpleDialog"
import { PdfPage } from "./components/ViewPdf/pdfPage"
import { SignatureProvider } from "./context/SignatureProvider"


function SignPdf() {

  return (
    <>
      <SignatureProvider>
        <div className='container'>
          <SimpleDialogDemo title={"Upload Signature"} isUpload={true} />
          <SimpleDialogDemo title={"Draw Signature"} />
        </div>
        <PdfPage />
      </SignatureProvider>
    </>
  )
}

export  {SignPdf}
