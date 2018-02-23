import * as React from "react";
import { KdaProps } from "../kda/Kda";
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
    }
    /**
     * 装備に使用した合計金額.
     */
    equipmentValue: number;
    /**
     * 装備に使用した合計金額を表示するか.
     */
    showEquipmentValue: boolean;
}
/**
 * プレイヤーコンポーネント
 * @param  {PlayerProps} props
 */
export const Player: React.StatelessComponent<PlayerProps> = (props: PlayerProps) => {
    return (
        <div data-is-alive={props.health !== 0}>

        </div>
    );
};

export {
    Player as Component,
    PlayerProps as Props,
};
