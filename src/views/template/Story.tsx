import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { Template, TemplateProps } from "./Template";
import { props as createPlayerProps } from "../teamStats/Story";
import { props as createTeamMoneyProps } from "../teamMoney/Story";
import { props as createSpectatingPlayerProps } from "../spectatingPlayer/Story";
import { props as topBarProps } from "../topBar/Story";
import { props as createWinnerTeamAnnounceProps } from "../winnerTeamAnnounce/Story";
import CurrentPhase = GameStateIntegration.CurrentPhase;
import { SlotSide } from "../../util/slotSideResolver";
const createProps = (showTeamMoney: boolean): TemplateProps => ({
    visible: true,
    players: [
        ...createPlayerProps(GameStateIntegration.Team.CT, 1).players,
        ...createPlayerProps(GameStateIntegration.Team.T, 6).players,
    ],
    teamMoney: {
        ct: createTeamMoneyProps(GameStateIntegration.Team.CT, showTeamMoney),
        t: createTeamMoneyProps(GameStateIntegration.Team.T, showTeamMoney),
    },
    spectatingPlayer: createSpectatingPlayerProps(GameStateIntegration.Team.CT, true),
    topBar: topBarProps(CurrentPhase.live, 91, 4),
    winnerTeamAnnounce: createWinnerTeamAnnounceProps(GameStateIntegration.Team.CT),
    slotSide: {
        t: SlotSide.Right,
        ct: SlotSide.Left,
    },
});
storiesOf("テンプレート", module)
    .add("テンプレートを表示できる", () => {
        return <Template {...createProps(true)} />;
    })
    .add("チームの所持金を表示しないテンプレートを表示できる", () => {
        return <Template {...createProps(false)} />;
    });
