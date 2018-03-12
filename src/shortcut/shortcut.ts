import { SagaStore } from "../redux/store";
import { swapTeamInfo } from "../redux/modules/actions";
declare const nw: any;
export const registerShortcut = (store: SagaStore) => {
    const swapTeamShortcut = new nw.Shortcut({
        key: "Alt+Left",
        active: () => store.dispatch(swapTeamInfo()),
        failed: (message: string) => console.error(message),
    });
    nw.App.registerGlobalHotKey(swapTeamShortcut);
};
