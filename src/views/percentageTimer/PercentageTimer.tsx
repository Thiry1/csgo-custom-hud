import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
const classNames = require("./percentage_timer.scss");

export interface PercentageTimerProps {
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
}

/**
 * PercentageTimerコンポーネント.
 * @param {PercentageTimerProps} props
 */
export class PercentageTimer extends BaseComponent<PercentageTimerProps, {}> {
    render() {
        const percentage = 100 * (this.props.value / this.props.max);
        const icon = ((): JSX.Element | null => {
            if (!this.props.icon) {
                return null;
            }
            const Component = this.props.icon.component;
            return <Component {...this.props.icon.props} className={this.props.icon.className} />;
        })();
        return (
            <div className={classNames.percentageTimer}>
                {icon}
                <span className={classNames.percentageBar} style={{ transform: `translate(0, ${percentage > 0 ? percentage : 0}%)` }} />
            </div>
        );
    }
}
