import { createAction } from "../../util/createAction";
import { GameStateIntegrationResponse } from "../../dataTypes";
import { Player } from "./players/players";
import { RoundPhaseState } from "./roundPhase/roundPhase";

export const INITIALIZE_CLIENT = "hud/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);

export const SET_GSI_RESPONSE = "hud/SET_GSI_RESPONSE";
export const setGsiResponse = createAction<GameStateIntegrationResponse>(SET_GSI_RESPONSE);

export const SET_PLAYERS = "hud/SET_PLAYERS";
export const setPlayers = createAction<Player[]>(SET_PLAYERS);

export const SET_ROUND_PHASE = "hud/SET_ROUND_PHASE";
export const setRoundPhase = createAction<RoundPhaseState>(SET_ROUND_PHASE);

export const SWAP_TEAM_INFO = "hud/SWAP_TEAM_INFO";
export const swapTeamInfo = createAction<void>(SWAP_TEAM_INFO);
