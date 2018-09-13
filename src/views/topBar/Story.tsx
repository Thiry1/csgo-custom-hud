import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TopBar, TopBarProps } from "./TopBar";
import { props as roundCounterProps } from "../roundCounter/Story";
import { GameStateIntegration } from "../../dataTypes";
import CurrentPhase = GameStateIntegration.CurrentPhase;
import { BlinkingC4Icon } from "../blinkingC4Icon/BlinkingC4Icon";
import { BaseComponent } from "../util/baseComponent";
import { ProgressBarAxis, ProgressBarDirection } from "../percentageTimer/PercentageTimer";
import { select, withKnobs } from "@storybook/addon-knobs";
import { SlotSide } from "../../util/slotSideResolver";

export const props = (currentPhase: CurrentPhase, roundTimer: number, defuseTimer: number): TopBarProps => ({
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
    roundTimer: {
        time: roundTimer,
    },
    c4Timer: {
        value: roundTimer,
        max: 35,
        icon: {
            component: BlinkingC4Icon,
            props: {
                visible: true,
            },
        },
        progressBarType: {
            axis: ProgressBarAxis.Vertical,
            direction: ProgressBarDirection.Fill,
        },
    },
    defuseTimer: {
        value: defuseTimer,
        max: 10,
        progressBarType: {
            axis: ProgressBarAxis.Horizontal,
            direction: ProgressBarDirection.Empty,
        },
    },
    roundCounter: roundCounterProps,
    slotSide: {
        ct: select<SlotSide>("ct-slotSide", [SlotSide.Left, SlotSide.Right], SlotSide.Left),
        t: select<SlotSide>("t-slotSide", [SlotSide.Left, SlotSide.Right], SlotSide.Right),
    },
});
interface Props {
    phase: CurrentPhase;
}
interface State {
    roundTimer: number;
    defuseTimer: number;
}
class TopBarWrapper extends BaseComponent<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            roundTimer: this.props.phase === CurrentPhase.bomb ||
                this.props.phase === CurrentPhase.defuse ? 35 : 100,
            defuseTimer: 10,
        };
        setInterval(() => this.setState({
            roundTimer: this.state.roundTimer - 0.1,
            defuseTimer: this.state.defuseTimer - 0.1,
        }), 100);
    }
    render() {
        return <TopBar {...props(this.props.phase, this.state.roundTimer, this.state.defuseTimer)} />;
    }
}

storiesOf("TopBar", module)
    .addDecorator(withKnobs)
    .add("ラウンドがliveの時のTopBar情報を表示できる", () => {
        return <TopBarWrapper phase={CurrentPhase.live} />;
    })
    .add("ラウンドがC4設置中の時のTopBar情報を表示できる", () => {
        return <TopBarWrapper phase={CurrentPhase.bomb} />;
    })
    .add("ラウンドがC4解除中の時のTopBar情報を表示できる", () => {
        return <TopBarWrapper phase={CurrentPhase.defuse} />;
    });
