import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export const SET_CURRENT_ROUND = "hud/SET_CURRENT_ROUND";
export const setCurrentRound = createAction<CurrentRoundState>(SET_CURRENT_ROUND);

export interface CurrentRoundState {
    phase: GameStateIntegration.RoundPhase;
}
const initialState: CurrentRoundState = {
    phase: null,
};

export const reducer = handleActions<CurrentRoundState, any>({
    [SET_CURRENT_ROUND]: (state, action: Action<CurrentRoundState>) => action.payload,
}, initialState);

export function* runSetCurrentRoundState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.round || !gsiResponse.round.phase) {
        return;
    }
    yield put(setCurrentRound({
        phase: gsiResponse.round.phase,
    }));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetCurrentRoundState),
    ]);
}
