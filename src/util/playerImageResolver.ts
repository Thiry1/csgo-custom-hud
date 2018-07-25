export namespace PlayerImageResolver {
    export const resolve = (name: string): string | null => {
        if (!name || name.trim() === "") {
            return null;
        }
        return require(`../resources/players/${name}`);
    };
}
