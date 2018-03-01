import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
export interface State {
    gsiState: gsi.GsiState,
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        // fork(gsi.rootSaga),
    ]);
}
