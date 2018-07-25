import { Action, handleActions } from "redux-actions";
import { SET_GSI_PAYLOAD } from "../actions";
import { GameStateIntegrationPayload } from "../../../dataTypes";

export interface GsiState extends GameStateIntegrationPayload {

}
export const initialState: GsiState = {
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
        name: null,
        steamid: null,
        observer_slot: null,
        team: null,
        activity: null,
        state: {
            health: NaN,
            armor: NaN,
            helmet: null,
            defusekit: null,
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
// TODO: 同じステートなら更新しない. RECEIVE_GSI_PAYLOAD -> SET_GSI_PAYLOAD のフローにする.
export const reducer = handleActions<GsiState, any>({
    [SET_GSI_PAYLOAD]: (state, action: Action<GameStateIntegrationPayload>) => {
        console.log("GSI", action.payload);
        return action.payload;
    },
}, initialState);
