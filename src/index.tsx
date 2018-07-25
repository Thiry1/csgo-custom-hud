import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "./redux/store";
import { rootSaga } from "./redux/modules";
import { initializeClient, setGsiPayload } from "./redux/modules/actions";
import { Container } from "./container/container";
import { Provider } from "react-redux";
import { registerShortcut } from "./shortcut/shortcut";
declare const window: any;
const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

registerShortcut(store);

window.communication = {
    store,
    setGsiPayload,
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
