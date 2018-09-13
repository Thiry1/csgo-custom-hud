import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { TeamMoney, TeamMoneyProps } from "./TeamMoney";
import { select, withKnobs } from "@storybook/addon-knobs";
import { SlotSide } from "../../util/slotSideResolver";

export const props = (team: GameStateIntegration.Team, showTeamMoney: boolean): TeamMoneyProps => {
    const slotSide = select<SlotSide>("slotSide", [SlotSide.Left, SlotSide.Right], SlotSide.Left);
    return {
        showTeamMoney,
        totalEquipmentValue: 13000,
        totalTeamMoney: 16000 * 5,
        team,
        slotSide,
    };
};

storiesOf("TeamMoney", module)
    .addDecorator(withKnobs)
    .add("CTのチームマネー情報を表示できる", () => {
        return <TeamMoney {...props(GameStateIntegration.Team.CT, true)} />;
    })
    .add("Tのチームマネー情報を表示できる", () => {
        return <TeamMoney {...props(GameStateIntegration.Team.T, true)} />;
    });
