import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegrationResponse, SteamId } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export const SET_OBSERVED = "hud/SET_OBSERVED";
export const setObserved = createAction<string | null>(SET_OBSERVED);

export interface ObservedState {
    /**
     * 観戦中のプレイヤーのSteamID.
     */
    steamId: SteamId | null;
}
const initialState: ObservedState = {
    steamId: null,
};

export const reducer = handleActions<ObservedState, any>({
    [SET_OBSERVED]: (state, action: Action<string | null>) => ({
        steamId: action.payload,
    }),
}, initialState);

export function* runSetObservedState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    // データが信用出来ないので過剰にガードを掛けていく
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.player) {
        return;
    }
    yield put(setObserved(gsiResponse.player.steamid));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetObservedState),
    ]);
}
