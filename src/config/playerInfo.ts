export interface PlayerInfo {
    /**
     * TwitterID.
     */
    twitterId?: string;
    /**
     * Player image.
     */
    image?: string;
}
export interface PlayerInfoList {
    [steamId: string]: PlayerInfo;
}
export const playerInfoList: PlayerInfoList = {
    // `76561198005627722` is Steam ID.
    "76561198005627722": {
        twitterId: "@thiry_sk",
        image: "shroud.jpg",
    },
};
