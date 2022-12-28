import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './store/store';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "./theme/theme";
import "@fontsource/ibm-plex-sans"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </Provider>
);
