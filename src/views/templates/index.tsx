import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { Player, PlayerProps } from "../player/Player";
export interface TemplateProps {
    players: PlayerProps[];
}
export interface TemplateState {

}
export class Template extends BaseComponent<TemplateProps, TemplateState> {
    render() {
        return this.props.players.map(props => <Player {...props} />);
    }
}
