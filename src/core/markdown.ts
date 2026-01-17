import { TransformerCollection } from "../types/transformer";

const transformers: TransformerCollection = {
    removeBold: {
        description: 'Remove all bold from the text',
        callback: (str: string) => {
            return str.replace(/\*\*(.*?)\*\*/g, '$1');
        }
    },
    removeDashedLines: {
        description: 'Remove all 3 dashes lines from the text',
        callback: (str: string) => {
            return str.replace(/^-{3,}$/gm, '');
        }
    },
}

function all(text: string) {
    if (!text) return text;

    for (const key in transformers) {
        const transformer = transformers[key];
        if (transformer) text = transformer.callback(text);
    }

    text = text.trim();

    return text;
}

export default { all };