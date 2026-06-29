/**
 * Test data for decode functionality.
 *
 * Contains QR string to DataModel mappings used to verify
 * that encoded QR strings decode to expected data structures.
 */
import { DataModel } from "../types.js";
/**
 * QR string to DataModel mappings for testing decode functionality.
 * Each entry maps an encoded QR string to its expected decoded DataModel.
 */
export declare const DECODE_TEST_CASES: Map<string, DataModel>;
/**
 * Serialized payment data with missing IBAN field.
 * Used to test error handling when IBAN is empty.
 */
export declare const SERIALIZED_DATA_MISSING_IBAN: string;
