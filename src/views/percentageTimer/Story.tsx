import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PercentageTimer, ProgressBarAxis, ProgressBarDirection } from "./PercentageTimer";
import { BlinkingC4Icon } from "../blinkingC4Icon/BlinkingC4Icon";
interface Props {
    progressBarType: {
        axis: ProgressBarAxis;
        direction: ProgressBarDirection;
    };
}
interface State {
    value: number;
}
class PercentageTimerWrapper extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 40,
        };
        setInterval(() => this.setState({ value: this.state.value - 1 }), 1000);
    }
    render() {
        const props = {
            value: this.state.value,
            max: 40,
            icon: {
                component: BlinkingC4Icon,
                props: {
                    visible: true,
                },
            },
            progressBarType: {
                axis: this.props.progressBarType.axis,
                direction: this.props.progressBarType.direction,
            },
        };
        return (
            <div style={{ height: "300px" }}>
                <PercentageTimer {...props} />
            </div>
        );
    }
}

storiesOf("PercentageTimer", module)
    .add("縦軸で増加していくプログレスバーが表示されるタイマーを表示できる", () => {
        const progressBarType = {
            axis: ProgressBarAxis.Vertical,
            direction: ProgressBarDirection.Fill,
        };
        return <PercentageTimerWrapper progressBarType={progressBarType} />;
    })
    .add("横軸で減少していくプログレスバーが表示されるタイマーを表示できる", () => {
        const progressBarType = {
            axis: ProgressBarAxis.Horizontal,
            direction: ProgressBarDirection.Empty,
        };
        return <PercentageTimerWrapper progressBarType={progressBarType} />;
    });
