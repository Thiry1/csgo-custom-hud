import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PercentageTimer } from "./PercentageTimer";
import { BlinkingC4Icon } from "../blinkingC4Icon/BlinkingC4Icon";
interface State {
    value: number;
}
class PercentageTimerWrapper extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 100,
        };
        setInterval(() => this.setState({ value: this.state.value - 1 }), 1000);
    }
    render() {
        const props = {
            value: this.state.value,
            max: 100,
            icon: {
                component: BlinkingC4Icon,
                props: {
                    visible: true,
                },
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
    .add("タイマーを表示できる", () => {
        return <PercentageTimerWrapper />;
    });
