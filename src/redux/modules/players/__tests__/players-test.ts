import { isPrimary, parseWeapons } from "../players";
import { GameStateIntegration } from "../../../../dataTypes";
import WeaponType = GameStateIntegration.WeaponType;
const humps = require("lodash-humps");
describe("players", () => {
    describe("isPrimary", () => {
        it("return true if primary weapon given", () => {
            expect(isPrimary(WeaponType.Rifle)).toBe(true);
            expect(isPrimary(WeaponType.SniperRifle)).toBe(true);
            expect(isPrimary(WeaponType.Shotgun)).toBe(true);
            expect(isPrimary(WeaponType.MachineGun)).toBe(true);
            expect(isPrimary(WeaponType.SubmachineGun)).toBe(true);
        });
        it("return false if non primary weapon given", () => {
            expect(isPrimary(WeaponType.Knife)).toBe(false);
            expect(isPrimary(WeaponType.Grenade)).toBe(false);
            expect(isPrimary(WeaponType.Pistol)).toBe(false);
            expect(isPrimary(WeaponType.C4)).toBe(false);
        });
    });
    describe("parseWeapons", () => {
        it("should return expected value", () => {
            const payload: { [slotId: string]: GameStateIntegration.WeaponInfo } = {
                "weapon_0": {
                    "name": "weapon_knife",
                    "paintkit": "default",
                    "type": "Knife" as WeaponType,
                    "state": "holstered",
                },
                "weapon_1": {
                    "name": "weapon_hkp2000",
                    "paintkit": "default",
                    "type": "Pistol" as WeaponType,
                    "ammo_clip": 13,
                    "ammo_clip_max": 13,
                    "ammo_reserve": 52,
                    "state": "holstered",
                },
                "weapon_2": {
                    "name": "weapon_nova",
                    "paintkit": "default",
                    "type": "Shotgun" as WeaponType,
                    "ammo_clip": 8,
                    "ammo_clip_max": 8,
                    "ammo_reserve": 32,
                    "state": "active",
                },
                "weapon_3": {
                    "name": "weapon_hegrenade",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_4": {
                    "name": "weapon_molotov",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_5": {
                    "name": "weapon_flashbang",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 2,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_6": {
                    "name": "weapon_decoy",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_7": {
                    "name": "weapon_smokegrenade",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_8": {
                    "name": "weapon_incgrenade",
                    "paintkit": "default",
                    "type": "Grenade" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
                "weapon_9": {
                    "name": "weapon_c4",
                    "paintkit": "default",
                    "type": "C4" as WeaponType,
                    "ammo_clip": 1,
                    "ammo_clip_max": 1,
                    "ammo_reserve": 1,
                    "state": "holstered",
                },
            };
            expect(parseWeapons(payload)).toEqual({
                activeWeapon: humps(payload.weapon_2),
                primary: humps(payload.weapon_2),
                secondary: humps(payload.weapon_1),
                highExplosiveAmount: payload.weapon_3.ammo_reserve,
                molotovAmount: payload.weapon_4.ammo_reserve,
                flashBangAmount: payload.weapon_5.ammo_reserve,
                decoyAmount: payload.weapon_6.ammo_reserve,
                smokeAmount: payload.weapon_7.ammo_reserve,
                incGrenadeAmount: payload.weapon_8.ammo_reserve,
                hasC4: true,
            });
        });
    });
});
