import * as React from "react";
import { Player, PlayerProps } from "./Player";
import { storiesOf, Story } from "@storybook/react";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
const team = Team.T;
export const props = (primaryWeapon: string = "weapon_ak47", secondaryWeapon: string = "weapon_hkp2000"): PlayerProps => ({
    name: "Foo",
    money: 16000,
    health: 100,
    armor: 100,
    hasHelmet: true,
    hasDefuseKit: true,
    showKda: true,
    kda: {
        ...kdaProps,
        team,
    },
    roundKillCount: 1,
    roundKillByHeadShotCount: 0,
    weapon: {
        activeWeapon: primaryWeapon,
        primary: primaryWeapon,
        secondary: secondaryWeapon,
        flashBangAmount: 2,
        smokeAmount: 0,
        highExplosiveAmount: 1,
        decoyAmount: 0,
        molotovAmount: 0,
        incGrenadeAmount: 0,
        hasC4: false,
    },
    team,
});

storiesOf("Player", module)
    .add("プレイヤー情報を表示できる", () => {
        return <Player {...props()} />;
    })
    .add("Player-Revolver", () => {
        return <Player {...props("weapon_m4a1", "weapon_revolver")} />;
    });
