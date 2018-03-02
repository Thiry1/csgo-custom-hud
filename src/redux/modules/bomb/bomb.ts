import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export const SET_BOMB = "hud/SET_BOMB";
export const setBomb = createAction<BombState>(SET_BOMB);

export interface BombState {
    isPlanted: boolean;
    isExploded: boolean;
    isDefused: boolean;
}
const initialState: BombState = {
    isPlanted: false,
    isExploded: false,
    isDefused: false,
};

export const reducer = handleActions<BombState, any>({
    [SET_BOMB]: (state, action: Action<BombState>) => action.payload,
}, initialState);

export function* runSetBombState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.round) {
        yield put(setBomb(initialState));
    } console.log({
        isPlanted: gsiResponse.round.bomb === GameStateIntegration.BombState.planted,
        isExploded: gsiResponse.round.bomb === GameStateIntegration.BombState.exploded,
        isDefused: gsiResponse.round.bomb === GameStateIntegration.BombState.defused,
    });
    yield put(setBomb({
        isPlanted: gsiResponse.round.bomb === GameStateIntegration.BombState.planted,
        isExploded: gsiResponse.round.bomb === GameStateIntegration.BombState.exploded,
        isDefused: gsiResponse.round.bomb === GameStateIntegration.BombState.defused,
    }));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetBombState),
    ]);
}
