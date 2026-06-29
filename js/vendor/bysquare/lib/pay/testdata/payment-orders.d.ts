/**
 * Payment order test fixtures.
 *
 * Contains various payment order data structures for testing:
 * - Basic payment orders with common fields
 * - Minimal payments with only required fields
 * - Payments with diacritics for deburr testing
 * - Serialized representations for serialize/deserialize testing
 */
import { DataModel } from "../types.js";
/**
 * Payment order fixture for encode/decode serialization tests.
 * Used primarily in encode.test.ts and decode.test.ts.
 */
export declare const PAYMENT_ORDER_FIXTURE: {
    invoiceId: string;
    payments: {
        type: 1;
        amount: number;
        bankAccounts: {
            iban: "SK9611000000002918599669";
        }[];
        currencyCode: "EUR";
        variableSymbol: "123";
        beneficiary: {
            name: string;
        };
    }[];
};
/**
 * Standard payment order with all common fields populated.
 * Used for basic encode/decode round-trip tests and validation.
 */
export declare const VALID_PAYMENT_ORDER: DataModel;
/**
 * Minimal payment with only required fields.
 * Tests that the system handles payments with no optional fields.
 */
export declare const MINIMAL_PAYMENT: DataModel;
/**
 * Tab-separated serialized representation of PAYMENT_ORDER_FIXTURE.
 * Used to test the serialize/deserialize functions.
 */
export declare const PAYMENT_ORDER_SERIALIZED: string;
/**
 * Payment order fixture with diacritics for testing diacritics removal (deburr).
 * This fixture should be encoded with diacritics converted to ASCII.
 */
export declare const PAYMENT_ORDER_WITH_DIACRITICS_FIXTURE: {
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
/**
 * Expected result after removing diacritics from PAYMENT_ORDER_WITH_DIACRITICS_FIXTURE.
 * Used to verify the deburr function works correctly.
 */
export declare const PAYMENT_ORDER_WITHOUT_DIACRITICS_EXPECTED: {
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
