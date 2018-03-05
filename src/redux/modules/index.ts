import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
import * as observed from "./observed/observed";
import * as players from "./players/players";
import * as roundPhase from "./roundPhase/roundPhase";
import * as bomb from "./bomb/bomb";
import * as teamMoney from "./teamMoney/teamMoney";
import * as spectatingPlayer from "./spectatingPlayer/spectatingPlayer";

export interface State {
    gsi: gsi.GsiState;
    observed: observed.ObservedState;
    players: players.PlayersState;
    roundPhase: roundPhase.RoundPhaseState;
    bomb: bomb.BombState;
    teamMoney: teamMoney.TeamMoneyState;
    spectatingPlayer: spectatingPlayer.SpectatingPlayerState;
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
    observed: observed.reducer,
    players: players.reducer,
    roundPhase: roundPhase.reducer,
    currentRound: roundPhase.reducer,
    bomb: bomb.reducer,
    teamMoney: teamMoney.reducer,
    spectatingPlayer: spectatingPlayer.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        fork(observed.rootSaga),
        fork(players.rootSaga),
        fork(roundPhase.rootSaga),
        fork(bomb.rootSaga),
        fork(teamMoney.rootSaga),
        fork(spectatingPlayer.rootSaga),
    ]);
}
