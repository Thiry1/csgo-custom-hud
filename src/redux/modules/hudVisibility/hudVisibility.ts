import { Action, handleActions } from "redux-actions";
import { SET_HUD_VISIBILITY, setHudVisibility, TOGGLE_HUD } from "../actions";
import { SagaIterator } from "redux-saga";
import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { State } from "../index";

export interface HudVisibilityState {
    visible: boolean;
}

const initialState: HudVisibilityState = {
    visible: true,
};

export function* runToggleHud(): SagaIterator {
    const currentVisibility = yield select((state: State) => state.hudVisibility.visible);
    yield put(setHudVisibility(!currentVisibility));
}

export const reducer = handleActions<HudVisibilityState, any>({
    [SET_HUD_VISIBILITY]: (state, action: Action<boolean>) => ({
        visible: action.payload,
    }),
}, initialState);

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(TOGGLE_HUD, runToggleHud),
    ]);
}
