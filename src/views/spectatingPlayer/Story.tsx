import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { SpectatingPlayer, SpectatingPlayerProps } from "./SpectatingPlayer";

export const props = (team: GameStateIntegration.Team): SpectatingPlayerProps => ({
    showSpectatingPlayer: true,
    name: "FooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFooFoo",
    activeWeapon: {
        name: "weapon_ak47",
        ammoClip: 29,
        ammoClipMax: 30,
        ammoReserve: 30,
        state: "active",
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
        return <SpectatingPlayer {...props(GameStateIntegration.Team.CT)} />;
    })
    .add("TのSpectatingPlayer情報を表示できる", () => {
        return <SpectatingPlayer {...props(GameStateIntegration.Team.T)} />;
    });
