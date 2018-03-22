import * as React from "react";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { BaseComponent } from "../util/baseComponent";
import { WeaponInfo } from "../../redux/modules/players/players";
import { MiscIconResolver } from "../../util/miscIconResolver";
import { ArmorIconResolver } from "../../util/armorIconResolver";
import { WeaponIconResolver } from "../../util/weaponIconResolver";
const classNames = require("./spectating_player.scss");
export interface SpectatingPlayerProps {
    /**
     * 観戦中のプレイヤー情報を表示するか.
     */
    showSpectatingPlayer: boolean;
    /**
     * プレイヤー名.
     */
    name: string;
    /**
     * アクティブ武器.
     */
    activeWeapon: WeaponInfo;
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
     * キル数.
     */
    kill: number;
    /**
     * デス数.
     */
    death: number;
    /**
     * アシスト数.
     */
    assist: number;
    /**
     * チーム.
     */
    team: Team;
}
const createHighExplosiveAmountInfo = (props: SpectatingPlayerProps): JSX.Element => {
    if (props.highExplosiveAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("hegrenade")}
        />
    );
};
const createSmokeAmountInfo = (props: SpectatingPlayerProps): JSX.Element => {
    if (props.smokeAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("smokegrenade")}
        />
    );
};
const createIncGrenadeAmountAmountInfo = (props: SpectatingPlayerProps): JSX.Element => {
    if (props.incGrenadeAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("incgrenade")}
        />
    );
};
const createMolotovAmountInfo = (props: SpectatingPlayerProps): JSX.Element => {
    if (props.molotovAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("molotov")}
        />
    );
};
const createDecoyAmountInfo = (props: SpectatingPlayerProps): JSX.Element => {
    if (props.molotovAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("decoy")}
        />
    );
};
const createFlashBangAmountInfo = (props: SpectatingPlayerProps): JSX.Element[] => {
    if (props.flashBangAmount === 0) {
        return null;
    }
    return [...Array(props.flashBangAmount).keys()].map(key => (
        <img
            src={WeaponIconResolver.resolve("flashbang")}
            key={key}
        />
    ));
};
/**
 * 観戦中のプレイヤーコンポーネント
 * @param  {SpectatingPlayerProps} props
 */
export class SpectatingPlayer extends BaseComponent<SpectatingPlayerProps, {}> {
    private createArmorInfo = (): JSX.Element[] => {
        if (this.props.armor === 0) {
            return null;
        }
        return [
            <img
                src={ArmorIconResolver.resolve({
                    hasHelmet: this.props.hasHelmet,
                    armor: this.props.armor,
                })}
                className={classNames.armorIcon}
                key="armorIcon"
            />,
            <span className={classNames.armor} key="armor">{this.props.armor}</span>,
        ];
    };
    private createAmmoInfo = (): JSX.Element => {
        if (this.props.activeWeapon.type === "Knife") {
            // TODO: null返す.floatやめたい
            return <div className={classNames.ammo} />;
        }
        const clip = this.props.activeWeapon.type !== "Grenade"
            ? this.props.activeWeapon.ammoClip
            : this.props.activeWeapon.ammoReserve; // Grenade の場合は clip が取れない.
        return (
            <div className={classNames.ammo}>
                <span className={classNames.clip}>{clip}</span>
                <span className={classNames.separator}>/</span>
                <span className={classNames.reserve}>{this.props.activeWeapon.ammoReserve}</span>
            </div>
        );
    };
    render() {
        if (!this.props.name) {
            return null;
        }
        return (
            <div
                className={classNames.spectatingPlayer}
                data-show-spectating-player={this.props.showSpectatingPlayer}
            >
                <div className={classNames.mainInfo}>
                    <p
                        className={classNames.name}
                        data-team={this.props.team}
                    >
                        {this.props.name}
                    </p>
                    {this.createAmmoInfo()}
                    <div className={classNames.healthArmor}>
                        <img src={MiscIconResolver.resolve("health")} className={classNames.healthIcon} />
                        <span className={classNames.health}>{this.props.health}</span>
                        {this.createArmorInfo()}
                    </div>
                </div>
                <div
                    className={classNames.subInfo}
                    data-team={this.props.team}
                >
                    <div className={classNames.kda}>
                        <span className={classNames.kill}>{this.props.kill} K</span>
                        <span className={classNames.kdaSeparator}>/</span>
                        <span className={classNames.assist}>{this.props.assist} A</span>
                        <span className={classNames.kdaSeparator}>/</span>
                        <span className={classNames.death}>{this.props.death} D</span>
                    </div>
                    <div className={classNames.grenadesInfo}>
                        {createHighExplosiveAmountInfo(this.props)}
                        {createSmokeAmountInfo(this.props)}
                        {createFlashBangAmountInfo(this.props)}
                        {createMolotovAmountInfo(this.props)}
                        {createIncGrenadeAmountAmountInfo(this.props)}
                        {createDecoyAmountInfo(this.props)}
                    </div>
                </div>
            </div>
        );
    }
}
