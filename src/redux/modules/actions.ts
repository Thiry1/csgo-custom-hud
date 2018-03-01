import { createAction } from "../../util/createAction";
import { GameStateIntegrationResponse } from "../../dataTypes";

export const INITIALIZE_CLIENT = "hud/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);

export const SET_GSI_RESPONSE = "hud/SET_GSI_RESPONSE";
export const setGsiResponse = createAction<GameStateIntegrationResponse>(SET_GSI_RESPONSE);