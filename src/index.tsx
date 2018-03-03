import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "./redux/store";
import { rootSaga } from "./redux/modules";
import { initializeClient, setGsiResponse } from "./redux/modules/actions";
declare const window: any;

const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

window.store = store;
window.setGsiResponse = setGsiResponse;

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        (
            <div style={{ background: "#f00", with: "500px", height: "300px" }}>test</div>
        ),
        document.getElementById("app"),
    );
});
