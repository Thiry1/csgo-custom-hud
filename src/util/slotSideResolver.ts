export enum SlotSide {
    Left = "left",
    Right = "right",
}
export namespace SlotSideResolver {
    export const resolve = (observerSlot: number): SlotSide => {
        // 1-5 === left
        // 0, 6-9 === Right
        return observerSlot !== 0 && observerSlot <= 5
            ? SlotSide.Left
            : SlotSide.Right;
    };
}
