import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WinnerTeamAnnounce, WinnerTeamAnnounceProps } from "./WinnerTeamAnnounce";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { select, withKnobs } from "@storybook/addon-knobs";
import { SlotSide } from "../../util/slotSideResolver";

export const props = (team: Team): WinnerTeamAnnounceProps => {
    const slotSide = select<SlotSide>("slotSide", [SlotSide.Left, SlotSide.Right], SlotSide.Left);
    return {
        teamName: "foofoofoofoofoofoofoofoofoofoofoofoofoo",
        team,
        slotSide,
    };
};

storiesOf("WinnerTeamAnnounce", module)
    .addDecorator(withKnobs)
    .add("Tが勝利チームの場合の情報を表示できる", () => {
        return (
            <WinnerTeamAnnounce {...props(Team.T)} />
        );
    })
    .add("CTが勝利チームの場合の情報を表示できる", () => {
        return (
            <WinnerTeamAnnounce {...props(Team.CT)} />
        );
    });
