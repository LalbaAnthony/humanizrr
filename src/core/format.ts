import { TransformerCollection } from "../types/transformer";

const transformers: TransformerCollection = {
    removeEmojis: {
        description: 'Remove all emojis from the text',
        callback: (str: string) => {
            return str.replace(/\p{Extended_Pictographic}/gu, '');
        }
    },
    normalizeQuotes: {
        description: 'Normalize quotes',
        callback: (str: string) => {
            return str
                .replace(/[“”]/g, '"')
                .replace(/[‘’]/g, "'")
        }
    },
    normalizeSpecialCharacters: {
        description: 'Normalize special characters',
        callback: (str: string) => {
            return str
                .replace(/—/g, '-')
                .replace(/…/g, '...')
                .replace(/œ/g, 'oe')
                .replace(/→/g, '->');
        }
    },
    removeDoubleSpaces: {
        description: 'Remove all double spaces from the text',
        callback: (str: string) => {
            return str.replace(/\s{2,}/g, ' ');
        }
    },
    removeDoubleNewLines: {
        description: 'Remove all double new lines from the text',
        callback: (str: string) => {
            return str.replace(/\n{2,}/g, '\n');
        }
    },
    normalizeSentenceEnd: {
        description: 'Remove all spaces before end of sentence punctuation',
        callback: (str: string) => {
            return str.replace(/\s+([.!?])/g, '$1');
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