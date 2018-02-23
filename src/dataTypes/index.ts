export namespace GameStateIntegration {
    /**
     * SteamID.
     * @example "76561198005627722"
     */
    export type SteamId = string;

    export interface Provider {
        /**
         * ゲーム名.
         */
        name: string;
        /**
         * app ID.
         */
        appid: number;
        /**
         * バージョン(多分ゲームの).
         */
        version: number;
        /**
         * SteamID.
         */
        steamid: SteamId;
        /**
         * タイムスタンプ(unixtime).
         */
        timestamp: number;
    }
    export enum GamePhase {
        warmup = "warmup",
        live = "live",
        intermission = "intermission",
        gameover = "gameover",
    }
    export enum RoundPhase {
        freezetime = "freezetime",
        live = "live",
        over = "over",
    }
    export enum CurrentPhase {
        freezetime = "freezetime",
        live = "live",
        over = "over",
        bomb = "bomb",
        defuse = "defuse",
    }
    export enum BombState {
        "exploded" = "exploded",
        "defused" = "defused",
        "planted" = "planted",
    }
    export enum Team {
        T = "T",
        CT = "CT",
    }
    export interface WeaponInfo {
        /**
         * 武器名.
         * weapon_*.
         * TODO: enum で定義する.
         */
        name: string;
        /**
         * 分からん.
         */
        paintkit: "default" | string;
        /**
         * 武器の種類.
         */
        type: "Knife" | "Rifle" | "SniperRifle" | "Grenade" | "Pistol" | "Shotgun" | string;
        /**
         * 現在装填されている弾の数.
         */
        ammo_clip: number;
        /**
         * 装填できる弾の最大数.
         */
        ammo_clip_max: number;
        /**
         * 装填されていない弾の数.
         */
        ammo_reserve: number;
        /**
         * 武器の状態.
         * active = アクティブウェポン.
         */
        state: "active" | "holstered" | string;
    }
    export interface TeamState {
        /**
         * 進行中のゲームで勝ったラウンド数.
         */
        score: number;
        /**
         * タイムアウトの残り回数.
         */
        timeouts_remaining: number;
        /**
         * boX(bo3, bo5) で何試合勝っているか.
         */
        matches_won_this_series: number;
    }
    export interface Map {
        /**
         * ゲームモード.
         * 全部網羅できなかったので一部だけ列挙.
         */
        mode: "competitive" | "deathmatch" | string;
        /**
         * マップ名
         * @example de_dust2
         */
        name: string;
        /**
         * ゲーム全体のフェーズ.
         */
        phase: GamePhase;
        /**
         * 現在のラウンド数.
         */
        round: number; // 0 - 15
        /**
         * CT のステータス.
         */
        team_ct: TeamState;
        /**
         * T のステータス.
         */
        team_t: TeamState;
        /**
         * boX(bo3, bo5) で何試合先取すれば勝ちか,
         */
        num_matches_to_win_series: number;
        /**
         * 観戦者数
         */
        current_spectators: number;
        /**
         * 記念箱のドロップ数.
         */
        souvenirs_total: number;
    }
    export interface Round {
        phase: RoundPhase;
        win_team?: Team;
        bomb: BombState | null;
    }
    export interface PlayerState {
        /**
         * health.
         * 0 - 100 の数値.
         */
        health: number;
        /**
         * kevlar.
         * 0 - 100 の数値.
         */
        armor: number;
        /**
         * ヘルメットを装着しているか.
         */
        helmet: boolean;
        /**
         * flash bang をくらっているレベル.
         * 0 - 255 の数値.
         * 高いほど真っ白？.
         */
        flashed: number;
        /**
         * smoke をくらっているレベル.
         * 0 - 255 の数値.
         * 高いほど煙の中心？.
         */
        smoked: number;
        /**
         * molotov をくらっているレベル.
         * 0 - 255 の数値.
         * 高いほど炎の中心？.
         */
        burning: number;
        /**
         * 所持金.
         */
        money: number;
        /**
         * このラウンド内での kill 数.
         */
        round_kills: number;
        /**
         * このラウンド内での head shot での kill 数.
         */
        round_killhs: number;
        /**
         * 装備品の合計金額.
         */
        equip_value: number;
    }
    export interface PlayerMatchStats {
        /**
         * キル数.
         */
        kills: number;
        /**
         * アシスト数.
         */
        assists: number;
        /**
         * デス数.
         */
        deaths: number;
        /**
         * MVP 数.
         */
        mvps: number;
        /**
         * スコア.
         */
        score: number;
    }
    /**
     * 観戦者が観戦中のプレイヤーのステータス.
     */
    export interface SpectatingPlayer {
        /**
         * Steam ID.
         */
        steamid: SteamId;
        /**
         * 分からん.
         */
        observer_slot: number;
        /**
         * 所属チーム.
         */
        team: Team;
        /**
         * アクティビティ.
         */
        activity: "playing" | string;
        /**
         * ステート.
         */
        state: PlayerState;
    }

    /**
     * プレイヤーのステータス.
     */
    export interface Player extends SpectatingPlayer {
        match_stats: PlayerMatchStats;
        /**
         * 装備中の武器.
         */
        weapons: {
            [slotId: string]: WeaponInfo;
        };
        /**
         * プレイヤーの位置.
         * x, y, z 形式.
         * @example -1478.08, 2743.98, 11.24
         */
        position: string;
    }
    export interface PhaseCountDowns {
        /**
         * 現在のフェーズ.
         */
        phase: CurrentPhase;
        /**
         * フェーズが終了するまでの秒数.
         * 小数点一桁まで表現された文字列.
         */
        phase_ends_in: string;
    }
}
export interface GameStateIntegrationResponse {
    /**
     * プロバイダー.
     * GSI でデータを送信している人の情報.
     */
    provider: GameStateIntegration.Provider;
    /**
     * マップ.
     */
    map: GameStateIntegration.Map;
    /**
     * ラウンド.
     */
    round: GameStateIntegration.Round;
    /**
     * 観戦者が観戦中のプレイヤーのステータス.
     */
    player: GameStateIntegration.SpectatingPlayer;
    /**
     * 全てのプレイヤーのステータス.
     */
    allplayers: {
        [steamId: string]: GameStateIntegration.Player;
    }[];
    /**
     * 現在のフェーズ.
     */
    phase_countdowns: GameStateIntegration.PhaseCountDowns;
    /**
     * 一つ前の状態を表しているはずだが、色々入ってくるので型定義を諦めた.
     * 使うことないはず...
     */
    previously: any;
}
