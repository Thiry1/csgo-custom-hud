import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BlinkingC4Icon } from "./BlinkingC4Icon";

storiesOf("BlinkingC4Icon", module)
    .add("点滅するC4アイコンを表示できる", () => {
        return (
            <BlinkingC4Icon visible={true} />
        );
    });
