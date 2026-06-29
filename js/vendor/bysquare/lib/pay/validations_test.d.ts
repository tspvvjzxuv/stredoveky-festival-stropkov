/**
 * Tests for the validations module.
 *
 * Covers:
 * - IBAN validation (format, checksum, country codes)
 * - BIC validation
 * - Currency code validation
 * - Payment and DataModel validation
 * - ValidationError handling and path verification
 *
 * NOTE: Validation uses the `validator` library, which is case-insensitive
 * for currency codes and accepts ISO 4217 codes like "XXX" (no currency).
 */
export {};
