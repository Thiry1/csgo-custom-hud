import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
import * as observed from "./observed/observed";
export interface State {
    gsiState: gsi.GsiState,
    observed: observed.ObservedState,
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
    observed: observed.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        fork(observed.rootSaga),
    ]);
}
