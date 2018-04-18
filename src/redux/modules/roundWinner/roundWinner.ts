import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import Team = GameStateIntegration.Team;
import { createAction } from "../../../util/createAction";
import RoundPhase = GameStateIntegration.RoundPhase;
import { TeamInfoState } from "../teamInfo/teamInfo";

export const SET_ROUND_WINNER = "hud/SET_ROUND_WINNER";
export const setRoundWinner = createAction<RoundWinnerState>(SET_ROUND_WINNER);

export interface RoundWinnerState {
    team: Team | null;
    teamName: string | null;
    phase: RoundPhase;
}
const initialState: RoundWinnerState = {
    team: null,
    teamName: null,
    phase: null,
};

export const reducer = handleActions<RoundWinnerState, any>({
    [SET_ROUND_WINNER]: (state, action: Action<RoundWinnerState>) => action.payload,
}, initialState);

export function* runSetRoundWinnerState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.round) {
        return yield put(setRoundWinner(initialState));
    }
    const previousPhase = yield select((state: State) => state.roundWinner.phase);
    if (previousPhase === gsiResponse.round.phase) {
        return;
    }
    if (gsiResponse.round.phase === RoundPhase.over) {
        const teamInfo: TeamInfoState = yield select((state: State) => state.teamInfo);
        const teamName = (() => {
            switch (gsiResponse.round.win_team) {
                case Team.CT:
                    return teamInfo.ct.name || "COUNTER TERRORIST";
                case Team.T:
                    return teamInfo.t.name || "TERRORIST";
            }
        })();
        yield put(setRoundWinner({
            team: gsiResponse.round.win_team,
            teamName,
            phase: gsiResponse.round.phase,
        }));
    } else {
        yield put(setRoundWinner({
            team: null,
            teamName: null,
            phase: gsiResponse.round.phase,
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetRoundWinnerState),
    ]);
}
