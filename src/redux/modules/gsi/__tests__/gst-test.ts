import { loadFixture } from "../../../../../test/util/loadFixture";
import { initialState, reducer } from "../gsi";
import { setGsiPayload } from "../../actions";

describe("gsi", () => {
    it("received payload can set to state", () => {
        const payload = JSON.parse(loadFixture("c4Planted.json"));
        expect(reducer(initialState, setGsiPayload(payload))).toEqual(payload);
        const payload2 = JSON.parse(loadFixture("c4Refusing.json"));
        expect(reducer(payload, setGsiPayload(payload2))).toEqual(payload2);
    });
});
