/**
 * Test data fixtures for direct debit functionality.
 *
 * Direct debits are used for recurring payments where the creditor
 * pulls funds from the debtor's account.
 */
import { DataModel } from "../types.js";
/**
 * Direct debit fixture for encode/decode serialization tests.
 */
export declare const DIRECT_DEBIT_FIXTURE: {
    invoiceId: string;
    payments: {
        type: 4;
        amount: number;
        bankAccounts: {
            iban: "SK9611000000002918599669";
        }[];
        currencyCode: "EUR";
        variableSymbol: "123";
        beneficiary: {
            name: string;
        };
        ddVariableSymbol: "123";
    }[];
};
/**
 * Direct debit with basic required fields for testing.
 */
export declare const DIRECT_DEBIT_DATA: DataModel;
/**
 * Tab-separated serialized representation of DIRECT_DEBIT_FIXTURE.
 */
export declare const DIRECT_DEBIT_SERIALIZED: string;
