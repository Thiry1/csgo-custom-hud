import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { Timer, TimerProps } from "./Timer";

export const props: TimerProps = {
    time: 90,
};

storiesOf("Timer", module)
    .add("タイマーを表示できる", () => {
        return <Timer {...props} />;
    });
