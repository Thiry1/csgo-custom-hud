export namespace TeamLogoResolver {
    export const resolve = (name: string): string | null => {
        if (!name || name.trim() === "") {
            return null;
        }
        return require(`../resources/teams/${name}`);
    };
}
