// src/core/format.js

const allFormaters = {
    removeEmojis: {
        description: 'Remove all emojis from the text',
        callback: (str) => {
            return str.replace(/\p{Extended_Pictographic}/gu, '');
        }
    },
    normalizeQuotes: {
        description: 'Normalize quotes',
        callback: (str) => {
            return str
                .replace(/[“”]/g, '"')
                .replace(/[‘’]/g, "'")
        }
    },
    normalizeSpecialCharacters: {
        description: 'Normalize special characters',
        callback: (str) => {
            return str
                .replace(/—/g, '-')
                .replace(/…/g, '...')
                .replace(/œ/g, 'oe')
                .replace(/→/g, '->');
        }
    },
    removeDoubleSpaces: {
        description: 'Remove all double spaces from the text',
        callback: (str) => {
            return str.replace(/\s{2,}/g, ' ');
        }
    },
    removeDoubleNewLines: {
        description: 'Remove all double new lines from the text',
        callback: (str) => {
            return str.replace(/\n{2,}/g, '\n');
        }
    },
    normalizeSentenceEnd: {
        description: 'Remove all spaces before end of sentence punctuation',
        callback: (str) => {
            return str.replace(/\s+([.!?])/g, '$1');
        }
    },
};

function all(text) {
    if (typeof text !== 'string') throw new Error('text must be a string');
    if (!text) return text;

    for (const key in allFormaters) {
        text = allFormaters[key].callback(text);
    }

    text = text.trim();

    return text;
}

module.exports = { all };