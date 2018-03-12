import { Action, handleActions } from "redux-actions";
import { all, put, select, takeEvery } from "redux-saga/effects";
import { SET_GSI_RESPONSE, SET_PLAYERS, setPlayers } from "../actions";
import { GameStateIntegration, GameStateIntegrationResponse, SteamId } from "../../../dataTypes";
import { SagaIterator } from "redux-saga";
import { State } from "../index";
const humps = require("lodash-humps");

export interface WeaponInfo {
    name: string;
    type: "Knife" | "Rifle" | "SniperRifle" | "Grenade" | "Pistol" | "Shotgun" | "Machine Gun" | "Submachine Gun" | "C4" | string;
    ammoClip: number;
    ammoClipMax: number;
    ammoReserve: number;
    state: string;
}
export interface Weapon {
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
    weapons: Weapon;
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
const findWeapon = (weapons: { [slotId: string]: GameStateIntegration.WeaponInfo }): Weapon => {
    const isPrimary = (weaponType: string): boolean => [
        "Rifle",
        "SniperRifle",
        "Shotgun",
        "Machine Gun",
        "Submachine Gun",
    ].indexOf(weaponType) !== -1;
    const isSecondary = (weaponType: string): boolean => weaponType === "Pistol";
    const isGrenade = (weaponType: string): boolean => weaponType === "Grenade";
    const isC4 = (weaponType: string): boolean => weaponType === "C4";
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
    for (let slot of Object.keys(weapons)) {
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
            name: player.name,
            matchStats: player.match_stats,
            weapons: findWeapon(player.weapons),
            state: humps(player.state),
            team: player.team,
        });
    }
    yield put(setPlayers(players));
}

export function* rootSaga(): SagaIterator {
    yield all([
        takeEvery(SET_GSI_RESPONSE, runSetPlayersState),
    ]);
}
