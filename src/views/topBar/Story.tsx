import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { TopBar, TopBarProps } from "./topBar";

export const props: TopBarProps = {
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
};

storiesOf("TopBar", module)
    .add("TopBar情報を表示できる", () => {
        return <TopBar {...props} />;
    });
