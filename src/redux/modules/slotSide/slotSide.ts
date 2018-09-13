import { SagaIterator } from "redux-saga";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { State } from "../index";
import { Player } from "../players/players";
import { SET_PLAYERS } from "../actions";
import { SlotSide, SlotSideResolver } from "../../../util/slotSideResolver";
import { createAction } from "../../../util/createAction";
import { GameStateIntegration } from "../../../dataTypes";
import { Action, handleActions } from "redux-actions";

export const SET_SLOT_SIDE = "hud/SET_SLOT_SIDE";
export const setSlotSide = createAction<SlotSideState>(SET_SLOT_SIDE);

export interface SlotSideState {
    ct: SlotSide;
    t: SlotSide;
}

const initialState: SlotSideState = {
    ct: SlotSide.Left,
    t: SlotSide.Right,
};

const getReverseSlotSide = (slotSide: SlotSide) => slotSide === SlotSide.Right ? SlotSide.Left : SlotSide.Right;

export function* runSetSlotSide() {
    const players: Player[] = yield select((state: State) => state.players.players);
    if (players.length === 0) {
        return;
    }
    const slotSide = SlotSideResolver.resolve(players[0].observerSlot);
    const slotSideState: SlotSideState = players[0].team === GameStateIntegration.Team.CT
        ? { ct: slotSide, t: getReverseSlotSide(slotSide) }
        : { ct: getReverseSlotSide(slotSide), t: slotSide };
    const currentSlotSideState: SlotSideState = yield select((state: State) => state.slotSide);
    if (currentSlotSideState !== slotSideState) {
        yield put(setSlotSide(slotSideState));
    }
}

export const reducer = handleActions<SlotSideState, any>({
    [SET_SLOT_SIDE]: (state, action: Action<SlotSideState>) => action.payload,
}, initialState);

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_PLAYERS, runSetSlotSide),
    ]);
}
