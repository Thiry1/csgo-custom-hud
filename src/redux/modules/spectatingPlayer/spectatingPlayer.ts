import { Action, handleActions } from "redux-actions";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SET_PLAYERS } from "../actions";
import { GameStateIntegrationResponse } from "../../../dataTypes";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import { Player } from "../players/players";
import { createAction } from "../../../util/createAction";
import { PlayerInfo, playerInfoList } from "../../../config/playerInfo";

export const SET_SPECTATING_PLAYER = "hud/SET_SPECTATING_PLAYER";
export const setSpectatingPlayer = createAction<Player & PlayerInfo>(SET_SPECTATING_PLAYER);

export interface SpectatingPlayerState {
    player: Player & PlayerInfo;
}
const initialState: SpectatingPlayerState = {
    player: {
        name: null,
        steamId: null,
        matchStats: {
            kills: 0,
            assists: 0,
            deaths: 0,
            mvps: 0,
            score: 0,
        },
        team: null,
        state: {
            health: 0,
            armor: 0,
            helmet: false,
            flashed: 0,
            burning: 0,
            money: 0,
            roundKills: 0,
            roundKillHs: 0,
            equipValue: 0,
            defusekit: null,
        },
        weapons: {
            activeWeapon: {
                name: null,
                ammoClip: 0,
                ammoClipMax: 0,
                ammoReserve: 0,
                state: null,
                type: null,
            },
            primary: {
                name: null,
                ammoClip: 0,
                ammoClipMax: 0,
                ammoReserve: 0,
                state: null,
                type: null,
            },
            secondary: {
                name: null,
                ammoClip: 0,
                ammoClipMax: 0,
                ammoReserve: 0,
                state: null,
                type: null,
            },
            highExplosiveAmount: 0,
            flashBangAmount: 0,
            smokeAmount: 0,
            molotovAmount: 0,
            incGrenadeAmount: 0,
            decoyAmount: 0,
            hasC4: false,
        },
        twitterId: null,
        image: null,
        imageInline: null,
    },
};

export const reducer = handleActions<SpectatingPlayerState, any>({
    [SET_SPECTATING_PLAYER]: (state, action: Action<Player & PlayerInfo>) => ({
        player: action.payload,
    }),
}, initialState);

export function* runSetSpectatingPlayersState() {
    const gsiResponse: GameStateIntegrationResponse = yield select((state: State) => state.gsi);
    const players: Player[] = yield select((state: State) => state.players.players);
    if (!players) {
        return;
    }
    if (!gsiResponse.player || !gsiResponse.player.steamid) {
        return;
    }
    const spectatingPlayer = players.filter(player => player.steamId === gsiResponse.player.steamid);
    if (!spectatingPlayer || spectatingPlayer.length === 0) {
        return yield put(setSpectatingPlayer(initialState.player));
    }

    const playerInfo: PlayerInfo = playerInfoList[spectatingPlayer[0].steamId] || {};

    yield put(setSpectatingPlayer({
        ...spectatingPlayer[0],
        ...playerInfo,
    }));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_PLAYERS, runSetSpectatingPlayersState),
    ]);
}
