import * as React from "react";
export class BaseComponent<P, S> extends React.Component<P, S> {

    private previousProps: string;
    private previousState: string;

    shouldComponentUpdate(nextProps: P, nextState: S) {
        const stringifiedNextProps = JSON.stringify(nextProps);
        const stringifiedNextState = JSON.stringify(nextState);

        const hasDifference =
            this.previousProps !== stringifiedNextProps || this.previousState !== stringifiedNextState;

        if (hasDifference) {
            this.previousProps = stringifiedNextProps;
            this.previousState = stringifiedNextState;
        }

        return hasDifference;
    }
}
