import * as React from "react";
import { BaseComponent } from "../util/baseComponent";
import { GameStateIntegration } from "../../dataTypes";
import { MiscIconResolver } from "../../util/miscIconResolver";
import { SlotSide } from "../../util/slotSideResolver";
const classNames = require("./team_money.scss");

export interface TeamMoneyProps {
    /**
     * チームマネー情報を表示するか.
     */
    showTeamMoney: boolean;
    /**
     * チームがこのラウンドで購入した装備の合計金額.
     */
    totalEquipmentValue: number;
    /**
     * チームの所持金合計.
     */
    totalTeamMoney: number;
    /**
     * チーム.
     */
    team?: GameStateIntegration.Team;
    /**
     * スロットサイド.
     */
    slotSide: SlotSide;
}

export class TeamMoney extends BaseComponent<TeamMoneyProps, {}> {
    render() {
        return (
            <div
                className={classNames.teamMoney}
                data-team={this.props.team}
                data-show-team-money={this.props.showTeamMoney}
                data-slot-side={this.props.slotSide}
            >
                <img
                    src={MiscIconResolver.resolve("team")}
                    data-team={this.props.team}
                    data-slot-side={this.props.slotSide}
                    className={classNames.teamIcon}
                />
                <div className={classNames.moneyInfo} data-team={this.props.team} data-slot-side={this.props.slotSide}>
                    <p
                        className={classNames.moneyTitle}
                        data-team={this.props.team}
                        data-slot-side={this.props.slotSide}
                    >
                        Team money:
                    </p>
                    <p
                        data-team={this.props.team}
                        data-slot-side={this.props.slotSide}
                        className={classNames.totalMoney}
                    >
                        ${this.props.totalTeamMoney}
                    </p>
                </div>
                <img
                    src={MiscIconResolver.resolve("equipment")}
                    data-team={this.props.team}
                    data-slot-side={this.props.slotSide}
                    className={classNames.equipmentIcon}
                />
                <div className={classNames.equipmentInfo} data-team={this.props.team} data-slot-side={this.props.slotSide}>
                    <p
                        className={classNames.equipmentTitle}
                        data-team={this.props.team}
                        data-slot-side={this.props.slotSide}
                    >
                        Equipment value:
                    </p>
                    <p
                        data-team={this.props.team}
                        data-slot-side={this.props.slotSide}
                        className={classNames.totalEquipment}
                    >
                        ${this.props.totalEquipmentValue}
                    </p>
                </div>
            </div>
        );
    }
}
