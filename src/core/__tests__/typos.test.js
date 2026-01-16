// src/core/__tests__/typos.test.js

const { allTypes, defaultOptions, make } = require('../typos');

// Mock des dépendances
jest.mock('../../helpers/randomBool');
jest.mock('../../helpers/randomLetter');
jest.mock('../../helpers/randomInt');

// Importer les mocks après les avoir définis avec jest.mock()
const randomBool = require('../../helpers/randomBool');
const randomLetter = require('../../helpers/randomLetter');
const randomInt = require('../../helpers/randomInt');

// Simuler keyboardMaps sans le charger réellement (pour éviter des problèmes potentiels)
jest.mock('../../data/keyboardMaps.json', () => ({
    azerty: {
        'a': ['q', 'z'],
        'b': ['v', 'n'],
        'c': ['x', 'v'],
        'd': ['s', 'f'],
        'e': ['z', 'r'],
        't': ['r', 'y']
    },
    qwerty: {
        'a': ['q', 'z'],
        'b': ['v', 'n'],
        'c': ['x', 'v'],
        'd': ['s', 'f'],
        'e': ['w', 'r'],
        't': ['r', 'y']
    }
}), { virtual: true });

describe('typos.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Configuration de base des mocks
        randomBool.mockReturnValue(false);
        randomLetter.mockReturnValue('x');
        randomInt.mockReturnValue(0);
    });

    describe('Fonction make - validation des entrées', () => {
        test('devrait retourner une chaîne vide si la chaîne d\'entrée est vide', () => {
            expect(make('')).toBe('');
        });

        test('devrait lever une erreur si le texte n\'est pas une chaîne', () => {
            expect(() => make(null)).toThrow('text must be a string');
            expect(() => make({})).toThrow('text must be a string');
        });

        test('devrait lever une erreur si types n\'est pas un objet', () => {
            expect(() => make('test', { types: 'invalid' })).toThrow('Types must be an object');
        });

        test('devrait lever une erreur si un type non valide est spécifié', () => {
            expect(() => make('test', { types: { invalid: 0.1 } })).toThrow('Type "invalid" is not a valid type');
        });

        test('devrait lever une erreur si le pourcentage d\'un type n\'est pas un nombre', () => {
            expect(() => make('test', { types: { swap: '0.1' } })).toThrow('Type "swap" must be a number');
        });

        test('devrait lever une erreur si le pourcentage d\'un type est en dehors de la plage [0, 1]', () => {
            expect(() => make('test', { types: { swap: 1.5 } })).toThrow('Type "swap" must be between 0 and 1');
            expect(() => make('test', { types: { swap: -0.1 } })).toThrow('Type "swap" must be between 0 and 1');
        });

        test('devrait lever une erreur si le clavier n\'est pas une chaîne', () => {
            expect(() => make('test', { keyboard: 123 })).toThrow('Keyboard must be a string');
        });

        test('devrait lever une erreur si la disposition de clavier n\'existe pas', () => {
            expect(() => make('test', { keyboard: 'invalid' })).toThrow('Keyboard layout "invalid" not found.');
        });
    });

    describe('Fonction make - comportement', () => {
        test('devrait retourner le texte inchangé si aucun type n\'est activé', () => {
            const text = 'exemple';
            expect(make(text, { types: { swap: 0, map: 0, duplicate: 0, drop: 0 } })).toBe(text);
        });

        test('devrait retourner le texte inchangé si randomBool renvoie toujours false', () => {
            randomBool.mockReturnValue(false);
            expect(make('test')).toBe('test');
        });
    });

    describe('Type: random', () => {
        test('devrait remplacer une lettre par une lettre aléatoire', () => {
            // Configurer randomBool pour qu'il retourne true seulement pour le premier caractère
            randomBool.mockImplementation((percentage) => {
                if (percentage === 0.1) return true;
                return false;
            });
            randomBool.mockReturnValueOnce(true).mockReturnValue(false);

            randomLetter.mockReturnValue('z');

            const result = make('test', { types: { random: 0.1 } });
            expect(result).toBe('zest');
            expect(randomLetter).toHaveBeenCalled();
        });
    });

    describe('Type: swap', () => {
        test('devrait échanger deux lettres adjacentes', () => {
            // Activer le swap uniquement pour le premier caractère
            randomBool.mockReturnValueOnce(true).mockReturnValue(false);

            const result = make('test', { types: { swap: 0.1 } });
            expect(result).toBe('etst');
        });
    });

    describe('Type: map', () => {
        test('devrait remplacer une lettre par une lettre adjacente sur le clavier', () => {
            // Activer map uniquement pour le deuxième caractère ('e')
            randomBool.mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValue(false);

            const result = make('test', { types: { map: 0.1 } });
            // Si 'e' est remplacé par 'r' (premier caractère dans le tableau)
            expect(result).toBe('tzst');
        });
    });

    describe('Type: drop', () => {
        test('devrait supprimer une lettre', () => {
            // Activer drop uniquement pour le premier caractère
            randomBool.mockReturnValueOnce(true).mockReturnValue(false);

            const result = make('test', { types: { drop: 0.1 } });
            expect(result).toBe('est');
        });
    });

    describe('Type: duplicate', () => {
        test('devrait dupliquer une lettre', () => {
            // Activer duplicate uniquement pour le premier caractère
            randomBool.mockReturnValueOnce(true).mockReturnValue(false);

            const result = make('test', { types: { duplicate: 0.1 } });
            expect(result).toBe('ttest');
        });
    });

    describe('Options par défaut', () => {
        test('devrait utiliser les options par défaut si non spécifiées', () => {
            expect(defaultOptions).toHaveProperty('types');
            expect(defaultOptions).toHaveProperty('keyboard');
            expect(defaultOptions.keyboard).toBe('azerty');

            // Nous ne contrôlons pas les comportements aléatoires ici
            const result = make('test');
            expect(typeof result).toBe('string');
        });
    });
});