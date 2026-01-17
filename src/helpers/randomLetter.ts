/**
 *  
 * Returns a random letter from a-z.
 */
function randomLetter(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export default randomLetter;