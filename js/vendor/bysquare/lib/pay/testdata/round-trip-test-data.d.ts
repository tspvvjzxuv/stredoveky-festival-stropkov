/**
 * Round-trip test data for encode/decode verification.
 *
 * Contains test cases that verify data integrity through
 * the encode -> decode transformation cycle.
 */
/**
 * Collection of test cases for round-trip encode/decode testing.
 * Each test case ensures that encoding and then decoding produces the original data.
 */
export declare const ROUND_TRIP_TEST_CASES: readonly [{
    readonly name: "basic payment order";
    readonly data: import("../types.js").DataModel;
}, {
    readonly name: "minimal payment";
    readonly data: import("../types.js").DataModel;
}, {
    readonly name: "payment with diacritics";
    readonly data: {
        invoiceId: string;
        payments: {
            type: 1;
            amount: number;
            bankAccounts: {
                iban: "SK9611000000002918599669";
            }[];
            currencyCode: "EUR";
            variableSymbol: "123";
            paymentNote: string;
            beneficiary: {
                name: string;
                city: string;
                street: string;
            };
        }[];
    };
}, {
    readonly name: "standing order";
    readonly data: import("../types.js").DataModel;
}, {
    readonly name: "direct debit";
    readonly data: import("../types.js").DataModel;
}];
