import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { PlayerProps } from "../player/Player";
import { GameStateIntegration } from "../../dataTypes";
import { TeamStats } from "../teamStats/TeamStats";
export interface TemplateProps {
    players: PlayerProps[];
}
export interface TemplateState {

}
export class Template extends BaseComponent<TemplateProps, TemplateState> {
    render() {
        return (
            <div>
                <TeamStats
                    players={this.props.players.filter(player => player.team === GameStateIntegration.Team.CT)}
                    team={GameStateIntegration.Team.CT}
                />
                <TeamStats
                    players={this.props.players.filter(player => player.team === GameStateIntegration.Team.T)}
                    team={GameStateIntegration.Team.T}
                />
            </div>
        );
    }
}
