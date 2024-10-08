import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "modern-normalize";
import "./utils/i18n.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { HelmetProvider } from "react-helmet-async";
import { ModalProvider } from "./context/ModalContext.jsx";
import TourProviderWrapper from './components/Reactour/reactourConfig.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <ModalProvider>
            <TourProviderWrapper>
                <App />
              </TourProviderWrapper>
            </ModalProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
