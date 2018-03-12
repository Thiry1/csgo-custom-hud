import { Action, handleActions } from "redux-actions";
import { INITIALIZE_CLIENT, SET_ROUND_PHASE, SWAP_TEAM_INFO, swapTeamInfo } from "../actions";
import { createAction } from "../../../util/createAction";
import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { team1, team2 } from "../../../config/teamInfo";
import { State } from "../index";
import { GameStateIntegration } from "../../../dataTypes";
import RoundPhase = GameStateIntegration.RoundPhase;
export const SET_TEAM_INFO = "hud/SET_TEAM_INFO";
export const setTeamInfo = createAction<TeamInfoState>(SET_TEAM_INFO);

export interface TeamInfo {
    /**
     * チーム名.
     */
    name: string;
    /**
     * ロゴ.
     */
    logo: string;
}

export interface TeamInfoState {
    t: TeamInfo;
    ct: TeamInfo;
}
const initialState: TeamInfoState = {
    t: {
        name: null,
        logo: null,
    },
    ct: {
        name: null,
        logo: null,
    },
};

export function* runSetTeamInfoState(): SagaIterator {
    yield put(setTeamInfo({
        t: {
            name: team1.name || null,
            logo: team1.logo,
        },
        ct: {
            name: team2.name || null,
            logo: team2.logo,
        },
    }));
}

export function* runSetRoundPhase(): SagaIterator {
    const roundPhase: RoundPhase = yield select((state: State) => state.roundPhase.phase);
    if (roundPhase === RoundPhase.freezetime) {
        const score = yield select((state: State) => state.score.ct + state.score.t);
        if (score === 15) {
            yield put(swapTeamInfo());
        }
    }
}
export function* runSwapTeamInfo(): SagaIterator {
    const teamInfo: TeamInfoState = yield select((state: State) => state.teamInfo);
    yield put(setTeamInfo({
        t: teamInfo.ct,
        ct: teamInfo.t,
    }));
}

export const reducer = handleActions<TeamInfoState, any>({
    [SET_TEAM_INFO]: (state, action: Action<TeamInfoState>) => action.payload,
}, initialState);

export function* rootSaga(): SagaIterator {
    yield all([
        takeLatest(INITIALIZE_CLIENT, runSetTeamInfoState),
        takeLatest(SWAP_TEAM_INFO, runSwapTeamInfo),
        takeEvery(SET_ROUND_PHASE, runSetRoundPhase),
    ]);
}
