import * as React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { State } from "../redux/modules";
import { Player } from "../redux/modules/players/players";
import { Template, TemplateProps } from "../views/template/Template";
import { RoundPhaseState } from "../redux/modules/roundPhase/roundPhase";
import { GameStateIntegration } from "../dataTypes";
import { TeamMoneyState } from "../redux/modules/teamMoney/teamMoney";
import { ScoreState } from "../redux/modules/score/score";
import { TeamInfoState } from "../redux/modules/teamInfo/teamInfo";
import { PlayerInfo } from "../config/playerInfo";

export interface ContainerProps {

}
interface PropsFromState {
    players: Player[];
    roundPhase: RoundPhaseState;
    teamMoney: TeamMoneyState;
    spectatingPlayer: Player & PlayerInfo;
    score: ScoreState;
    teamInfo: TeamInfoState;
}
interface Dispatcher {

}
interface Props extends ContainerProps, Dispatcher, PropsFromState {
}

interface ContainerState {
}
class ContainerPage extends React.Component<Props, ContainerState> {
    private createTemplateProps(): TemplateProps {
        return {
            players: this.props.players.map(player => {
                return {
                    name: player.name,
                    money: player.state.money,
                    health: player.state.health,
                    armor: player.state.armor,
                    hasHelmet: player.state.helmet,
                    hasDefuseKit: !!player.state.defusekit,
                    showKda: this.props.roundPhase.phase === GameStateIntegration.RoundPhase.freezetime,
                    kda: {
                        kill: player.matchStats.kills,
                        death: player.matchStats.deaths,
                        assist: player.matchStats.assists,
                        team: player.team,
                    },
                    roundKillCount: player.state.roundKills,
                    roundKillByHeadShotCount: player.state.roundKillHs,
                    weapon: {
                        activeWeapon: player.weapons.activeWeapon ? player.weapons.activeWeapon.name : null,
                        primary: player.weapons.primary ? player.weapons.primary.name : null,
                        secondary: player.weapons.secondary ? player.weapons.secondary.name : null,
                        flashBangAmount: player.weapons.flashBangAmount,
                        smokeAmount: player.weapons.smokeAmount,
                        highExplosiveAmount: player.weapons.highExplosiveAmount,
                        molotovAmount: player.weapons.molotovAmount,
                        incGrenadeAmount: player.weapons.incGrenadeAmount,
                        decoyAmount: player.weapons.decoyAmount,
                        hasC4: player.weapons.hasC4,
                    },
                    team: player.team,
                };
            }),
            teamMoney: {
                ct: {
                    team: GameStateIntegration.Team.CT,
                    ...this.props.teamMoney.ct,
                },
                t: {
                    team: GameStateIntegration.Team.T,
                    ...this.props.teamMoney.t,
                },
            },
            spectatingPlayer: { // TODO: Player そのまま渡すで良い.
                showSpectatingPlayer: this.props.roundPhase.phase !== GameStateIntegration.RoundPhase.freezetime,
                name: this.props.spectatingPlayer.name,
                twitterId: this.props.spectatingPlayer.twitterId,
                activeWeapon: this.props.spectatingPlayer.weapons.activeWeapon,
                flashBangAmount: this.props.spectatingPlayer.weapons.flashBangAmount,
                smokeAmount: this.props.spectatingPlayer.weapons.smokeAmount,
                highExplosiveAmount: this.props.spectatingPlayer.weapons.highExplosiveAmount,
                molotovAmount: this.props.spectatingPlayer.weapons.molotovAmount,
                incGrenadeAmount: this.props.spectatingPlayer.weapons.incGrenadeAmount,
                decoyAmount: this.props.spectatingPlayer.weapons.decoyAmount,
                health: this.props.spectatingPlayer.state.health,
                armor: this.props.spectatingPlayer.state.armor,
                hasHelmet: this.props.spectatingPlayer.state.helmet,
                kill: this.props.spectatingPlayer.matchStats.kills,
                death: this.props.spectatingPlayer.matchStats.deaths,
                assist: this.props.spectatingPlayer.matchStats.assists,
                team: this.props.spectatingPlayer.team,
            },
            topBar: {
                teamInfo: {
                    ct: {
                        score: this.props.score.ct,
                        name: this.props.teamInfo.ct.name || "COUNTER TERRORIST",
                        logo: this.props.teamInfo.ct.logo,
                    },
                    t: {
                        score: this.props.score.t,
                        name: this.props.teamInfo.t.name || "TERRORIST",
                        logo: this.props.teamInfo.t.logo,
                    },
                },
            },
        };
    }
    render() {
        return (
            <Template {...this.createTemplateProps()} />
        );
    }
}

const mapStateToProps = (state: State): PropsFromState => {
    console.log("state", state);
    return {
        players: state.players.players,
        roundPhase: state.roundPhase,
        teamMoney: state.teamMoney,
        spectatingPlayer: state.spectatingPlayer.player,
        score: state.score,
        teamInfo: state.teamInfo,
    };
};
export const Container = compose(
    connect<PropsFromState, Dispatcher, ContainerProps>(mapStateToProps, {}),
)(ContainerPage);
