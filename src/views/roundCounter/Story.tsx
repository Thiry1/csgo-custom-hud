import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { RoundCounter, RoundCounterProps } from "./RoundCounter";

export const props: RoundCounterProps = {
    currentRound: 10,
    maxRound: 30,
};

storiesOf("RoundCounter", module)
    .add("ラウンドカウンターを表示できる", () => {
        return <RoundCounter {...props} />;
    });
