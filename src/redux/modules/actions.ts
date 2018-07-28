import { createAction } from "../../util/createAction";
import { GameStateIntegrationPayload } from "../../dataTypes";
import { Player } from "./players/players";
import { RoundPhaseState } from "./roundPhase/roundPhase";

export const INITIALIZE_CLIENT = "hud/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);

export const SET_GSI_PAYLOAD = "hud/SET_GSI_PAYLOAD";
export const setGsiPayload = createAction<GameStateIntegrationPayload>(SET_GSI_PAYLOAD);

export const SET_PLAYERS = "hud/SET_PLAYERS";
export const setPlayers = createAction<Player[]>(SET_PLAYERS);

export const SET_ROUND_PHASE = "hud/SET_ROUND_PHASE";
export const setRoundPhase = createAction<RoundPhaseState>(SET_ROUND_PHASE);

export const SWAP_TEAM_INFO = "hud/SWAP_TEAM_INFO";
export const swapTeamInfo = createAction<void>(SWAP_TEAM_INFO);

export const SET_HUD_VISIBILITY = "hud/SET_HUD_VISIBILITY";
export const setHudVisibility = createAction<boolean>(SET_HUD_VISIBILITY);

export const TOGGLE_HUD = "hud/TOGGLE_HUD";
export const toggleHud = createAction<void>(TOGGLE_HUD);
