import * as React from "react";
import { Player } from "./index";
import { storiesOf, Story } from "@storybook/react";

storiesOf("Player", module)
    .add("プレイヤー情報を表示できる", () => {
        return <Player />;
    });
