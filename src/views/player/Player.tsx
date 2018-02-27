import * as React from "react";
import { Kda, KdaProps } from "../kda/Kda";
import { GameStateIntegration } from "../../dataTypes";
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
     * 所持中の武器.
     */
    weapon: {
        /**
         * アクティブウェポン.
         */
        activeWeapon?: string;
        /**
         * プライマリーウェポン.
         */
        primary?: string; // TODO 武器名 enum
        /**
         * セカンダリーウェポン.
         */
        secondary?: string; // TODO 武器名 enum
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
         * decoy の保有数.
         */
        decoyAmount: number;
    };
    // /**
    //  * 装備に使用した合計金額.
    //  */
    // equipmentValue: number;
    // /**
    //  * 装備に使用した合計金額を表示するか.
    //  */
    // showEquipmentValue: boolean;
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
        <span className={classNames.highExplosive}>{props.weapon.highExplosiveAmount}</span>
    );
};
const createSmokeAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.smokeAmount === 0) {
        return null;
    }
    return (
        <span className={classNames.smoke}>{props.weapon.smokeAmount}</span>
    );
};
const createMolotovAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.molotovAmount === 0) {
        return null;
    }
    return (
        <span className={classNames.molotov}>{props.weapon.molotovAmount}</span>
    );
};
const createDecoyAmountInfo = (props: PlayerProps): JSX.Element => {
    if (props.weapon.molotovAmount === 0) {
        return null;
    }
    return (
        <span className={classNames.decoy}>{props.weapon.decoyAmount}</span>
    );
};
const createFlashBangAmountInfo = (props: PlayerProps): JSX.Element[] => {
    if (props.weapon.flashBangAmount === 0) {
        return null;
    }
    return [...Array(props.weapon.flashBangAmount).keys()].map(key => (
        <span
            className={classNames.flashBang}
            key={key}
        >
            {props.weapon.flashBangAmount}
        </span>
    ));
};
const createArmorInfo = (props: PlayerProps): JSX.Element => {
    if (props.hasHelmet && props.armor > 0) {
        return <span className={classNames.armorWithHelmet} />;
    } else if (props.armor > 0) {
        return <span className={classNames.armor} />;
    }
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
            <div className={classNames.mainInfo}>
                <span
                    className={classNames.healthBar}
                    data-team={props.team}
                    style={{transform: `translate(-${100 - props.health}%, 0)`}} // TODO: animation
                />
                <span className={classNames.health}>{props.health}</span>
                <span className={classNames.name}>{props.name}</span>
                <span
                    className={classNames.primaryWeapon}
                    data-is-active={props.weapon.activeWeapon === props.weapon.primary}
                >
                    {props.weapon.primary}
                </span>
            </div>
            <div className={classNames.subInfo}>
                {createArmorInfo(props)}
                <span className={classNames.money}>{props.money}</span>
                <span className={classNames.roundKillCount}>{props.roundKillCount}</span>
                {createHighExplosiveAmountInfo(props)}
                {createSmokeAmountInfo(props)}
                {createFlashBangAmountInfo(props)}
                {createMolotovAmountInfo(props)}
                {createDecoyAmountInfo(props)}
                <span
                    className={classNames.secondaryWeapon}
                    data-is-active={props.weapon.activeWeapon === props.weapon.secondary}
                >
                    {props.weapon.secondary}
                </span>
            </div>
            {props.showKda && <Kda {...props.kda} />}
        </div>
    );
};

export {
    Player as Component,
    PlayerProps as Props,
};
