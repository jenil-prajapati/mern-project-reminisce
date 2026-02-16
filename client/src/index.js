import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '1068828025308-21ek0pn56usdqntuqav41cund24m5g9g.apps.googleusercontent.com'}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </GoogleOAuthProvider>
    </Provider>,
    document.getElementById('root')
);
