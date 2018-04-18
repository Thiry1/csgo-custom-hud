import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WinnerTeamAnnounce, WinnerTeamAnnounceProps } from "./WinnerTeamAnnounce";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;

export const props = (team: Team): WinnerTeamAnnounceProps => ({
    teamName: "foofoofoofoofoofoofoofoofoofoofoofoofoo",
    team,
});

storiesOf("WinnerTeamAnnounce", module)
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
