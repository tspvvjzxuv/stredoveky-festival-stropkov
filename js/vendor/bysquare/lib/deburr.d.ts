export declare function deburrLetter(key: string): string;
/**
 * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * Two-step process:
 * 1. Replace precomposed Latin letters via lookup map
 * 2. Strip combining diacritical marks
 */
export declare function deburr(text: string): string;
