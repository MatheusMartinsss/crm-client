import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/routers/App';
import UseAuthProvider from './domain/context/useAuth';
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseAuthProvider>
      <SnackbarProvider maxSnack={2} autoHideDuration={5000}>
        <App />
      </SnackbarProvider>
    </UseAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

