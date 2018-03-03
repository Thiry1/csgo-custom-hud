import * as React from "react";
import { Kda, KdaProps } from "./Kda";
import { storiesOf, Story } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;

export const props: KdaProps = {
    kill: 1,
    death: 99,
    assist: 0,
    team: Team.CT,
};

storiesOf("KDA", module)
    .add("KDA情報を表示できる", () => {
        return <Kda {...props} />;
    });
