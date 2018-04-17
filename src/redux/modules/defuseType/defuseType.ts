import { Action, handleActions } from "redux-actions";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import { createAction } from "../../../util/createAction";
import CurrentPhase = GameStateIntegration.CurrentPhase;

export const SET_DEFUSE_TYPE = "hud/SET_DEFUSE_TYPE";
export const setDefuseType = createAction<DefuseTypeState>(SET_DEFUSE_TYPE);

export enum DefuseType {
    /**
     * 解除していない.
     */
    None = "None",
    /**
     * 解除キット無しで解除中.
     * @type {string}
     */
    Defuse = "Defuse",
    /**
     * 解除キットを使って解除中.
     * @type {string}
     */
    DefuseWithDefuseKit = "WithDefuseKit",
}
export interface DefuseTypeState {
    defuseType: DefuseType;
    currentPhase: CurrentPhase | null;
}
const initialState: DefuseTypeState = {
    defuseType: DefuseType.None,
    currentPhase: null,
};

export const reducer = handleActions<DefuseTypeState, any>({
    [SET_DEFUSE_TYPE]: (state, action: Action<DefuseTypeState>) => action.payload,
}, initialState);

export function* runSetDefuseWithDefuseKitState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.phase_countdowns || !gsiResponse.phase_countdowns.phase) {
        return;
    }

    const currentPhase = yield select((state: State) => state.defuseType.currentPhase);
    const phase = gsiResponse.phase_countdowns.phase;
    // phase が変わっていない場合は何もしない
    if (currentPhase === phase) {
        return;
    }

    if (phase === CurrentPhase.defuse) {
        const remainingTime = Math.round(parseFloat(gsiResponse.phase_countdowns.phase_ends_in));
        // phase が defuse になった瞬間に解除までの残り時間が5秒以下なら解除キットを持っていると判断する.
        if (remainingTime <= 5) {
            yield put(setDefuseType({
                defuseType: DefuseType.DefuseWithDefuseKit,
                currentPhase: phase,
            }));
        } else {
            yield put(setDefuseType({
                defuseType: DefuseType.Defuse,
                currentPhase: phase,
            }));
        }
    } else {
        yield put(setDefuseType({
            defuseType: DefuseType.None,
            currentPhase: phase,
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetDefuseWithDefuseKitState),
    ]);
}
