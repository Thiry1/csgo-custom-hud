import * as React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { State } from "../redux/modules";
import { Player } from "../redux/modules/players/players";
import { Template, TemplateProps } from "../views/template/Template";
import { RoundPhaseState } from "../redux/modules/roundPhase/roundPhase";
import { GameStateIntegration } from "../dataTypes";

export interface ContainerProps {

}
interface PropsFromState {
    players: Player[];
    roundPhase: RoundPhaseState;
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
                        activeWeapon: player.weapons.activeWeapon,
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
        };
    }
    render() {
        return (
            <Template {...this.createTemplateProps()} />
        );
    }
}

// const mapStateToProps = (state: State): PropsFromState => ({
//     players: state.players.players,
// });
const mapStateToProps = (state: State): PropsFromState => {
    console.log("state", state);
    return {
        players: state.players.players,
        roundPhase: state.roundPhase,
    };
};
export const Container = compose(
    connect<PropsFromState, Dispatcher, ContainerProps>(mapStateToProps, {}),
)(ContainerPage);
