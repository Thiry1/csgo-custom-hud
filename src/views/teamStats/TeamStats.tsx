import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { Player, PlayerProps } from "../player/Player";
import { GameStateIntegration } from "../../dataTypes";
import { TeamMoney, TeamMoneyProps } from "../teamMoney/TeamMoney";
import { SlotSide } from "../../util/slotSideResolver";
const classNames = require("./team_stats.scss");

export interface TeamStatsProps {
    players: PlayerProps[];
    team: GameStateIntegration.Team;
    teamMoney: TeamMoneyProps;
    slotSide: SlotSide;
}

export class TeamStats extends BaseComponent<TeamStatsProps, {}> {
    render() {
        return (
            <div className={classNames.teamStats} data-slot-side={this.props.slotSide}>
                <TeamMoney {...this.props.teamMoney} team={this.props.team} />
                {this.props.players.map(player => <Player {...player} />)}
            </div>
        );
    }
}
