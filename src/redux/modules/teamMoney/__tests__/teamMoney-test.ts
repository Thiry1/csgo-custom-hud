import { getPlayers, getRoundPhase, runSetTeamMoneyState, setTeamMoney } from "../teamMoney";
import { GameStateIntegration } from "../../../../dataTypes";
import { expectSaga } from "redux-saga-test-plan";
import { select } from "../../../../../node_modules/redux-saga/effects";
import { Player } from "../../players/players";
import * as _ from "lodash";

const createFakePlayer = (team: GameStateIntegration.Team): Player => ({
    name: "name",
    steamId: "steamId",
    matchStats: {
        kills: 0,
        assists: 0,
        deaths: 0,
        mvps: 0,
        score: 0,
    },
    team,
    state: {
        health: 0,
        armor: 0,
        helmet: false,
        flashed: 0,
        burning: 0,
        money: 1,
        roundKills: 0,
        roundKillHs: 0,
        equipValue: 1,
        defusekit: null,
    },
    weapons: {
        activeWeapon: null,
        primary: null,
        secondary: null,
        highExplosiveAmount: 0,
        flashBangAmount: 0,
        smokeAmount: 0,
        molotovAmount: 0,
        incGrenadeAmount: 0,
        decoyAmount: 0,
        hasC4: false,
    },
    observerSlot: 0,
});

describe("teamMoney", () => {
    it("When roundPhase is freezetime && hudSettings.showTeamMoney === true, state is update to expected value", async () => {
        const fakePlayers: Player[] = [
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.CT)),
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.T)),
        ];
        await expectSaga(runSetTeamMoneyState, true)
            .provide([
                [select(getPlayers), fakePlayers],
                [select(getRoundPhase), GameStateIntegration.CurrentPhase.freezetime],
            ])
            .put(setTeamMoney({
                ct: {
                    totalEquipmentValue: 5,
                    totalTeamMoney: 5,
                    showTeamMoney: true,
                },
                t: {
                    totalEquipmentValue: 5,
                    totalTeamMoney: 5,
                    showTeamMoney: true,
                },
            }))
            .run();
    });
    it("When roundPhase is freezetime && hudSettings.showTeamMoney === false, state is update to expected value", async () => {
        const fakePlayers: Player[] = [
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.CT)),
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.T)),
        ];
        await expectSaga(runSetTeamMoneyState, false)
            .provide([
                [select(getPlayers), fakePlayers],
                [select(getRoundPhase), GameStateIntegration.CurrentPhase.freezetime],
            ])
            .put(setTeamMoney({
                ct: {
                    totalEquipmentValue: 5,
                    totalTeamMoney: 5,
                    showTeamMoney: false,
                },
                t: {
                    totalEquipmentValue: 5,
                    totalTeamMoney: 5,
                    showTeamMoney: false,
                },
            }))
            .run();
    });
    it("When roundPhase is NOT freezetime, state is update to expected value", async () => {
        const fakePlayers: Player[] = [
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.CT)),
            ..._.fill(Array(5), createFakePlayer(GameStateIntegration.Team.T)),
        ];
        for (const phase of [
            GameStateIntegration.CurrentPhase.bomb,
            GameStateIntegration.CurrentPhase.defuse,
            GameStateIntegration.CurrentPhase.live,
            GameStateIntegration.CurrentPhase.over,
        ]) {
            await expectSaga(runSetTeamMoneyState, true)
                .provide([
                    [select(getPlayers), fakePlayers],
                    [select(getRoundPhase), phase],
                ])
                .put(setTeamMoney({
                    ct: {
                        totalEquipmentValue: 5,
                        totalTeamMoney: 5,
                        showTeamMoney: false,
                    },
                    t: {
                        totalEquipmentValue: 5,
                        totalTeamMoney: 5,
                        showTeamMoney: false,
                    },
                }))
                .run();
        }
    });
});
