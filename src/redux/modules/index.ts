import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
import * as observed from "./observed/observed";
import * as players from "./players/players";
export interface State {
    gsi: gsi.GsiState;
    observed: observed.ObservedState;
    players: players.PlayersState;
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
    observed: observed.reducer,
    players: players.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        fork(observed.rootSaga),
        fork(players.rootSaga),
    ]);
}
