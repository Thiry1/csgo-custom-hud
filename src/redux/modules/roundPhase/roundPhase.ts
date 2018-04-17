import { Action, handleActions } from "redux-actions";
import { INITIALIZE_CLIENT, SET_GSI_RESPONSE, SET_ROUND_PHASE, setRoundPhase } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse } from "../../../dataTypes";
import { all, call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { delay, SagaIterator } from "redux-saga";
import { State } from "../index";

export interface RoundPhaseState {
    phase: GameStateIntegration.CurrentPhase;
    time: number;
    // FIXME: ここにあるのは妥当ではない.
    c4Timer: number;
    shouldCountDownC4Timer: boolean;
}
const initialState: RoundPhaseState = {
    phase: null,
    time: NaN,
    c4Timer: NaN,
    shouldCountDownC4Timer: false,
};

export const reducer = handleActions<RoundPhaseState, any>({
    [SET_ROUND_PHASE]: (state, action: Action<RoundPhaseState>) => action.payload,
}, initialState);

function* runRefreshC4Timer() {
    while (true) {
        yield call(delay, 100);
        const roundPhase: RoundPhaseState = yield select((state: State) => state.roundPhase);
        if (roundPhase.shouldCountDownC4Timer) {
            yield put(setRoundPhase({
                ...roundPhase,
                c4Timer: roundPhase.c4Timer - 0.1,
            }));
        }
    }
}
export function* runSetRoundPhaseState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.phase_countdowns || !gsiResponse.phase_countdowns.phase) {
        return;
    }
    const previousRoundPhase: RoundPhaseState = yield select((state: State) => state.roundPhase);
    const currentTime = Math.round(parseFloat(gsiResponse.phase_countdowns.phase_ends_in));
    const currentPhase = gsiResponse.phase_countdowns.phase;
    if (previousRoundPhase.phase !== gsiResponse.phase_countdowns.phase || previousRoundPhase.time !== currentTime) {
        let c4Timer;
        let shouldCountDownC4Timer = false;
        if (currentPhase === GameStateIntegration.CurrentPhase.bomb) {
            shouldCountDownC4Timer = false;
            c4Timer = currentTime;
        } else if (currentPhase === GameStateIntegration.CurrentPhase.defuse
            && previousRoundPhase.phase === GameStateIntegration.CurrentPhase.bomb) {
            shouldCountDownC4Timer = true;
            c4Timer = previousRoundPhase.time;
        } else if (currentPhase === GameStateIntegration.CurrentPhase.defuse
            && previousRoundPhase.phase === GameStateIntegration.CurrentPhase.defuse) {
            shouldCountDownC4Timer = true;
            c4Timer = previousRoundPhase.c4Timer;
        } else {
            shouldCountDownC4Timer = false;
            c4Timer = NaN;
        }
        yield put(setRoundPhase({
            phase: currentPhase,
            time: currentTime,
            c4Timer,
            shouldCountDownC4Timer,
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetRoundPhaseState),
        takeLatest(INITIALIZE_CLIENT, runRefreshC4Timer),
    ]);
}
