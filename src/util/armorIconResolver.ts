export namespace ArmorIconResolver {
    export const resolve = (info: { hasHelmet: boolean, armor: number }): string | null => {
        if (info.hasHelmet && info.armor > 0) {
            return require("../resources/armors/helmet.png");
        } else if (info.armor > 0) {
            return require("../resources/armors/armor.png");
        } else {
            return require("../resources/armors/armor.png");
        }
    };
}
