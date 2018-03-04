import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { PlayerProps } from "../player/Player";
import { GameStateIntegration } from "../../dataTypes";
import { TeamStats } from "../teamStats/TeamStats";
import { TeamMoneyProps } from "../teamMoney/TeamMoney";
export interface TemplateProps {
    players: PlayerProps[];
    teamMoney: {
        ct: TeamMoneyProps,
        t: TeamMoneyProps,
    };
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
                    teamMoney={this.props.teamMoney.ct}
                />
                <TeamStats
                    players={this.props.players.filter(player => player.team === GameStateIntegration.Team.T)}
                    team={GameStateIntegration.Team.T}
                    teamMoney={this.props.teamMoney.t}
                />
            </div>
        );
    }
}
