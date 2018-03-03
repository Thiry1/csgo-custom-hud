import * as React from "react";
import { storiesOf, Story } from "@storybook/react";
import { GameStateIntegration } from "../../dataTypes";
import { Template, TemplateProps } from "./Template";
import { props as createPlayerProps } from "../teamStats/Story";
const props: TemplateProps = {
    players: [
        ...createPlayerProps(GameStateIntegration.Team.CT).players,
        ...createPlayerProps(GameStateIntegration.Team.T).players,
    ],
};
storiesOf("テンプレート", module)
    .add("テンプレートを表示できる", () => {
        return <Template {...props} />;
    });
