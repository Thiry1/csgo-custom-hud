export namespace MiscIconResolver {
    export const resolve = (name: string): string | null => {
        const map: { [weaponName: string]: string } = {
            defuseKit: require("../resources/miscs/defuse.png"),
            c4: require("../resources/miscs/bomb.png"),
            death: require("../resources/miscs/death.png"),
            equipment: require("../resources/miscs/eq.png"),
            team: require("../resources/miscs/team.png"),
        };
        return map[name] || null;
    };
}
