import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import { TeamStats, TeamStatsProps } from "./TeamStats";
import { props as createTeamMoneyProps } from "../teamMoney/Story";
const playerProps = (team: GameStateIntegration.Team) => ({
    name: "Foo",
    money: 16000,
    health: 100,
    armor: 100,
    hasHelmet: true,
    hasDefuseKit: team === GameStateIntegration.Team.CT,
    showKda: true,
    kda: {
        ...kdaProps,
        team,
    },
    roundKillCount: 1,
    roundKillByHeadShotCount: 0,
    weapon: {
        activeWeapon: "weapon_ak47",
        primary: "weapon_ak47",
        secondary: "weapon_hkp2000",
        flashBangAmount: 0,
        smokeAmount: 0,
        highExplosiveAmount: 1,
        decoyAmount: 1,
        molotovAmount: 1,
        incGrenadeAmount: 1,
        hasC4: team === GameStateIntegration.Team.T,
    },
    team,
});
export const props = (team: GameStateIntegration.Team): TeamStatsProps => ({
    players: [
        playerProps(team),
        playerProps(team),
        playerProps(team),
        playerProps(team),
        playerProps(team),
    ],
    team,
    teamMoney: createTeamMoneyProps(team),
});

storiesOf("TeamStats", module)
    .add("CTのチーム毎のプレイヤー情報を表示できる", () => {
        return <TeamStats {...props(GameStateIntegration.Team.CT)} />;
    })
    .add("Tのチーム毎のプレイヤー情報を表示できる", () => {
        return <TeamStats {...props(GameStateIntegration.Team.T)} />;
    });
