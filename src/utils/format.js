// src/utils/format.js

const allFormaters = {
    removeEmojis: {
        callback: (str) => {
            return str.replace(/\p{Extended_Pictographic}/gu, '');
        }
    }
}

function removeEmojis(text) {
    if (typeof text !== 'string') throw new Error('text must be a string');
    if (!text) return text;

    return allFormaters.removeEmojis.callback(text);
}

function all(text) {
    if (typeof text !== 'string') throw new Error('text must be a string');
    if (!text) return text;

    for (const key in allFormaters) {
        text = allFormaters[key].callback(text);
    }

    return text;
}

module.exports = { removeEmojis, all };