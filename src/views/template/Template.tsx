import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { PlayerProps } from "../player/Player";
import { GameStateIntegration } from "../../dataTypes";
import { TeamStats } from "../teamStats/TeamStats";
import { TeamMoneyProps } from "../teamMoney/TeamMoney";
import { SpectatingPlayer, SpectatingPlayerProps } from "../spectatingPlayer/SpectatingPlayer";
import { TopBar, TopBarProps } from "../topBar/TopBar";
import { WinnerTeamAnnounce, WinnerTeamAnnounceProps } from "../winnerTeamAnnounce/WinnerTeamAnnounce";
export interface TemplateProps {
    visible: boolean;
    players: PlayerProps[];
    teamMoney: {
        ct: TeamMoneyProps,
        t: TeamMoneyProps,
    };
    spectatingPlayer: SpectatingPlayerProps;
    topBar: TopBarProps;
    winnerTeamAnnounce?: WinnerTeamAnnounceProps;
}
export interface TemplateState {

}
export class Template extends BaseComponent<TemplateProps, TemplateState> {
    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <div>
                <TopBar {...this.props.topBar} />
                {this.props.winnerTeamAnnounce && <WinnerTeamAnnounce {...this.props.winnerTeamAnnounce} />}
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
                <SpectatingPlayer {...this.props.spectatingPlayer} />
            </div>
        );
    }
}
