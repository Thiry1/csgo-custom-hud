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
        const slot1To5 = this.props.players.filter(this.isObserverSlot1To5);
        const slot6to0 = this.props.players.filter(player => !this.isObserverSlot1To5(player));
        return (
            <div>
                <TopBar {...this.props.topBar} />
                {this.props.winnerTeamAnnounce && <WinnerTeamAnnounce {...this.props.winnerTeamAnnounce} />}
                {slot1To5.length !== 0 && <TeamStats
                    players={slot1To5}
                    team={slot1To5[0].team}
                    teamMoney={this.getTeamMoney(slot1To5[0].team)}
                />}
                {slot6to0.length !== 0 && <TeamStats
                    players={slot6to0}
                    team={slot6to0[0].team}
                    teamMoney={this.getTeamMoney(slot6to0[0].team)}
                />}
                <SpectatingPlayer {...this.props.spectatingPlayer} />
            </div>
        );
    }
    private getTeamMoney = (team: GameStateIntegration.Team): TeamMoneyProps => team === GameStateIntegration.Team.CT
        ? this.props.teamMoney.ct
        : this.props.teamMoney.t;
    private isObserverSlot1To5 = (player: PlayerProps) => player.observerSlot !== 0 && player.observerSlot <= 5;
}
