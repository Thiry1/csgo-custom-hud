import { Action, createAction as createActionOriginal } from "redux-actions";

export function createAction<T extends void>(name: string): () => Action<void>;
export function createAction<T>(name: string): (arg: T) => Action<T>;
export function createAction<T>(name: string): (arg?: T) => Action<T> {
    return createActionOriginal<T>(name);
}