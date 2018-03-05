import * as React from "react";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { BaseComponent } from "../util/baseComponent";
const classNames = require("./kda.scss");
export interface KdaProps {
    className?: string;
    /**
     * キル数.
     */
    kill: number;
    /**
     * デス数.
     */
    death: number;
    /**
     * アシスト数.
     */
    assist: number;
    /**
     * チーム.
     */
    team: Team;
}
/**
 * KDAコンポーネント
 * @param  {KdaProps} props
 */
export class Kda extends BaseComponent<KdaProps, {}> {
    render() {
        return (
            <div
                className={this.props.className || classNames.kda}
                data-team={this.props.team}
            >
                <div className={classNames.column}>
                    <div className={classNames.title}>K</div>
                    <div className={classNames.value}>{this.props.kill}</div>
                </div>
                <div className={classNames.column}>
                    <div className={classNames.title}>A</div>
                    <div className={classNames.value}>{this.props.assist}</div>
                </div>
                <div className={classNames.column}>
                    <div className={classNames.title}>D</div>
                    <div className={classNames.value}>{this.props.death}</div>
                </div>
            </div>
        );
    }
}
