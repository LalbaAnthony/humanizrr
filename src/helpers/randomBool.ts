/**
 * Have a percentage chance of returning true or false.
 */
function randomBool(percentage = 0.5): boolean {
    return Math.random() < percentage;
}

export default randomBool;