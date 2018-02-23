import * as React from "react";
import { Story, storiesOf } from "@storybook/react";
import { Player } from "./index";

storiesOf("Player", module)
    .add("プレイヤー情報を表示できる", () => {
        return <Player />;
    });
