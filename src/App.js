import React from "react";
import { Provider } from "react-redux";
import { store } from "./appRedux/store";
import { AppRouter } from "./routes/routes";
import "./App.scss";
import Loader from "./components/loader";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <Loader />
    </Provider>
  );
};

export default App;
