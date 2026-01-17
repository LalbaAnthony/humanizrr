// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback<T extends any[], R> = (...args: T) => R;


export interface Transformer {
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: Callback<any[], any>;
}

export interface TransformerCollection {
    [key: string]: Transformer;
}