/**
 * The Levenshtein distance is a measure of the similarity between two strings.
 *
 * Returns the Levenshtein distance between two strings.
 */
function levenshtein(a: string, b: string): number {
    // Fast path
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    // Ensure a is the shorter string to save memory
    if (a.length > b.length) {
        [a, b] = [b, a];
    }

    const aLen = a.length;
    const bLen = b.length;

    let previous: number[] = new Array(aLen + 1).fill(0);
    let current: number[] = new Array(aLen + 1).fill(0);

    // Initialize first row
    for (let i = 0; i <= aLen; i++) {
        previous[i] = i;
    }

    for (let j = 1; j <= bLen; j++) {
        current[0] = j;

        for (let i = 1; i <= aLen; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;

            current[i] = Math.min(
                previous[i]! + 1,        // deletion
                current[i - 1]! + 1,     // insertion
                previous[i - 1]! + cost  // substitution
            );
        }

        // Swap rows
        [previous, current] = [current, previous];
    }

    return previous[aLen] ?? 0;
}

export default levenshtein;
