import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
import * as observed from "./observed/observed";
import * as players from "./players/players";
import * as currentRound from "./currentRound/currentRound";
export interface State {
    gsi: gsi.GsiState;
    observed: observed.ObservedState;
    players: players.PlayersState;
    currentRound: currentRound.CurrentRoundState;
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
    observed: observed.reducer,
    players: players.reducer,
    currentRound: currentRound.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        fork(observed.rootSaga),
        fork(players.rootSaga),
        fork(currentRound.rootSaga),
    ]);
}
