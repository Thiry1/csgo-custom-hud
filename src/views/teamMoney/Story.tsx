import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { TeamMoney, TeamMoneyProps } from "./TeamMoney";
export const props = (team: GameStateIntegration.Team, showTeamMoney: boolean): TeamMoneyProps => ({
    showTeamMoney,
    totalEquipmentValue: 13000,
    totalTeamMoney: 16000 * 5,
    team,
});

storiesOf("TeamMoney", module)
    .add("CTのチームマネー情報を表示できる", () => {
        return <TeamMoney {...props(GameStateIntegration.Team.CT, true)} />;
    })
    .add("Tのチームマネー情報を表示できる", () => {
        return <TeamMoney {...props(GameStateIntegration.Team.T, true)} />;
    });
