import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { props as kdaProps } from "../kda/Story";
import { GameStateIntegration } from "../../dataTypes";
import { TeamStats, TeamStatsProps } from "./TeamStats";
import { props as createTeamMoneyProps } from "../teamMoney/Story";
import { PlayerProps } from "../player/Player";
import { select, withKnobs } from "@storybook/addon-knobs";
import { SlotSide } from "../../util/slotSideResolver";
const playerProps = (team: GameStateIntegration.Team, observerSlot: number, isSpectatingByObserver: boolean): PlayerProps => ({
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
    observerSlot,
    isSpectatingByObserver,
});
export const props = (team: GameStateIntegration.Team, initialObserverSlot: number): TeamStatsProps => {
    let slot = initialObserverSlot;
    const slotSide = select<SlotSide>("slotSide", [SlotSide.Left, SlotSide.Right], SlotSide.Left);
    return {
        players: [
            playerProps(team, slot, true),
            playerProps(team, ++slot, false),
            playerProps(team, ++slot, false),
            playerProps(team, ++slot, false),
            playerProps(team, ++slot === 10 ? 0 : slot, false),
        ],
        team,
        teamMoney: createTeamMoneyProps(team, true),
        slotSide,
    };
};

storiesOf("TeamStats", module)
    .addDecorator(withKnobs)
    .add("CTのチーム毎のプレイヤー情報を表示できる", () => {
        return <TeamStats {...props(GameStateIntegration.Team.CT, 1)} />;
    })
    .add("Tのチーム毎のプレイヤー情報を表示できる", () => {
        return <TeamStats {...props(GameStateIntegration.Team.T, 6)} />;
    });
