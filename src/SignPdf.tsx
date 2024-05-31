import SimpleDialogDemo from "./components/SimpleDialog"
import { DynamicPdfHtml } from "./components/ViewPdf/PdfView";
import { PdfPage } from "./components/ViewPdf/pdfPage"
import { SignatureProvider } from "./context/SignatureProvider"

type TSignPdf = {
  dynamicHtml:DynamicPdfHtml;
}
function SignPdf({dynamicHtml}:TSignPdf) {



  return (
    <>
      <SignatureProvider>
        <div className={dynamicHtml?.class?.container}>
          <SimpleDialogDemo subContainer={dynamicHtml?.class?.subContainer} title={"Upload Signature"} isUpload={true} />
          <SimpleDialogDemo title={"Draw Signature"} />
        </div>
        <PdfPage dynamicHtml={dynamicHtml} />
      </SignatureProvider>
    </>
  )
}

export  {SignPdf}
