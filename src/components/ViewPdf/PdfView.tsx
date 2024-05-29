import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useEffect } from "react";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 305,
    maxWidth: 150,
  },
  signature:{
    width:100,
    height:50,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  list: {
    paddingLeft: 41,
    textIndent: -18,
    lineHeight: 1.14,
    textAlign: 'left',
    margin: 12,
    fontSize: 11,
  },
  text:{
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  listItem: {
    marginBottom: 10,
  },
  subtext: {
    marginTop: 50,
    paddingLeft: 5,
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  footer:{
    marginTop:10,
    paddingLeft: 5,
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    fontStyle: 'normal',
  }
});

export interface DynamicPdfHtml {
  title?: string; // Optional title for the PDF
  listItems: string[]; // Array of list items
  independentContractorText?: string; // Optional text for "Independent Contractor" section
  signatureImg?: string; // Base64 encoded image data for signature
  signatureDate?: string; // Date for the signature section
  footerText?: string; // Optional text for the footer
  logo?: string;
}
type TPdfView = {
  signatureImg:string;
  handleChange?: () => void;
  dynamicHtml:DynamicPdfHtml;
}


const PdfView = ({ signatureImg, handleChange ,dynamicHtml }: TPdfView) => {
 
  useEffect(() => {
    if (handleChange) {
      handleChange()
    }
  }, [signatureImg,handleChange])
  
  return (
   
<Document>
    <Page style={styles.body} wrap size={'A3'}>
    {dynamicHtml.logo && (
         <Image
         style={styles.image}
         src={dynamicHtml.logo}
       />
      )}
      {dynamicHtml.title && <Text>{dynamicHtml.title}</Text>}

      <View style={styles.list}>
        {dynamicHtml.listItems.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text orphans={100}>
              <Text orphans={1000} style={styles.list}>{index + 1}. </Text>
              <Text orphans={100} style={styles.text}>{item}</Text>
            </Text>
          </View>
        ))}
      </View>

      <Text orphans={100} style={styles.subtext}>
        {dynamicHtml.independentContractorText || 'Independent Contractor'}
      </Text>

      <Text orphans={100} style={styles.footer}>
        {dynamicHtml.footerText || 'By:'}
      </Text>

      {signatureImg && (
        <Image style={styles.signature} src={signatureImg} />
      )}

      <Text orphans={100} style={styles.footer}>
        Date: {dynamicHtml.signatureDate || '---'}
      </Text>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
  )
};


export { PdfView };
