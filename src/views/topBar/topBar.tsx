import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { TeamLogoResolver } from "../../util/teamLogoResolver";
const classNames = require("./top_bar.scss");
export interface TeamInfo {
    /**
     * 勝利ラウンド数.
     */
    score: number;
    /**
     * チーム名.
     */
    name: string;
    /**
     * ロゴファイル名.
     */
    logo: string;
}
export interface TopBarProps {
    /**
     * チーム情報.
     */
    teamInfo: {
        ct: TeamInfo;
        t: TeamInfo;
    };
}
/**
 * TopBarコンポーネント
 * @param  {TopBarProps} props
 */
export class TopBar extends BaseComponent<TopBarProps, {}> {
    render() {
        if (isNaN(this.props.teamInfo.ct.score)) {
            return null;
        }
        return (
            <div className={classNames.topBar}>
                <div className={classNames.matchInfo}>
                    <div className={classNames.teamInfo} data-team="CT">
                        <p className={classNames.teamScore} data-team="CT">{this.props.teamInfo.ct.score}</p>
                        <div className={classNames.teamLogo} data-team="CT">
                            {this.props.teamInfo.ct.logo &&
                                <img src={TeamLogoResolver.resolve(this.props.teamInfo.ct.logo)} />}
                        </div>
                        <p className={classNames.teamName} data-team="CT">{this.props.teamInfo.ct.name}</p>
                    </div>
                    <div className={classNames.teamInfo} data-team="T">
                        <p className={classNames.teamScore} data-team="T">{this.props.teamInfo.t.score}</p>
                        <div className={classNames.teamLogo} data-team="T">
                            {this.props.teamInfo.t.logo &&
                                <img src={TeamLogoResolver.resolve(this.props.teamInfo.t.logo)} />}
                        </div>
                        <p className={classNames.teamName} data-team="T">{this.props.teamInfo.t.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}
