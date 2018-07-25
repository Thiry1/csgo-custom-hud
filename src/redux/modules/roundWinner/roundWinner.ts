import { Action, handleActions } from "redux-actions";
import { SET_GSI_PAYLOAD } from "../actions";
import { GameStateIntegration, GameStateIntegrationPayload } from "../../../dataTypes";
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
    const gsiPayload: GameStateIntegrationPayload = yield select((state: State) => state.gsi);
    if (!gsiPayload) {
        return;
    }
    if (!gsiPayload.round) {
        return yield put(setRoundWinner(initialState));
    }
    const previousPhase = yield select((state: State) => state.roundWinner.phase);
    if (previousPhase === gsiPayload.round.phase) {
        return;
    }
    if (gsiPayload.round.phase === RoundPhase.over) {
        const teamInfo: TeamInfoState = yield select((state: State) => state.teamInfo);
        const teamName = (() => {
            switch (gsiPayload.round.win_team) {
                case Team.CT:
                    return teamInfo.ct.name || "COUNTER TERRORIST";
                case Team.T:
                    return teamInfo.t.name || "TERRORIST";
            }
        })();
        yield put(setRoundWinner({
            team: gsiPayload.round.win_team,
            teamName,
            phase: gsiPayload.round.phase,
        }));
    } else {
        yield put(setRoundWinner({
            team: null,
            teamName: null,
            phase: gsiPayload.round.phase,
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_PAYLOAD, runSetRoundWinnerState),
    ]);
}
