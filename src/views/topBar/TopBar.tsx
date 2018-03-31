import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { TeamLogoResolver } from "../../util/teamLogoResolver";
import {RoundCounter, RoundCounterProps} from "../roundCounter/RoundCounter";
import {Timer, TimerProps} from "../timer/Timer";
import {GameStateIntegration} from "../../dataTypes";
import CurrentPhase = GameStateIntegration.CurrentPhase;
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
    /**
     * 現在のラウンドのフェーズ.
     */
    currentPhase: CurrentPhase;
    /**
     * ラウンドのタイマー.
     */
    roundTimer: TimerProps;
    /**
     * ラウンド数のカウンター.
     */
    roundCounter: RoundCounterProps;
}
/**
 * TopBarコンポーネント
 * @param  {TopBarProps} props
 */
export class TopBar extends BaseComponent<TopBarProps, {}> {

    private createRoundInfo = (): JSX.Element => {
        // 設置中、解除中は表示しない.
        if (this.props.currentPhase === CurrentPhase.bomb
            || this.props.currentPhase === CurrentPhase.defuse) {
            return null;
        }

        return (
            <div className={classNames.roundInfo}>
                <Timer {...this.props.roundTimer} className={classNames.timer} />
                <RoundCounter {...this.props.roundCounter} className={classNames.roundCounter} />
            </div>
        );
    };

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
                    {this.createRoundInfo()}
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