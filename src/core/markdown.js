// src/core/markdown.js

const allFormaters = {
    removeBoldMarkdown: {
        description: 'Remove all bold markdown from the text',
        callback: (str) => {
            return str.replace(/\*\*(.*?)\*\*/g, '$1');
        }
    },
    removeDashedLines: {
        description: 'Remove all 3 dashes lines from the text',
        callback: (str) => {
            return str.replace(/^-{3,}$/gm, '');
        }
    },
}

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