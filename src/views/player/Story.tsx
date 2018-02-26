import * as React from "react";
import { Player, PlayerProps } from "./Player";
import { storiesOf, Story } from "@storybook/react";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
const props: PlayerProps = {
    name: "Foo",
    money: 16000,
    health: 100,
    armor: 100,
    hasHelmet: true,
    showKda: true,
    kda: kdaProps,
    roundKillCount: 1,
    weapon: {
        activeWeapon: "weapon_ak47",
        primary: "weapon_ak47",
        secondary: "weapon_p2000",
        flashBangAmount: 1,
        smokeAmount: 1,
        highExplosiveAmount: 1,
        decoyAmount: 0,
        molotovAmount: 1,
    },
    team: Team.T,
};

storiesOf("Player", module)
    .add("プレイヤー情報を表示できる", () => {
        return <Player {...props} />;
    });
