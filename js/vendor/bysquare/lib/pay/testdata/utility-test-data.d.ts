/**
 * Utility test data for table-driven tests.
 *
 * Contains test case arrays for use with test.each() pattern.
 * Each array contains objects with test name, input, and expected result.
 */
import { CurrencyCode } from "../types.js";
/**
 * IBAN validation test cases.
 * Tests valid and invalid IBAN formats from different countries.
 */
export declare const IBAN_TEST_CASES: {
    name: string;
    iban: string;
    shouldPass: boolean;
}[];
/**
 * Currency code validation test cases.
 * Note: validator.isISO4217() is case-insensitive and accepts "XXX" (no currency).
 */
export declare const CURRENCY_TEST_CASES: {
    name: string;
    currency: CurrencyCode;
    shouldPass: boolean;
}[];
