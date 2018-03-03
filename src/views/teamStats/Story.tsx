import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { TeamStats, TeamStatsProps } from "./TeamStats";
const playerProps = (team: GameStateIntegration.Team) => ({
    name: "Foo",
    money: 16000,
    health: 100,
    armor: 100,
    hasHelmet: true,
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
        flashBangAmount: 2,
        smokeAmount: 1,
        highExplosiveAmount: 1,
        decoyAmount: 0,
        molotovAmount: 1,
        incGrenadeAmount: 1,
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
});

storiesOf("teamStats", module)
    .add("チーム毎のプレイヤー情報を表示できる", () => {
        return <TeamStats {...props(GameStateIntegration.Team.CT)} />;
    });
