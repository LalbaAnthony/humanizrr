import path from 'path'
import fs from 'fs'
import randomBool from '../helpers/randomBool';
import randomInt from '../helpers/randomInt';
import randomLetter from '../helpers/randomLetter';
import { KeyboardLayout } from '../types/keyboard';
import { TransformerCollection } from '../types/transformer';

export interface TyposOptions {
    types?: {
        [key: string]: number; // percentage of letters to be affected by the typo type
    };
    keyboard?: {
        layout: KeyboardLayout; // keyboard layout to use
    }
}

const parseKeyboardMap = (layout: KeyboardLayout) => {
    const filePath = path.resolve(__dirname, `../data/keyboard/${layout}.json`)
    console.log(filePath);
    if (!fs.existsSync(filePath)) throw new Error(`Keyboard layout file "${layout}.json" not found.`)

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    if (!Array.isArray(data)) return {}

    return data
}

const keyboardMaps: { [key in KeyboardLayout]?: { [key: string]: string[] } } = {
    qwerty: parseKeyboardMap('qwerty'),
    azerty: parseKeyboardMap('azerty'),
};

const transformers: TransformerCollection = {
    random: {
        description: 'Replace the letter with a random letter',
        callback: (letters: string[], i: number) => {
            letters[i] = randomLetter();
        }
    },
    swap: {
        description: 'Swap the letter with the next letter',
        callback: (letters: string[], i: number) => {
            if (i < letters.length - 1) {
                if (!letters[i + 1]) return;
                if (!letters[i]) return;

                const temp = letters[i];
                letters[i] = letters[i + 1] as string;
                letters[i + 1] = temp;
            }
        }
    },
    map: {
        description: 'Map the letter to a different letter based on the keyboard layout',
        callback: (letters: string[], i: number, layout: KeyboardLayout) => {
            if (!letters[i]) return;

            const keyboardMap = keyboardMaps[layout];
            const letterToFind = letters[i].toLowerCase();

            if (!keyboardMap) {
                console.warn(`Keyboard layout "${layout}" not found.`);
                return;
            }
            if (!keyboardMap[letterToFind]) {
                return;
            }

            const newLetter = keyboardMap[letterToFind][randomInt(0, keyboardMap[letterToFind].length - 1)];
            if (!newLetter) return;

            // Preserve case
            if (letters[i] === letters[i].toUpperCase()) {
                letters[i] = newLetter.toUpperCase();
            } else {
                letters[i] = newLetter;
            }
        }
    },
    drop: {
        description: 'Remove the letter',
        callback: (letters: string[], i: number) => {
            letters.splice(i, 1);
        }
    },
    duplicate: {
        description: 'Duplicate the letter',
        callback: (letters: string[], i: number) => {
            if (!letters[i]) return;
            letters.splice(i, 0, letters[i]);
        }
    }
}

const defaultKeyboardLayout: KeyboardLayout = 'qwerty';

const defaultOptions: TyposOptions = {
    types: {
        swap: 0.01, // percentage of letters to be swapped with the next letter
        map: 0.02, // percentage of letters to be replaced with a letter from the keyboard map
        duplicate: 0.02, // percentage of letters to be duplicated
        drop: 0.02, // percentage of letters to be deleted
    },
    keyboard: {
        layout: defaultKeyboardLayout, // keyboard layout to use
    }
};


function make(text: string = '', options: TyposOptions = {}) {
    if (text.length === 0) return text;

    // Merge options with default options
    options = {
        ...defaultOptions,
        ...options
    };

    // Types validation
    if (options?.types) {
        if (Object.keys(options.types).length === 0) throw new Error('Types must not be empty');
        for (const [type, percentage] of Object.entries(options.types)) {
            if (!transformers[type]) throw new Error(`Type "${type}" is not a valid type`);
            if (percentage < 0 || percentage > 1) throw new Error(`Type "${type}" must be between 0 and 1`);
            if (percentage === 0) delete options.types[type]; // remove type if percentage is 0
        }
    }

    // Keyboard validation
    if (options?.keyboard) {
        if (!options.keyboard.layout) throw new Error('Keyboard layout must be specified');
        if (!keyboardMaps[options.keyboard.layout]) throw new Error(`Keyboard layout "${options.keyboard.layout}" not found`);
    }

    let replaced = 0;
    const letters: string[] = text.split('');

    for (let i = 0; i < letters.length; i++) {
        if (!options.types || Object.keys(options.types).length === 0) break;

        for (const [type, percentage] of Object.entries(options.types)) {
            if (randomBool(percentage)) {
                if (!transformers[type]) throw new Error(`Type "${type}" is not a valid type`);

                transformers[type].callback(letters, i, options.keyboard?.layout ?? defaultKeyboardLayout);
                replaced++;
            }
        }

        if (replaced >= letters.length) break;
    }

    text = letters.join('');

    return text;
}

export default { make };