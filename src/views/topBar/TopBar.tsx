import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { TeamLogoResolver } from "../../util/teamLogoResolver";
import { RoundCounter, RoundCounterProps } from "../roundCounter/RoundCounter";
import { Timer, TimerProps } from "../timer/Timer";
import { GameStateIntegration } from "../../dataTypes";
import { PercentageTimer, PercentageTimerProps } from "../percentageTimer/PercentageTimer";
import { SlotSide } from "../../util/slotSideResolver";
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
    /**
     * C4のカウントダウンタイマー.
     */
    c4Timer: PercentageTimerProps;
    /**
     * C4の解除カウントダウンタイマー.
     */
    defuseTimer: PercentageTimerProps;
    slotSide: {
        ct: SlotSide,
        t: SlotSide,
    };
}
/**
 * TopBarコンポーネント
 * @param  {TopBarProps} props
 */
export class TopBar extends BaseComponent<TopBarProps, {}> {

    private createRoundInfo = (): JSX.Element => {
        const timer = ((): JSX.Element | null => {
            if (this.props.currentPhase === CurrentPhase.bomb
                || this.props.currentPhase === CurrentPhase.defuse) {
                if (!this.props.c4Timer) {
                    return null;
                }

                const props: PercentageTimerProps = {
                    ...this.props.c4Timer,
                    icon: this.props.c4Timer.icon ? {
                        ...this.props.c4Timer.icon,
                        className: classNames.c4Timer,
                    } : null,
                };
                return <PercentageTimer {...props} />;
            } else {
                return <Timer {...this.props.roundTimer} className={classNames.timer} />;
            }
        })();
        const defuseTimer = (() => {
            if (this.props.currentPhase === CurrentPhase.defuse) {
                if (!this.props.defuseTimer) {
                    return null;
                }
                const props: PercentageTimerProps = {
                    ...this.props.defuseTimer,
                    className: classNames.defuseTimer,
                };
                return (
                    <div className={classNames.defuseTimerWrapper}>
                        <p className={classNames.defuseTimerLabel}>DEFUSING</p>
                        <PercentageTimer {...props} />
                    </div>
                );
            } else {
                return null;
            }
        })();
        const roundCounter = (() => {
            if (this.props.currentPhase === CurrentPhase.bomb
                || this.props.currentPhase === CurrentPhase.defuse) {
                return null;
            } else {
                return <RoundCounter {...this.props.roundCounter} className={classNames.roundCounter} />;
            }
        })();
        return (
            <div className={classNames.roundInfo}>
                {timer}
                {roundCounter}
                {defuseTimer}
            </div>
        );
    };

    createTeamInfo = (team: GameStateIntegration.Team, teamInfo: TeamInfo, slotSide: SlotSide): JSX.Element => {
        return (
            <div className={classNames.teamInfo} data-team={team} data-slot-side={slotSide}>
                <p className={classNames.teamScore} data-team={team} data-slot-side={slotSide}>{teamInfo.score}</p>
                <div className={classNames.teamLogo} data-team={team} data-slot-side={slotSide}>
                    {teamInfo.logo &&
                        <img src={TeamLogoResolver.resolve(teamInfo.logo)} />}
                </div>
                <p className={classNames.teamName} data-team={team} data-slot-side={slotSide}>{teamInfo.name}</p>
            </div>
        );
    };

    render() {
        if (isNaN(this.props.teamInfo.ct.score)) {
            return null;
        }
        const ctTeamInfo = this.createTeamInfo(GameStateIntegration.Team.CT, this.props.teamInfo.ct, this.props.slotSide.ct);
        const tTeamInfo = this.createTeamInfo(GameStateIntegration.Team.T, this.props.teamInfo.t, this.props.slotSide.t);
        return (
            <div className={classNames.topBar}>
                <div className={classNames.matchInfo}>
                    {this.props.slotSide.ct === SlotSide.Left
                        ? ctTeamInfo
                        : tTeamInfo
                    }
                    {this.createRoundInfo()}
                    {this.props.slotSide.ct === SlotSide.Right
                        ? ctTeamInfo
                        : tTeamInfo
                    }
                </div>
            </div>
        );
    }
}
