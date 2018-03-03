import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "./redux/store";
import { rootSaga } from "./redux/modules";
import { initializeClient, setGsiResponse } from "./redux/modules/actions";
import { Container } from "./container/container";
import { Provider } from "react-redux";
declare const window: any;
const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

window.communication = {
    store,
    setGsiResponse,
};

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        (
            <Provider store={store}>
                <Container />
            </Provider>
        ),
        document.getElementById("app"),
    );
});
