import * as React from "react";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
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
export const Kda: React.StatelessComponent<KdaProps> = (props: KdaProps) => {
    return (
        <div
            className={props.className || classNames.kda}
            data-team={props.team}
        >
            <div className={classNames.column}>
                <div className={classNames.title}>K</div>
                <div className={classNames.value}>{props.kill}</div>
            </div>
            <div className={classNames.column}>
                <div className={classNames.title}>A</div>
                <div className={classNames.value}>{props.assist}</div>
            </div>
            <div className={classNames.column}>
                <div className={classNames.title}>D</div>
                <div className={classNames.value}>{props.death}</div>
            </div>
        </div>
    );
};

export {
    Kda as Component,
    KdaProps as Props,
};
