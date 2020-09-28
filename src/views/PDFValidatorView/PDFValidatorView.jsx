import React, { useState, useEffect, useContext } from 'react';

import { ContextAppSession } from '../../ContextAppSession';
import { ContextPDFValidatorProvider, ContextPDFValidator } from './ContextPDFValidator';

import PDFViewer from '../../components/MainEditor/PDFViewer/PDFViewer';
import DocumentRegister from '../../components/MainEditor/DocumentRegister/DocumentRegister';
import MetadataValidator from '../../components/MainEditor/MetadataValidator/MetadataValidator';

import './styles_PDFValidatorView.css';

const PDFValidatorViewWhitContext = () => {
  return (
    <ContextPDFValidatorProvider>
      <PDFValidatorView></PDFValidatorView>
    </ContextPDFValidatorProvider>
  )
}


function PDFValidatorView() {
  const { setActualDocumentID } = useContext(ContextPDFValidator);

  const { assignedDocuments, token } = useContext(ContextAppSession);

  useEffect(() => {
    /*  console.log(ContextPDFValidator); */
    /*  console.log(assignedDocuments); */
    if (assignedDocuments.length > 0) {

      setActualDocumentID(assignedDocuments[0]);

    }
  }, [assignedDocuments]);

  return (
    <div className="main-editor">
      <PDFViewer positionCss={"pdf-viewer"} />
      <DocumentRegister positionCss={"document-register"} />
      <MetadataValidator positionCss={"metadata-validator"} />
    </div>
  );
}

export default PDFValidatorViewWhitContext;
