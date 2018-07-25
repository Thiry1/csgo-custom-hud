import { Action, handleActions } from "redux-actions";
import { SET_GSI_PAYLOAD } from "../actions";
import { GameStateIntegrationPayload } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";

export const SET_SCORE = "hud/SET_SCORE";
export const setScore = createAction<ScoreState>(SET_SCORE);

export interface ScoreState {
    /**
     * Tのラウンド勝利数.
     */
    t: number;
    /**
     * CTのラウンド勝利数.
     */
    ct: number;
}
const initialState: ScoreState = {
    t: NaN,
    ct: NaN,
};

export const reducer = handleActions<ScoreState, any>({
    [SET_SCORE]: (state, action: Action<ScoreState>) => action.payload,
}, initialState);

export function* runSetScoreState() {
    const gsiPayload: GameStateIntegrationPayload = yield select((state: State) => state.gsi);
    if (!gsiPayload) {
        return;
    }
    if (!gsiPayload.map || !gsiPayload.map.team_ct || !gsiPayload.map.team_t) {
        return;
    }
    const scoreOfT = gsiPayload.map.team_t.score;
    const scoreOfCT = gsiPayload.map.team_ct.score;
    yield put(setScore({
        t: scoreOfT || 0,
        ct: scoreOfCT || 0,
    }));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_PAYLOAD, runSetScoreState),
    ]);
}
