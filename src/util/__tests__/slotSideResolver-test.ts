import { SlotSide, SlotSideResolver } from "../slotSideResolver";

describe("slotSideResolver", () => {
    describe("resolve", () => {
        it("ObserverSlot is 0 or between 6 and 9, should return SlotSide.Right.", () => {
            for (const observerSlot of [0, 6, 7, 8, 9]) {
                expect(SlotSideResolver.resolve(observerSlot)).toBe(SlotSide.Right);
            }
        });
        it("ObserverSlot is between 1 and 5, should return SlotSide.Left.", () => {
            for (const observerSlot of [1, 2, 3, 4, 5]) {
                expect(SlotSideResolver.resolve(observerSlot)).toBe(SlotSide.Left);
            }
        });
    });
});
