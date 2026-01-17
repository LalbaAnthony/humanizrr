import { expect, test } from '@jest/globals'
import randomLetter from '../randomLetter';

test('Test randomLetter', () => {
    // Test the function multiple times to check for randomness
    const results = Array.from({ length: 1000 }, () => randomLetter());

    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Check that the results are within the expected range
    results.forEach(result => {
        expect(alphabet.includes(result)).toBe(true);
    });
});