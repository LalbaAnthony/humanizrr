/**
 * Generate a random integer between min and max, inclusive.
 */
function randomInt(min = 0, max = 1): number {
    if (min > max) throw new Error('Min must be less than max');
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default randomInt;