import * as fs from "fs";

/**
 * load file as string
 */
export const loadFixture = (path: string, basePath: string = "test/fixtures/"): string => fs.readFileSync(basePath + path, "utf8");
