import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export const SET_ROUND_PHASE = "hud/SET_ROUND_PHASE";
export const setRoundPhase = createAction<RoundPhaseState>(SET_ROUND_PHASE);

export interface RoundPhaseState {
    phase: GameStateIntegration.RoundPhase;
}
const initialState: RoundPhaseState = {
    phase: null,
};

export const reducer = handleActions<RoundPhaseState, any>({
    [SET_ROUND_PHASE]: (state, action: Action<RoundPhaseState>) => action.payload,
}, initialState);

export function* runSetRoundPhaseState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.round || !gsiResponse.round.phase) {
        return;
    }
    yield put(setRoundPhase({
        phase: gsiResponse.round.phase,
    }));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetRoundPhaseState),
    ]);
}
