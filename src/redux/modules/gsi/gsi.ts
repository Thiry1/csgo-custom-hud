import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { SET_GSI_RESPONSE } from "../actions";
import { GameStateIntegrationResponse } from "../../../dataTypes";

export interface GsiState extends GameStateIntegrationResponse {

}
const initialState: GsiState = {
    provider: {
        name: null,
        appid: null,
        version: null,
        steamid: null,
        timestamp: null,
    },
    map: {
        mode: null,
        name: null,
        phase: null,
        round: NaN,
        team_ct: {
            score: NaN,
            timeouts_remaining: NaN,
            matches_won_this_series: NaN,
        },
        team_t: {
            score: NaN,
            timeouts_remaining: NaN,
            matches_won_this_series: NaN,
        },
        num_matches_to_win_series: NaN,
        current_spectators: NaN,
        souvenirs_total: NaN,
    },
    round: {
        phase: null,
        win_team: null,
        bomb: null,
    },
    player: {
        steamid: null,
        observer_slot: null,
        team: null,
        activity: null,
        state: {
            health: NaN,
            armor: NaN,
            helmet: null,
            flashed: NaN,
            smoked: NaN,
            burning: NaN,
            money: NaN,
            round_kills: NaN,
            round_killhs: NaN,
            equip_value: NaN,
        },
    },
    allplayers: null,
    phase_countdowns: {
        phase: null,
        phase_ends_in: null,
    },
    previously: null,
};
// TODO: 同じステートなら更新しない. RECEIVE_GSI_RESPONSE -> SET_GSI_RESPONSE のフローにする.
export const reducer = handleActions<GsiState, any>({
    [SET_GSI_RESPONSE]: (state, action: Action<GameStateIntegrationResponse>) => {
        console.log("SET GSI");
        return action.payload;
    },
}, initialState);
