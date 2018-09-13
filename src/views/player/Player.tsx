import * as React from "react";
import { Kda, KdaProps } from "../kda/Kda";
import { GameStateIntegration } from "../../dataTypes";
import { WeaponIconResolver } from "../../util/weaponIconResolver";
import { ArmorIconResolver } from "../../util/armorIconResolver";
import { MiscIconResolver } from "../../util/miscIconResolver";
import { SlotSide, SlotSideResolver } from "../../util/slotSideResolver";
import { BaseComponent } from "../util/baseComponent";
import Team = GameStateIntegration.Team;

const classNames = require("./player.scss");
export interface PlayerProps {
    /**
     * プレイヤーの名前.
     */
    name: string;
    /**
     * 所持金.
     */
    money: number;
    /**
     * ヘルス残量.
     */
    health: number;
    /**
     * アーマー残量.
     */
    armor: number;
    /**
     * ヘルメットを持っているか.
     */
    hasHelmet: boolean;
    /**
     * 解除キットを持っているか.
     */
    hasDefuseKit: boolean;
    /**
     * KDA を表示するか.
     */
    showKda: boolean;
    /**
     * kill / death / assist
     */
    kda: KdaProps;
    /**
     * 現在のラウンドでのキル数.
     */
    roundKillCount: number;
    /**
     * 現在のラウンドでのヘッドショットによるキル数.
     */
    roundKillByHeadShotCount: number;
    /**
     * 所持中の武器.
     */
    weapon: {
        /**
         * アクティブウェポン.
         */
        activeWeapon: string | null;
        /**
         * プライマリーウェポン.
         */
        primary: string | null; // TODO 武器名 enum
        /**
         * セカンダリーウェポン.
         */
        secondary: string | null; // TODO 武器名 enum
        /**
         * FB の保有数.
         */
        flashBangAmount: number;
        /**
         * smoke の保有数.
         */
        smokeAmount: number;
        /**
         * HE の保有数.
         */
        highExplosiveAmount: number;
        /**
         * molotov の保有数.
         */
        molotovAmount: number;
        /**
         * inc grenade の保有数.
         */
        incGrenadeAmount: number;
        /**
         * decoy の保有数.
         */
        decoyAmount: number;
        /**
         * C4 を保有しているか.
         */
        hasC4: boolean;
    };
    /**
     * チーム.
     */
    team: Team;
    /**
     * observer slot.
     */
    observerSlot: number;
    /**
     * 観戦中か.
     */
    isSpectatingByObserver: boolean;
}

