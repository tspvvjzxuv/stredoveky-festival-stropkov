/**
 * Test data builder functions for constructing test fixtures.
 *
 * Builders provide a flexible way to create test data with:
 * - Sensible defaults for all required fields
 * - Easy override of specific fields via partial objects
 * - Type-safe construction
 * - Reduced boilerplate in tests
 *
 * Usage example:
 *
 * ```typescript
 * const payment = buildPaymentOrder({ amount: 123.45 });
 * const model = buildDataModel({ invoiceId: "test-123" });
 * ```
 */
import { BankAccount, DataModel, Payment } from "../types.js";
/**
 * Builds a minimal bank account for testing.
 *
 * @param overrides - Fields to override
 * @returns BankAccount with defaults
 */
export declare function buildBankAccount(overrides?: Partial<BankAccount>): BankAccount;
/**
 * Builds a payment order for testing.
 *
 * @param overrides - Fields to override
 * @returns Payment with type PaymentOrder
 */
export declare function buildPaymentOrder(overrides?: Partial<Payment>): Payment;
/**
 * Builds a complete data model for testing.
 *
 * @param overrides - Fields to override
 * @returns DataModel with defaults
 */
export declare function buildDataModel(overrides?: Partial<DataModel>): DataModel;
