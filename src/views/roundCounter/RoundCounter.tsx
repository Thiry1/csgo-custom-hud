import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
const classNames = require("./round_counter.scss");

export interface RoundCounterProps {
    /**
     * クラス名.
     */
    className?: string;
    /**
     * 現在のラウンド数.
     */
    currentRound: number;
    /**
     * 最大ラウンド数.
     */
    maxRound: number;
}

/**
 * RoundCounterコンポーネント.
 * @param {RoundCounterProps} props
 */
export class RoundCounter extends BaseComponent<RoundCounterProps, {}> {
    render() {
        return (
            <div className={this.props.className || classNames.roundCounter}>
                <span className={classNames.prefix}>R</span>
                <span className={classNames.currentRound}>{this.props.currentRound}</span>
                <span className={classNames.separator}>/</span>
                <span className={classNames.maxRound}>{this.props.maxRound}</span>
            </div>
        );
    }
}
