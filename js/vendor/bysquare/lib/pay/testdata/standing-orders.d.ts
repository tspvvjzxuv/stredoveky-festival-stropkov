/**
 * Standing order test fixtures.
 *
 * Contains standing order data structures for testing recurring payments
 * with periodicity, execution day, and end date fields.
 */
import { DataModel } from "../types.js";
/**
 * Standing order fixture for encode/decode serialization tests.
 */
export declare const STANDING_ORDER_FIXTURE: {
    invoiceId: string;
    payments: {
        type: 2;
        amount: number;
        bankAccounts: {
            iban: "SK9611000000002918599669";
        }[];
        periodicity: "m";
        currencyCode: "EUR";
        variableSymbol: "123";
        lastDate: string;
        day: number;
        beneficiary: {
            name: string;
        };
    }[];
};
/**
 * Standing order with basic required fields for testing.
 */
export declare const STANDING_ORDER_DATA: DataModel;
/**
 * Tab-separated serialized representation of STANDING_ORDER_FIXTURE.
 */
export declare const STANDING_ORDER_SERIALIZED: string;
