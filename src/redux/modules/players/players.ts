import { Action, handleActions } from "redux-actions";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse, SteamId } from "../../../dataTypes";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import { createAction } from "../../../util/createAction";
const humps = require("lodash-humps");
export const SET_PLAYERS = "hud/SET_PLAYERS";
export const setPlayers = createAction<Player[]>(SET_PLAYERS);

export interface Player {
    steamId: SteamId;
    matchStats: GameStateIntegration.PlayerMatchStats;
    weapons: {
        [slotId: string]: {
            name: string;
            ammoClip: number;
            ammoClipMax: number;
            ammoReserve: number;
            state: string;
        };
    };
}

export interface PlayersState {
    players: Player[];
}
const initialState: PlayersState = {
    players: [],
};

export const reducer = handleActions<PlayersState, any>({
    [SET_PLAYERS]: (state, action: Action<Player[]>) => ({
        players: action.payload,
    }),
}, initialState);

export function* runSetPlayersState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    if (!gsiResponse) {
        return;
    }
    if (!gsiResponse.allplayers) {
        return;
    }
    const players: Player[] = [];
    for (let steamId of Object.keys(gsiResponse.allplayers)) {
        const player = gsiResponse.allplayers[steamId];
        players.push({
            steamId,
            matchStats: player.match_stats,
            weapons: humps(player.weapons),
        });
    }
    yield put(setPlayers(players));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetPlayersState),
    ]);
}
