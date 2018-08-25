export namespace PlayerImageResolver {
    export const resolve = (name: string): string | null => {
        if (!name || name.trim() === "") {
            return require(`../resources/players/noimage.png`);
        }
        return require(`../resources/players/${name}`);
    };
}
