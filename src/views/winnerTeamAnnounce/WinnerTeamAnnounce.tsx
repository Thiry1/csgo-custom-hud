import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
const classNames = require("./winner_team_announce.scss");

export interface WinnerTeamAnnounceProps {
    /**
     * クラス名.
     */
    className?: string;
    /**
     * 勝者のチーム名.
     */
    teamName: string;
    /**
     * チームのサイド.
     */
    team: Team;
}

/**
 * Timerコンポーネント.
 * @param {TopBarProps} props
 */
export class WinnerTeamAnnounce extends BaseComponent<WinnerTeamAnnounceProps, {}> {
    render() {
        return (
            <div className={classNames.winnerTeamAnnounce}>
                <span className={classNames.teamName} data-team={this.props.team}>
                    {this.props.teamName}
                </span>
                <span className={classNames.label}>wins the round!</span>
            </div>
        );
    }
}
