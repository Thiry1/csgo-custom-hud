import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { TopBar, TopBarProps } from "./TopBar";
import { props as roundTimerProps } from "../timer/Story";
import { props as roundCounterProps } from "../roundCounter/Story";
import { GameStateIntegration } from "../../dataTypes";
import CurrentPhase = GameStateIntegration.CurrentPhase;
export const props = (currentPhase: CurrentPhase = CurrentPhase.live): TopBarProps => ({
    teamInfo: {
        ct: {
            score: 15,
            name: "COUNTER TERRORISTaaaaaaaaaaaaaaaaa",
            logo: "magixgod.png",
        },
        t: {
            score: 15,
            name: "TERRORIST",
            logo: "magixgod.png",
        },
    },
    currentPhase,
    roundTimer: roundTimerProps,
    roundCounter: roundCounterProps,
});

storiesOf("TopBar", module)
    .add("ラウンドがliveの時のTopBar情報を表示できる", () => {
        return <TopBar {...props(CurrentPhase.live)} />;
    });
