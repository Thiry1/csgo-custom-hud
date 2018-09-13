import * as React from "react";
import { Player, PlayerProps } from "./Player";
import { storiesOf } from "@storybook/react";
import { number, select, withKnobs } from "@storybook/addon-knobs";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { type } from "os";

export const props = (
    primaryWeapon: string = "weapon_ak47",
    secondaryWeapon: string = "weapon_hkp2000",
    isSpectatingByObserver: boolean = false,
): PlayerProps => {
    const observerSlot = select("observerSlot", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
    const team = select("team", [Team.T, Team.CT], Team.T);
    const health = number("health", 100);
    return {
        name: "Foo",
        money: 16000,
        health,
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
            smokeAmount: 1,
            highExplosiveAmount: 1,
            decoyAmount: 0,
            molotovAmount: 0,
            incGrenadeAmount: 0,
            hasC4: false,
        },
        team,
        // select を経由すると型は number だが実態は string になってしまう
        observerSlot: parseInt(observerSlot as any, 10),
        isSpectatingByObserver,
    };
};

storiesOf("Player", module)
    .addDecorator(withKnobs)
    .add("プレイヤー情報を表示できる", () => {
        return <Player {...props()} />;
    })
    .add("観戦されているプレイヤー情報を表示できる", () => {
        return <Player {...props("weapon_ak47", "weapon_hkp2000", true)} />;
    })
    .add("Player-Revolver", () => {
        return <Player {...props("weapon_m4a1", "weapon_revolver")} />;
    });
