import React, { useState, useContext, createContext, useEffect } from "react";

import { requestDocumentAndDocumentMetadata } from '../../services/MainEditorServices';

import { ContextAppSession } from '../../ContextAppSession';

const ContextPDFValidator = createContext(); // el q se exporta 


const ContextPDFValidatorProvider = ({ children }) => {
    const { token } = useContext(ContextAppSession);
    const [actualDocumentID, setActualDocumentID] = useState();
    //ORIGINAL / PROCESADO
    const [actualDocument, setActualDocument] = useState("ORIGINAL");
    const [pdfOriginal, setPdfOriginal] = useState("");
    const [pdfProcesado, setPdfProcesado] = useState("");

    const [actualDocumentRegistro, setActualDocumentRegistro] = useState();
    const [actualDocumentMetadata, setActualDocumentMetadata] = useState();

    function getActualDocument() {
        if (actualDocument === "ORIGINAL") {
            return pdfOriginal
        } else if (actualDocument === "PROCESADO") {
            return pdfProcesado
        }
        return "INVALID"
    }

    useEffect(() => {
        if (actualDocumentID) {
            const config = {
                asignado: actualDocumentID,
                token
            }
            requestDocumentAndDocumentMetadata(config).then(result => {
                const { pdf_procesado, pdf_original, registro, metadata } = result;
                /*   console.log(result); */
                if (Object.keys(result).length > 0) {
                    const PDF_Original = `data:application/pdf;base64,${pdf_original}`
                    const PDF_Procesado = `data:application/pdf;base64,${pdf_procesado}`
                    /*  console.log(PDF); */
                    setPdfOriginal(PDF_Original);
                    setPdfProcesado(PDF_Procesado);
                    /*  setActualDocument(PDF); */
                    setActualDocumentRegistro(registro);
                    setActualDocumentMetadata(metadata);
                }
            })
        }
    }, [actualDocumentID])

    return (
        <ContextPDFValidator.Provider
            value={
                {
                    //Variables
                    actualDocument,
                    pdfOriginal,
                    pdfProcesado,
                    actualDocumentRegistro,
                    actualDocumentMetadata,

                    //Mutators
                    setActualDocumentID,
                    setActualDocument,
                    getActualDocument
                }
            }
        >
            {children}
        </ContextPDFValidator.Provider>
    )
}

export { ContextPDFValidatorProvider, ContextPDFValidator }; 