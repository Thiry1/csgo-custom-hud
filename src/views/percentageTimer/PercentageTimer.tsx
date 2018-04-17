import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
const classNames = require("./percentage_timer.scss");

/**
 * プログレスバーの方向.
 */
export enum ProgressBarAxis {
    /**
     * 横軸.
     */
    Horizontal = "Horizontal",
    /**
     * 縦軸.
     */
    Vertical = "Vertical",
}

/**
 * バーの進む方向.
 */
export enum ProgressBarDirection {
    /**
     * プログレスバーをゲージで埋める方向,
     */
    Fill = "Fill",
    /**
     * プログレスバーからゲージを減らす方向.
     */
    Empty = "Empty",
}
export interface PercentageTimerProps {
    className?: string;
    /**
     * タイマーの数値.
     */
    value: number;
    /**
     * タイマーの最大値.
     */
    max: number;
    /**
     * タイマー上に表示するアイコン.
     */
    icon?: {
        component: any;
        props: any;
        className?: string;
    };
    /**
     * プログレスバーの種類.
     */
    progressBarType: {
        axis: ProgressBarAxis;
        direction: ProgressBarDirection;
    };
}

/**
 * PercentageTimerコンポーネント.
 * @param {PercentageTimerProps} props
 */
export class PercentageTimer extends BaseComponent<PercentageTimerProps, {}> {
    private createStyle = (): Object => {
        const percentage = 100 * (this.props.value / this.props.max);
        const step = (() => {
            switch (this.props.progressBarType.direction) {
                case ProgressBarDirection.Empty:
                    return `-${percentage > 0 ? 100 - percentage : 0}`;
                case ProgressBarDirection.Fill:
                    return `${percentage > 0 ? percentage : 0}`;
            }
        })();
        switch (this.props.progressBarType.axis) {
            case ProgressBarAxis.Vertical:
                return {
                    transform: `translate(0, ${step}%)`,
                };
            case ProgressBarAxis.Horizontal:
                return {
                    transform: `translate(${step}%, 0)`,
                };
        }
    };
    render() {
        const icon = ((): JSX.Element | null => {
            if (!this.props.icon) {
                return null;
            }
            const Component = this.props.icon.component;
            return <Component {...this.props.icon.props} className={this.props.icon.className} />;
        })();
        return (
            <div
                className={this.props.className || classNames.percentageTimer}
                data-axis={this.props.progressBarType.axis}
                data-direction={this.props.progressBarType.direction}
            >
                {icon}
                <span className={classNames.percentageBar} style={this.createStyle()} />
            </div>
        );
    }
}
