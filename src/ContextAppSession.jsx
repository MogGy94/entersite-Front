import React, { useState, createContext, useEffect } from "react";
import { requestAsignDocuments } from './services/MainEditorServices';

const ContextAppSession = createContext(); // el q se exporta 


const ContextAppSessionProvider = ({ children }) => {
    const [isAuthenticate, setIsAuthenticate] = useState();
    const [userid, setUserid] = useState(2);
    const [token, setToken] = useState(12345);
    const [assignedDocuments, setAssignedDocuments] = useState([]);



    useEffect(() => {
        const config = {
            userid,
            token
        }
        /* console.log(contextAppSession); */
        requestAsignDocuments(config).then(response => {
            const { asignados } = response;

            const asignadosMasQuemados = [...asignados,
                44112233,
                66334455];
            /* console.log(response); */
            setAssignedDocuments(asignadosMasQuemados);
        });
    }, []);

    return (
        <ContextAppSession.Provider
            value={
                {
                    //Variables
                    isAuthenticate,
                    userid,
                    token,
                    assignedDocuments,

                    //Mutators
                    setIsAuthenticate,
                    setUserid,
                    setToken,
                    setAssignedDocuments,
                }
            }
        >
            {children}
        </ContextAppSession.Provider>
    )
}

export { ContextAppSessionProvider, ContextAppSession }; 