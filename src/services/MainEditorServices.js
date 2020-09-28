import axios from 'axios';

const ROOT_URL = "http://190.93.151.151:3008"

async function getDocTypes() {
  let docTypes = [];
  try {
    const serviceRes = await axios.get('http://186.30.58.216:3002/objdoc');
   // const serviceRes = await axios.get('http://localhost:3002/objdoc');
    docTypes = serviceRes.data.Tipos;
  } catch (er) {
    console.log(er);
  }
  return docTypes;
}


async function saveDoc(data) {
  let saveResult = {};

  try {
    const serviceRes = await axios.post('http://186.30.58.216:3002/save', data);
    saveResult = serviceRes.data;
  } catch (er) {
    console.log(er);
  }
  return saveResult;
}

const requestAsignDocuments = async (config) =>{
  const {userid , token} = config;
  const endpoint = 'api/asignados'
  try {
    const response = await axios.post(`${ROOT_URL}/${endpoint}`, config);
    const assignDocuments = response.data;
    return assignDocuments;
  } catch (error) {
    console.log(error);
  }
  return {error:0} ; 
}

const requestDocumentAndDocumentMetadata = async (config) =>{
  const {asignado,token} = config; 
  const endpoint = "api/registro";
  try {
    const response = await axios.post(`${ROOT_URL}/${endpoint}`, config);
    const documentAndMetadata = response.data;
    return documentAndMetadata; 
  } catch (error) {
    console.log(error);
  }

  return {error:0} ; 
}


export { 
  getDocTypes, 
  saveDoc ,
  requestAsignDocuments,
  requestDocumentAndDocumentMetadata
};
