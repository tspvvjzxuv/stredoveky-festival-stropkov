import { Version } from "../types.js";
import { BankAccount, DataModel, type Payment } from "./types.js";
/**
 * validates bankAccount fields:
 * - iban (ISO 13616)
 * - bic (ISO 9362)
 */
export declare function validateBankAccount(bankAccount: BankAccount, path: string): void;
/**
 * validate simple payment fields:
 * - currencyCode (ISO 4217)
 * - paymentDueDate (YYYYMMDD format per v1.2 specification)
 * - bankAccounts
 *
 * @see validateBankAccount
 */
export declare function validateSimplePayment(simplePayment: Payment, path: string, version?: Version): void;
/**
 * Validate `payments` field of dataModel.
 *
 * @see validateSimplePayment
 * @see ValidationError
 */
export declare function validateDataModel(dataModel: DataModel, version?: Version): DataModel;
