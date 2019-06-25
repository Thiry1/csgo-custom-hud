import { Action, handleActions } from "redux-actions";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SET_GSI_PAYLOAD, SET_PLAYERS, setPlayers } from "../actions";
import { GameStateIntegration, GameStateIntegrationPayload, SteamId } from "../../../dataTypes";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
import { playerInfoList } from "../../../config/playerInfo";
import WeaponType = GameStateIntegration.WeaponType;

const humps = require("lodash-humps");

export interface WeaponInfo {
    name: string;
    type: WeaponType;
    ammoClip: number;
    ammoClipMax: number;
    ammoReserve: number;
    state: string;
}
export interface Weapons {
    activeWeapon: WeaponInfo | null;
    primary: WeaponInfo | null;
    secondary: WeaponInfo | null;
    highExplosiveAmount: number;
    flashBangAmount: number;
    smokeAmount: number;
    molotovAmount: number;
    incGrenadeAmount: number;
    decoyAmount: number;
    hasC4: boolean;
}
export interface Player {
    name: string;
    steamId: SteamId;
    matchStats: GameStateIntegration.PlayerMatchStats;
    team: GameStateIntegration.Team;
    state: {
        health: number;
        armor: number;
        helmet: boolean;
        flashed: number;
        burning: number;
        money: number;
        roundKills: number;
        roundKillHs: number;
        equipValue: number;
        defusekit: boolean | null;
    };
    weapons: Weapons;
    observerSlot: number;
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

export const isPrimary = (weaponType: WeaponType): boolean => [
    WeaponType.Rifle,
    WeaponType.SniperRifle,
    WeaponType.Shotgun,
    WeaponType.MachineGun,
    WeaponType.SubmachineGun,
].indexOf(weaponType) !== -1;
const isSecondary = (weaponType: string): boolean => weaponType === "Pistol";
const isGrenade = (weaponType: string): boolean => weaponType === "Grenade";
const isC4 = (weaponType: string): boolean => weaponType === "C4";

export const parseWeapons = (weapons: { [slotId: string]: GameStateIntegration.WeaponInfo }): Weapons => {
    let activeWeapon: WeaponInfo = {
        name: null,
        ammoClip: 0,
        ammoClipMax: 0,
        ammoReserve: 0,
        state: null,
        type: null,
    };
    let primary: WeaponInfo = {
        name: null,
        ammoClip: 0,
        ammoClipMax: 0,
        ammoReserve: 0,
        state: null,
        type: null,
    };
    let secondary: WeaponInfo = {
        name: null,
        ammoClip: 0,
        ammoClipMax: 0,
        ammoReserve: 0,
        state: null,
        type: null,
    };
    let highExplosiveAmount = 0;
    let flashBangAmount = 0;
    let smokeAmount = 0;
    let molotovAmount = 0;
    let incGrenadeAmount = 0;
    let decoyAmount = 0;
    let hasC4 = false;
    for (const slot of Object.keys(weapons)) {
        const weapon = weapons[slot];
        if (weapon.state === "active") {
            activeWeapon = humps(weapon);
        }

        if (isPrimary(weapon.type)) {
            primary = humps(weapon);
        } else if (isSecondary(weapon.type)) {
            secondary = humps(weapon);
        } else if (isGrenade(weapon.type)) {
            if (weapon.name === "weapon_hegrenade") {
                highExplosiveAmount = weapon.ammo_reserve;
            } else if (weapon.name === "weapon_molotov") {
                molotovAmount = weapon.ammo_reserve;
            } else if (weapon.name === "weapon_flashbang") {
                flashBangAmount = weapon.ammo_reserve;
            } else if (weapon.name === "weapon_decoy") {
                decoyAmount = weapon.ammo_reserve;
            } else if (weapon.name === "weapon_smokegrenade") {
                smokeAmount = weapon.ammo_reserve;
            } else if (weapon.name === "weapon_incgrenade") {
                incGrenadeAmount = weapon.ammo_reserve;
            }
        } else if (isC4(weapon.type)) {
            hasC4 = true;
        }
    }
    return {
        activeWeapon,
        primary,
        secondary,
        highExplosiveAmount,
        flashBangAmount,
        smokeAmount,
        molotovAmount,
        incGrenadeAmount,
        decoyAmount,
        hasC4,
    };
};

/**
 * Retrieve the playerName for the given player.
 * Will return the fixed configured name in `playerInfo.ts` first, or the
 * name returned from the GSI event.
 */
const findPlayerName = (steamId: string): string => {
    if (steamId in playerInfoList && playerInfoList[steamId].name) {
        return playerInfoList[steamId].name;
    } else {
        return null;
    }
};

export function* runSetPlayersState() {
    const gsiPayload: GameStateIntegrationPayload = yield select((state: State) => state.gsi);
    if (!gsiPayload) {
        return;
    }
    if (!gsiPayload.allplayers) {
        return;
    }
    const players: Player[] = [];
    for (const steamId of Object.keys(gsiPayload.allplayers)) {
        const player = gsiPayload.allplayers[steamId];
        players.push({
            steamId,
            name: findPlayerName(steamId) || player.name,
            matchStats: player.match_stats,
            weapons: parseWeapons(player.weapons),
            state: humps(player.state),
            team: player.team,
            observerSlot: player.observer_slot,
        });
    }
    yield put(setPlayers(players));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_PAYLOAD, runSetPlayersState),
    ]);
}
