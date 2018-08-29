import { Action, handleActions } from "redux-actions";
import { SET_PLAYERS } from "../actions";
import { GameStateIntegration } from "../../../dataTypes";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import { Player } from "../players/players";
import { hudSettings } from "../../../config/hudSettings";
import RoundPhase = GameStateIntegration.RoundPhase;

export const SET_TEAM_MONEY = "hud/SET_TEAM_MONEY";
export const setTeamMoney = createAction<TeamMoneyState>(SET_TEAM_MONEY);

export interface TeamMoneyInfo {
    /**
     * チームマネー情報を表示するか.
     */
    showTeamMoney: boolean;
    /**
     * チームがこのラウンドで購入した装備の合計金額.
     */
    totalEquipmentValue: number;
    /**
     * チームの所持金合計.
     */
    totalTeamMoney: number;
}
export interface TeamMoneyState {
    ct: TeamMoneyInfo;
    t: TeamMoneyInfo;
}
export const initialState: TeamMoneyState = {
    ct: {
        showTeamMoney: false,
        totalEquipmentValue: 0,
        totalTeamMoney: 0,
    },
    t: {
        showTeamMoney: false,
        totalEquipmentValue: 0,
        totalTeamMoney: 0,
    },
};

export const reducer = handleActions<TeamMoneyState, any>({
    [SET_TEAM_MONEY]: (state, action: Action<TeamMoneyState>) => action.payload,
}, initialState);

export const getPlayers = (state: State) => state.players.players;
export const getRoundPhase = (state: State) => state.roundPhase.phase;

export function* runSetTeamMoneyState(showTeamMoney: boolean) {
    const players: Player[] = yield select(getPlayers);
    const roundPhase: RoundPhase = yield select(getRoundPhase);
    if (!players || players.length === 0) {
        yield put(setTeamMoney(initialState));
    } else {
        let ctTotalMoney = 0;
        let ctTotalEquipmentValue = 0;
        let tTotalMoney = 0;
        let tTotalEquipmentValue = 0;
        for (let player of players) {
            if (player.team === GameStateIntegration.Team.CT) {
                ctTotalMoney += player.state.money;
                ctTotalEquipmentValue += player.state.equipValue;
            } else if (player.team === GameStateIntegration.Team.T) {
                tTotalMoney += player.state.money;
                tTotalEquipmentValue += player.state.equipValue;
            }
        }
        yield put(setTeamMoney({
            ct: {
                totalEquipmentValue: ctTotalEquipmentValue,
                totalTeamMoney: ctTotalMoney,
                showTeamMoney: showTeamMoney && roundPhase === GameStateIntegration.RoundPhase.freezetime,
            },
            t: {
                totalEquipmentValue: tTotalEquipmentValue,
                totalTeamMoney: tTotalMoney,
                showTeamMoney: showTeamMoney && roundPhase === GameStateIntegration.RoundPhase.freezetime,
            },
        }));
    }
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_PLAYERS, runSetTeamMoneyState, hudSettings.showTeamMoney),
    ]);
}
