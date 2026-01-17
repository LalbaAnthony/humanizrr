import { expect, test } from '@jest/globals'
import randomBool from '../randomBool';

test('Test randomBool', () => {
    // Test the function multiple times to check for randomness
    const results = Array.from({ length: 10000 }, () => randomBool());

    // Check that the results are approximately 50% true and 50% false
    const trueCount = results.filter(result => result).length;
    const falseCount = results.length - trueCount;

    expect(trueCount).toBeGreaterThan(4000);
    expect(trueCount).toBeLessThan(6000);
    expect(falseCount).toBeGreaterThan(4000);
    expect(falseCount).toBeLessThan(6000);
});