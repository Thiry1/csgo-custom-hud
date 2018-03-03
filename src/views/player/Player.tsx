import * as React from "react";
import { Kda, KdaProps } from "../kda/Kda";
import { GameStateIntegration } from "../../dataTypes";
import Team = GameStateIntegration.Team;
import { WeaponIconResolver } from "../../util/weaponIconResolver";
import { ArmorIconResolver } from "../../util/armorIconResolver";
import { MiscIconResolver } from "../../util/miscIconResolver";
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
}
const createHighExplosiveAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.highExplosiveAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("hegrenade")}
            data-active={"weapon_hegrenade" === props.weapon.activeWeapon}
        />
    );
};
const createSmokeAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.smokeAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("smokegrenade")}
            data-active={"weapon_smokegrenade" === props.weapon.activeWeapon}
        />
    );
};
const createIncGrenadeAmountAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.incGrenadeAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("incgrenade")}
            data-active={"weapon_incgrenade" === props.weapon.activeWeapon}
        />
    );
};
const createMolotovAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.molotovAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("molotov")}
            data-active={"weapon_molotov" === props.weapon.activeWeapon}
        />
    );
};
const createDecoyAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.molotovAmount === 0) {
        return null;
    }
    return (
        <img
            src={WeaponIconResolver.resolve("decoy")}
            data-active={"weapon_decoy" === props.weapon.activeWeapon}
        />
    );
};
const createFlashBangAmountInfo = (props: PlayerProps): JSX.Element[] => {
    if (props.weapon.flashBangAmount === 0) {
        return null;
    }
    return [...Array(props.weapon.flashBangAmount).keys()].map(key => (
        <img
            src={WeaponIconResolver.resolve("flashbang")}
            data-active={"weapon_flashbang" === props.weapon.activeWeapon}
        />
    ));
};
const createArmorInfo = (props: PlayerProps): JSX.Element => {
    const src = ArmorIconResolver.resolve({ hasHelmet: props.hasHelmet, armor: props.armor });
    if (!src) {
        return <span className={classNames.armor} data-team={props.team} />;
    }
    return (
        <span className={classNames.armor} data-team={props.team}>
            <img
                className={classNames.armorIcon}
                src={src}
                data-team={props.team}
            />
        </span>
    );
};
const createPrimaryWeaponInfo = (props: PlayerProps): JSX.Element => {
    if (!props.weapon.primary) {
        return null;
    }
    const src = WeaponIconResolver.resolve(props.weapon.primary);
    if (!src) {
        return null;
    }
    return (
        <span
            className={classNames.primaryWeapon}
            data-team={props.team}
        >
            <img
                className={classNames.primaryWeaponIcon}
                src={WeaponIconResolver.resolve(props.weapon.primary)}
                alt={props.weapon.primary}
                data-active={props.weapon.primary === props.weapon.activeWeapon}
                data-team={props.team}
            />
        </span>
    );
};
const createSecondaryWeaponInfo = (props: PlayerProps): JSX.Element => {
    if (!props.weapon.secondary) {
        return null;
    }
    const src = WeaponIconResolver.resolve(props.weapon.secondary);
    if (!src) {
        return null;
    }
    return (
        <img
            className={classNames.secondaryWeaponIcon}
            src={src}
            alt={props.weapon.secondary}
            data-active={props.weapon.secondary === props.weapon.activeWeapon}
        />
    );
};
const createRoundKillCountInfo = (props: PlayerProps): JSX.Element[] => {
    if (!props.roundKillCount) {
        return null;
    }
    return [
        <img
            className={classNames.killIcon}
            src={MiscIconResolver.resolve("death")}
            data-team={props.team}
        />,
        <span
            className={classNames.killCount}
            data-team={props.team}
        >
            {props.roundKillCount}
        </span>,
    ];
};
const createItemInfo = (props: PlayerProps): JSX.Element => {
    return (
        <div className={classNames.itemInfo} data-team={props.team}>
            {createSecondaryWeaponInfo(props)}
            {createRoundKillCountInfo(props)}
            {createHighExplosiveAmountInfo(props)}
            {createSmokeAmountInfo(props)}
            {createFlashBangAmountInfo(props)}
            {createMolotovAmountInfo(props)}
            {createIncGrenadeAmountAmountInfo(props)}
            {createDecoyAmountInfo(props)}
        </div>
    );
};
const createDefuseKitInfo = (props: PlayerProps): JSX.Element => {
    if (!props.hasDefuseKit) {
        return null;
    }
    return (
        <span className={classNames.defuseKit}>
            <img src={MiscIconResolver.resolve("defuseKit")} />
        </span>
    );
};
const createC4Info = (props: PlayerProps): JSX.Element => {
    if (!props.weapon.hasC4) {
        return null;
    }
    return (
        <span className={classNames.c4}>
            <img src={MiscIconResolver.resolve("c4")} />
        </span>
    );
};
/**
 * プレイヤーコンポーネント
 * @param  {PlayerProps} props
 */
export const Player: React.StatelessComponent<PlayerProps> = (props: PlayerProps): JSX.Element => {
    return (
        <div
            className={classNames.player}
            data-is-alive={props.health !== 0}
            data-team={props.team}
        >
            <div className={classNames.wrapper}>
                <div className={classNames.mainInfo}>
                    <span
                        className={classNames.healthBar}
                        data-team={props.team}
                        style={{ transform: `translate(-${100 - props.health}%, 0)` }} // TODO: animation
                    />
                    <span className={classNames.health} data-team={props.team}>{props.health}</span>
                    <span
                        className={classNames.name}
                        data-team={props.team}
                        data-is-alive={props.health !== 0}
                    >
                        {props.name}
                    </span>
                    {createPrimaryWeaponInfo(props)}
                </div>
                <div className={classNames.subInfo}>
                    {createArmorInfo(props)}
                    <span className={classNames.money} data-team={props.team}>${props.money}</span>
                    {createDefuseKitInfo(props)}
                    {createC4Info(props)}
                    {createItemInfo(props)}
                </div>
            </div>
            <div className={classNames.kdaWrapper}>
                {props.showKda && <Kda {...props.kda} className={classNames.kda} />}
            </div>
        </div>
    );
};

export {
    Player as Component,
    PlayerProps as Props,
};