export class Player extends BaseComponent<PlayerProps, {}> {
    createHighExplosiveAmountInfo = (): JSX.Element => {
        if (this.props.weapon.highExplosiveAmount === 0) {
            return null;
        }
        return (
            <img
                src={WeaponIconResolver.resolve("hegrenade")}
                data-active={"weapon_hegrenade" === this.props.weapon.activeWeapon}
            />
        );
    };
    createSmokeAmountInfo = (): JSX.Element => {
        if (this.props.weapon.smokeAmount === 0) {
            return null;
        }
        return (
            <img
                src={WeaponIconResolver.resolve("smokegrenade")}
                data-active={"weapon_smokegrenade" === this.props.weapon.activeWeapon}
            />
        );
    };
    createIncGrenadeAmountAmountInfo = (): JSX.Element => {
        if (this.props.weapon.incGrenadeAmount === 0) {
            return null;
        }
        return (
            <img
                src={WeaponIconResolver.resolve("incgrenade")}
                data-active={"weapon_incgrenade" === this.props.weapon.activeWeapon}
            />
        );
    };
    createMolotovAmountInfo = (): JSX.Element => {
        if (this.props.weapon.molotovAmount === 0) {
            return null;
        }
        return (
            <img
                src={WeaponIconResolver.resolve("molotov")}
                data-active={"weapon_molotov" === this.props.weapon.activeWeapon}
            />
        );
    };
    createDecoyAmountInfo = (): JSX.Element => {
        if (this.props.weapon.decoyAmount === 0) {
            return null;
        }
        return (
            <img
                src={WeaponIconResolver.resolve("decoy")}
                data-active={"weapon_decoy" === this.props.weapon.activeWeapon}
            />
        );
    };
    createFlashBangAmountInfo = (): JSX.Element[] => {
        if (this.props.weapon.flashBangAmount === 0) {
            return null;
        }
        return [...Array(this.props.weapon.flashBangAmount).keys()].map(key => (
            <img
                src={WeaponIconResolver.resolve("flashbang")}
                data-active={"weapon_flashbang" === this.props.weapon.activeWeapon}
            />
        ));
    };
    createArmorInfo = (): JSX.Element => {
        const src = ArmorIconResolver.resolve({ hasHelmet: this.props.hasHelmet, armor: this.props.armor });
        if (!src) {
            return (
                <span
                    className={classNames.armor}
                    data-team={this.props.team}
                    data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
                />
            );
        }
        return (
            <span
                className={classNames.armor}
                data-team={this.props.team}
                data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
            >
                <img
                    className={classNames.armorIcon}
                    src={src}
                    data-team={this.props.team}
                    data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
                />
            </span>
        );
    };
    createPrimaryWeaponInfo = (): JSX.Element => {
        if (!this.props.weapon.primary) {
            return null;
        }
        const src = WeaponIconResolver.resolve(this.props.weapon.primary);
        if (!src) {
            return null;
        }
        return (
            <span
                className={classNames.primaryWeapon}
                data-team={this.props.team}
            >
                <img
                    className={classNames.primaryWeaponIcon}
                    src={WeaponIconResolver.resolve(this.props.weapon.primary)}
                    alt={this.props.weapon.primary}
                    data-active={this.props.weapon.primary === this.props.weapon.activeWeapon}
                    data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
                    data-team={this.props.team}
                />
            </span>
        );
    };
    createSecondaryWeaponInfo = (): JSX.Element => {
        if (!this.props.weapon.secondary) {
            return null;
        }
        const src = WeaponIconResolver.resolve(this.props.weapon.secondary);
        if (!src) {
            return null;
        }
        return (
            <img
                className={classNames.secondaryWeaponIcon}
                src={src}
                alt={this.props.weapon.secondary}
                data-active={this.props.weapon.secondary === this.props.weapon.activeWeapon}
            />
        );
    };
    createRoundKillCountInfo = (): JSX.Element[] => {
        if (!this.props.roundKillCount) {
            return null;
        }
        return [
            <img
                className={classNames.killIcon}
                src={MiscIconResolver.resolve("death")}
                data-team={this.props.team}
                data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
            />,
            <span
                className={classNames.killCount}
                data-team={this.props.team}
                data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
            >
                {this.props.roundKillCount}
            </span>,
        ];
    };
    createItemInfo = (): JSX.Element => {
        return (
            <div
                className={classNames.itemInfo} data-team={this.props.team}
                data-slot-side={SlotSideResolver.resolve(this.props.observerSlot)}
            >
                {this.createSecondaryWeaponInfo()}
                {this.createRoundKillCountInfo()}
                {this.createHighExplosiveAmountInfo()}
                {this.createSmokeAmountInfo()}
                {this.createFlashBangAmountInfo()}
                {this.createMolotovAmountInfo()}
                {this.createIncGrenadeAmountAmountInfo()}
                {this.createDecoyAmountInfo()}
            </div>
        );
    };
    createDefuseKitInfo = (): JSX.Element => {
        if (!this.props.hasDefuseKit) {
            return null;
        }
        return (
            <span className={classNames.defuseKit}>
                <img src={MiscIconResolver.resolve("defuseKit")} />
            </span>
        );
    };
    createC4Info = (): JSX.Element => {
        if (!this.props.weapon.hasC4) {
            return null;
        }
        return (
            <span className={classNames.c4}>
                <img src={MiscIconResolver.resolve("c4")} />
            </span>
        );
    };
    createHealthBar = (): JSX.Element => {
        const clip = SlotSideResolver.resolve(this.props.observerSlot) === SlotSide.Left
            ? `0px ${100 - this.props.health}% 0px 0px`
            : `0px 0px 0px ${100 - this.props.health}%`;
        return (
            <span
                className={classNames.healthBar}
                data-team={this.props.team}
                style={{ clipPath: `inset(${clip})` }} // TODO: animation
            />
        );
    };
    render() {
        const slotSide = SlotSideResolver.resolve(this.props.observerSlot);
        return (
            <div
                className={classNames.player}
                data-is-alive={this.props.health !== 0}
                data-team={this.props.team}
                data-slot-side={slotSide}
                data-is-spectating-by-observer={this.props.isSpectatingByObserver}
            >
                <div className={classNames.wrapper}>
                    <div className={classNames.mainInfo}>
                        {this.createHealthBar()}
                        <span
                            className={classNames.health}
                            data-team={this.props.team}
                            data-slot-side={slotSide}
                        >
                            {this.props.health}
                        </span>
                        <span
                            className={classNames.name}
                            data-team={this.props.team}
                            data-is-alive={this.props.health !== 0}
                            data-slot-side={slotSide}
                        >
                            {this.props.name}
                        </span>
                        {this.createPrimaryWeaponInfo()}
                    </div>
                    <div className={classNames.subInfo}>
                        <span
                            className={classNames.observerSlot}
                            data-team={this.props.team}
                            data-slot-side={slotSide}>
                            {this.props.observerSlot}
                        </span>
                        {this.createArmorInfo()}
                        <span className={classNames.money} data-team={this.props.team} data-slot-side={slotSide}>
                            ${this.props.money}
                        </span>
                        {this.createDefuseKitInfo()}
                        {this.createC4Info()}
                        {this.createItemInfo()}
                    </div>
                </div>
                <div className={classNames.kdaWrapper} data-show-kda={this.props.showKda}>
                    <Kda {...this.props.kda} className={classNames.kda} />
                </div>
            </div>
        );
    }
}

export {
    Player as Component,
    PlayerProps as Props,
};
