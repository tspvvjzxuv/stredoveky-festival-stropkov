/**
 * Shared test constants used across test files.
 *
 * This file centralizes commonly used test values to:
 * - Reduce duplication across test files
 * - Provide consistent test data
 * - Make tests more maintainable
 * - Enable easy updates to test values
 */
/**
 * Valid IBAN test values for different countries.
 * All IBANs have valid checksums and formats.
 */
export declare const TEST_IBANS: {
    /** Valid Slovak IBAN - primary test value */
    readonly SK_VALID: "SK9611000000002918599669";
    /** Valid Slovak IBAN - with spaces (same as SK_VALID) */
    readonly SK_VALID_SPACED: "SK96 1100 0000 0029 1859 9669";
    /** Valid Slovak IBAN - alternative 1 */
    readonly SK_VALID_2: "SK5681800000007000157042";
    /** Valid Slovak IBAN - alternative 2 */
    readonly SK_VALID_3: "SK9181800000007000155733";
    /** Valid Slovak IBAN - alternative 3 */
    readonly SK_VALID_4: "SK4523585719461382368397";
    /** Valid Slovak IBAN - alternative 4 */
    readonly SK_VALID_5: "SK2738545237537948273958";
    /** Valid Czech IBAN */
    readonly CZ_VALID: "CZ6508000000192000145399";
    /** Valid Austrian IBAN */
    readonly AT_VALID: "AT611904300234573201";
};
/**
 * Invalid IBAN test values with incorrect checksums.
 * Used for testing validation rejection.
 */
export declare const TEST_INVALID_IBANS: {
    /** Slovak IBAN with wrong checksum (last digit changed) */
    readonly SK_BAD_CHECKSUM: "SK9611000000002918599668";
    /** Czech IBAN with wrong checksum (last digit changed) */
    readonly CZ_BAD_CHECKSUM: "CZ6508000000192000145398";
    /** Austrian IBAN with wrong checksum (last digit changed) */
    readonly AT_BAD_CHECKSUM: "AT611904300234573202";
};
/**
 * Test amounts covering various edge cases and common scenarios.
 */
export declare const TEST_AMOUNTS: {
    /** Zero amount */
    readonly ZERO: 0;
    /** Minimal positive amount */
    readonly SMALL: 0.01;
    /** Small decimal amount */
    readonly SMALL_DECIMAL: 0.1;
    /** Standard test amount */
    readonly STANDARD: 100;
    /** Amount with decimals */
    readonly STANDARD_DECIMAL: 100.5;
    /** Larger amount */
    readonly LARGE: 9999.99;
    /** Very large amount */
    readonly VERY_LARGE: 999999.99;
};
/**
 * Common currency codes used in tests.
 */
export declare const TEST_CURRENCIES: {
    readonly EUR: "EUR";
    readonly USD: "USD";
    readonly CZK: "CZK";
};
/**
 * Common variable symbols for testing.
 */
export declare const TEST_SYMBOLS: {
    /** Simple numeric symbol */
    readonly SIMPLE: "123";
};
/**
 * Valid BIC codes for testing.
 */
export declare const TEST_BICS: {
    /** Valid BIC code */
    readonly VALID: "TATRSKBX";
    /** Alternative valid BIC */
    readonly VALID_2: "DEUTDEFF500";
};
