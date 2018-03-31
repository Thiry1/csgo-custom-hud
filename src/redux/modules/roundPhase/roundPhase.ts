import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE, SET_ROUND_PHASE, setRoundPhase } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export interface RoundPhaseState {
    phase: GameStateIntegration.CurrentPhase;
    time: number;
}
const initialState: RoundPhaseState = {
    phase: null,
    time: NaN,
};

export const reducer = handleActions<RoundPhaseState, any>({
    [SET_ROUND_PHASE]: (state, action: Action<RoundPhaseState>) => action.payload,
}, initialState);

export function* runSetRoundPhaseState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.phase_countdowns || !gsiResponse.phase_countdowns.phase) {
        return;
    }
    const roundPhase: RoundPhaseState = yield select((state: State) => state.roundPhase);
    const currentTime = Math.round(parseFloat(gsiResponse.phase_countdowns.phase_ends_in));
    if (roundPhase.phase !== gsiResponse.phase_countdowns.phase || roundPhase.time !== currentTime) {
        yield put(setRoundPhase({
            phase: gsiResponse.phase_countdowns.phase,
            time: currentTime,
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetRoundPhaseState),
    ]);
}
