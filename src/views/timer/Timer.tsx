import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
const convertSeconds = require("convert-seconds");
const leftPad = require("left-pad");
const classNames = require("./timer.scss");

export interface TimerProps {
    /**
     * クラス名.
     */
    className?: string;
    /**
     * 時間.
     */
    time: number;
}

/**
 * Timerコンポーネント.
 * @param {TopBarProps} props
 */
export class Timer extends BaseComponent<TimerProps, {}> {
    render() {
        if (isNaN(this.props.time)) {
            return null;
        }

        const time: { hours: number, minutes: number, seconds: number } = convertSeconds(this.props.time);
        return (
            <div className={this.props.className || classNames.timer}>
                <span className={classNames.minutes}>{time.minutes}</span>
                <span className={classNames.separator}>:</span>
                <span className={classNames.seconds}>{leftPad(time.seconds, 2, "0")}</span>
            </div>
        );
    }
}
