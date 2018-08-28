import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { SpectatingPlayer, SpectatingPlayerProps } from "./SpectatingPlayer";

export const props = (team: GameStateIntegration.Team, hasPlayerImage: boolean, inline: boolean = true): SpectatingPlayerProps => ({
    showSpectatingPlayer: true,
    name: "FooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFoo",
    twitterId: "@thiry_sk",
    image: hasPlayerImage ? "shroud.jpg" : null,
    imageInline: inline,
    activeWeapon: {
        name: "weapon_ak47",
        ammoClip: 29,
        ammoClipMax: 30,
        ammoReserve: 30,
        state: "active",
        type: "Rifle",
    },
    flashBangAmount: 1,
    smokeAmount: 1,
    highExplosiveAmount: 1,
    molotovAmount: 1,
    incGrenadeAmount: 1,
    decoyAmount: 1,
    health: 70,
    armor: 100,
    hasHelmet: true,
    kill: 11,
    death: 10,
    assist: 19,
    team,
});

storiesOf("SpectatingPlayer", module)
    .add("CTのSpectatingPlayer情報を表示できる", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.CT, true)} />;
    })
    .add("TのSpectatingPlayer情報を表示できる", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.T, true)} />;
    })
    .add("プレイヤー画像なしのCTのSpectatingPlayer情報を表示できる", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.CT, false)} />;
    })
    .add("プレイヤー画像なしのTのSpectatingPlayer情報を表示できる", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.T, false)} />;
    })
    .add("Player images can be displayed on top", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.T, true, false)} />;
    });
