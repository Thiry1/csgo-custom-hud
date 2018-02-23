import * as React from "react";
export interface PlayerProps {

}
/**
 * プレイヤーコンポーネント
 * @param  {PlayerProps} props
 */
export const Player: React.StatelessComponent<PlayerProps> = (props: PlayerProps) => {
    return <span>hi</span>;
};

export {
    Player as Component,
    PlayerProps as Props,
};
