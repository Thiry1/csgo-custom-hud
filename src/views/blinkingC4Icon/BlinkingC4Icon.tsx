import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { MiscIconResolver } from "../../util/miscIconResolver";

const classNames = require("./blinking_c4_icon.scss");

export interface BlinkingC4IconProps {
    className?: string;
    visible: boolean;
}

/**
 * BlinkingC4Iconコンポーネント.
 * @param {BlinkingC4IconProps} props
 */
export class BlinkingC4Icon extends BaseComponent<BlinkingC4IconProps, {}> {
    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <img src={MiscIconResolver.resolve("c4")} className={this.props.className || classNames.c4} />
        );
    }
}
