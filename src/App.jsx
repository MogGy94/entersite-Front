import React, { useContext, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { ContextAppSession } from './ContextAppSession';
import { requestAsignDocuments } from './services/MainEditorServices';

import PDFValidatorView from './views/PDFValidatorView/PDFValidatorView';
import './App.css'

const brandTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0099CC',
    },
    secondary: {
      main: '#bf3e30',
    },
  },
});

function App() {
  const contextAppSession = useContext(ContextAppSession);

  useEffect(() => {
    /* console.log(contextAppSession); */
    /*  requestAsignDocuments */
  }, []);

  return (
    <div className="App">
      <MuiThemeProvider theme={brandTheme}>
        <PDFValidatorView />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
