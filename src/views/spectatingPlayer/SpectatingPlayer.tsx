import * as React from "react";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { BaseComponent } from "../util/baseComponent";
import { WeaponInfo } from "../../redux/modules/players/players";
import { MiscIconResolver } from "../../util/miscIconResolver";
import { ArmorIconResolver } from "../../util/armorIconResolver";
import { WeaponIconResolver } from "../../util/weaponIconResolver";
import { PlayerImageResolver } from "../../util/playerImageResolver";
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
     * Twitter ID.
     */
    twitterId?: string;
    /**
     * player の画像.
     */
    image: string;
    /**
     * image_inline: Display the image inline or above the bar
     */
    imageInline?: boolean;
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
    private createAmmoInfo = (): JSX.Element => {
        if (this.props.activeWeapon.type === "Knife"
            || this.props.activeWeapon.type === "C4"
            || this.props.activeWeapon.type === "Grenade") {
            // TODO: null返す.floatやめたい
            return <div className={classNames.ammo} data-team={this.props.team} />;
        }

        return (
            <div className={classNames.ammo} data-team={this.props.team}>
                <span className={classNames.clip}>{this.props.activeWeapon.ammoClip}</span>
                <span className={classNames.separator} data-team={this.props.team}>/</span>
                <span className={classNames.reserve} data-team={this.props.team}>{this.props.activeWeapon.ammoReserve}</span>
            </div>
        );
    };

    private createPlayerInfo = (): JSX.Element => {
        if (!this.props.twitterId) {
            return <p className={classNames.twitterId} data-team={this.props.team} />;
        }
        return (
            <p className={classNames.twitterId} data-team={this.props.team}>{this.props.twitterId}</p>
        );
    };

    render() {
        if (!this.props.name) {
            return null;
        }
        const playerImage = PlayerImageResolver.resolve(this.props.image);
        return (
            <div
                className={classNames.spectatingPlayer}
                data-show-spectating-player={this.props.showSpectatingPlayer}
                data-has-player-image={playerImage !== null}
                data-display-inline={this.props.imageInline}
            >
                <div className={classNames.mainInfo}>
                    {playerImage &&
                        <img
                            src={playerImage}
                            className={classNames.playerImage}
                            data-team={this.props.team}
                            data-display-inline={this.props.imageInline}
                        />
                    }
                    <div className={classNames.playerNames}>
                        <p className={classNames.name} data-team={this.props.team}>{this.props.name}</p>
                        {this.createPlayerInfo()}
                    </div>
                    <div className={classNames.kda}>
                        <span className={classNames.kdaSeparator} data-team={this.props.team}>K</span>
                        <span className={classNames.kill}>{this.props.kill}</span>
                        <span className={classNames.kdaSeparator} data-team={this.props.team}>A</span>
                        <span className={classNames.assist}>{this.props.assist}</span>
                        <span className={classNames.kdaSeparator} data-team={this.props.team}>D</span>
                        <span className={classNames.death}>{this.props.death}</span>
                    </div>
                </div>
                <div className={classNames.subInfo} data-team={this.props.team}>
                    <div className={classNames.healthArmor} data-team={this.props.team}>
                        <img src={MiscIconResolver.resolve("health")} className={classNames.healthIcon} />
                        <span className={classNames.health}>{this.props.health}</span>
                        <img src={ArmorIconResolver.resolve({ hasHelmet: this.props.hasHelmet, armor: this.props.armor })}
                            className={classNames.armorIcon} />
                        <span className={classNames.armor}>{this.props.armor}</span>
                    </div>
                    <div className={classNames.grenadesInfo}>
                        {createHighExplosiveAmountInfo(this.props)}
                        {createSmokeAmountInfo(this.props)}
                        {createFlashBangAmountInfo(this.props)}
                        {createMolotovAmountInfo(this.props)}
                        {createIncGrenadeAmountAmountInfo(this.props)}
                        {createDecoyAmountInfo(this.props)}
                    </div>
                    {this.createAmmoInfo()}
                </div>
            </div>
        );
    }
}
