// src/core/typos.js

const randomBool = require('../helpers/randomBool');
const randomLetter = require('../helpers/randomLetter');
const randomInt = require('../helpers/randomInt');
const keyboardMaps = require('../data/keyboardMaps.json');

const allTypes = {
    random: {
        callback: (letters, i) => {
            letters[i] = randomLetter();
        }
    },
    swap: {
        callback: (letters, i) => {
            if (i < letters.length - 1) {
                const temp = letters[i];
                letters[i] = letters[i + 1];
                letters[i + 1] = temp;
            }
        }
    },
    map: {
        callback: (letters, i, keyboard) => {
            const keyboardMap = keyboardMaps[keyboard];
            const letterToFind = letters[i].toLowerCase();

            if (!keyboardMap) {
                console.warn(`Keyboard layout "${keyboard}" not found.`);
                return;
            }
            if (!keyboardMap[letterToFind]) {
                return;
            }

            letters[i] = keyboardMap[letterToFind][randomInt(0, keyboardMap[letterToFind].length - 1)];
        }
    },
    drop: {
        callback: (letters, i) => {
            letters.splice(i, 1);
        }
    },
    duplicate: {
        callback: (letters, i) => {
            letters.splice(i, 0, letters[i]);
        }
    }
}

const defaultOptions = {
    types: {
        swap: 0.01, // percentage of letters to be swapped with the next letter
        map: 0.02, // percentage of letters to be replaced with a letter from the keyboard map
        duplicate: 0.02, // percentage of letters to be duplicated
        drop: 0.02, // percentage of letters to be deleted
    },
    keyboard: 'azerty', // keyboard layout to use
};

/**
* Function to make typos in a given text based on the specified options.
* @param {string} text - The text to be modified.
* @param {object} options - The options for the function.
* @returns {string} - The modified text.
*/
function make(text = '', options = {}) {
    if (typeof text !== 'string') throw new Error('text must be a string');
    if (text.length === 0) return text;

    // Types validation
    const types = options?.types || defaultOptions.types; // random, swap or map
    if (typeof types !== 'object') throw new Error('Types must be an object');
    if (types.length === 0) throw new Error('Types array must not be empty');
    for (const [type, percentage] of Object.entries(types)) {
        if (!allTypes[type]) throw new Error(`Type "${type}" is not a valid type`);
        if (typeof percentage !== 'number') throw new Error(`Type "${type}" must be a number`);
        if (percentage < 0 || percentage > 1) throw new Error(`Type "${type}" must be between 0 and 1`);
        if (percentage === 0) delete types[type]; // remove type if percentage is 0
    }

    // Keyboard validation
    const keyboard = options?.keyboard || defaultOptions.keyboard; // azerty, qwerty, dvorak
    if (typeof keyboard !== 'string') throw new Error('Keyboard must be a string');
    if (keyboard.length === 0) throw new Error('Keyboard must not be empty');
    if (!keyboardMaps[keyboard]) throw new Error(`Keyboard layout "${keyboard}" not found.`);

    let replaced = 0;
    const letters = text.split('');

    for (let i = 0; i < letters.length; i++) {
        for (const [type, percentage] of Object.entries(types)) {
            if (randomBool(percentage)) {
                allTypes[type].callback(letters, i, keyboard);
                replaced++;
            }
        }

        if (replaced >= letters.length) break;
    }

    text = letters.join('')

    return text
}

module.exports = { allTypes, defaultOptions, make };