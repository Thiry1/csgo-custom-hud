import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as gsi from "./gsi/gsi";
import * as players from "./players/players";
import * as roundPhase from "./roundPhase/roundPhase";
import * as teamMoney from "./teamMoney/teamMoney";
import * as spectatingPlayer from "./spectatingPlayer/spectatingPlayer";
import * as score from "./score/score";
import * as teamInfo from "./teamInfo/teamInfo";
import * as defuseType from "./defuseType/defuseType";
import * as roundWinner from "./roundWinner/roundWinner";
import * as hudVisibility from "./hudVisibility/hudVisibility";
import * as slotSide from "./slotSide/slotSide";

export interface State {
    gsi: gsi.GsiState;
    players: players.PlayersState;
    roundPhase: roundPhase.RoundPhaseState;
    teamMoney: teamMoney.TeamMoneyState;
    spectatingPlayer: spectatingPlayer.SpectatingPlayerState;
    score: score.ScoreState;
    teamInfo: teamInfo.TeamInfoState;
    defuseType: defuseType.DefuseTypeState;
    roundWinner: roundWinner.RoundWinnerState;
    hudVisibility: hudVisibility.HudVisibilityState;
    slotSide: slotSide.SlotSideState;
}

export const reducer = combineReducers({
    gsi: gsi.reducer,
    players: players.reducer,
    roundPhase: roundPhase.reducer,
    currentRound: roundPhase.reducer,
    teamMoney: teamMoney.reducer,
    spectatingPlayer: spectatingPlayer.reducer,
    score: score.reducer,
    teamInfo: teamInfo.reducer,
    defuseType: defuseType.reducer,
    roundWinner: roundWinner.reducer,
    hudVisibility: hudVisibility.reducer,
    slotSide: slotSide.reducer,
});

export function* rootSaga(): SagaIterator {
    yield all([
        fork(players.rootSaga),
        fork(roundPhase.rootSaga),
        fork(teamMoney.rootSaga),
        fork(spectatingPlayer.rootSaga),
        fork(score.rootSaga),
        fork(teamInfo.rootSaga),
        fork(defuseType.rootSaga),
        fork(roundWinner.rootSaga),
        fork(hudVisibility.rootSaga),
        fork(slotSide.rootSaga),
    ]);
}
