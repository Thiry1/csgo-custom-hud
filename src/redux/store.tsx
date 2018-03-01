import createSagaMiddleware, { END, Task } from "redux-saga";
import { applyMiddleware, compose, createStore as store, Middleware, Store } from "redux";
import { reducer } from "./modules/index";
const sagaMiddleware = createSagaMiddleware();
export const createStore = (...middlewares: Middleware[]): SagaStore => {
    const reduxStore = store(reducer, undefined, compose(applyMiddleware(...[...middlewares, sagaMiddleware])));
    return {
        dispatch: reduxStore.dispatch,
        getState: reduxStore.getState,
        replaceReducer: reduxStore.replaceReducer,
        subscribe: reduxStore.subscribe,
        runSaga: sagaMiddleware.run,
        close: () => reduxStore.dispatch(END)
    };
};

export interface SagaStore extends Store<any> {
    runSaga: (saga: () => any) => Task;
    close: () => void;
}