import { Version } from "../types.js";
import { DataModel } from "./types.js";
/**
 * Transform DataModel to a tab-separated intermediate format.
 *
 * Base fields
 * - Field 0: invoiceId
 * - Field 1: paymentsCount
 *
 * Payment block (repeated `paymentsCount` times)
 * - Field +0: type
 * - Field +1: amount
 * - Field +2: currencyCode
 * - Field +3: paymentDueDate (YYYYMMDD)
 * - Field +4: variableSymbol
 * - Field +5: constantSymbol
 * - Field +6: specificSymbol
 * - Field +7: originatorsReferenceInformation
 * - Field +8: paymentNote
 * - Field +9: bankAccountsCount
 *
 * Bank account block (nested, repeated `bankAccountsCount` times)
 * - Field +0: iban
 * - Field +1: bic
 *
 * Standing order extension
 * - Field +X: standingOrderExt ("0" | "1")
 *   - if "1":
 *     - Field +1: day
 *     - Field +2: month (classifier sum)
 *     - Field +3: periodicity
 *     - Field +4: lastDate (YYYYMMDD)
 *
 * Direct debit extension
 * - Field +Y: directDebitExt ("0" | "1")
 *   - if "1":
 *     - Field +1: directDebitScheme
 *     - Field +2: directDebitType
 *     - Field +3: variableSymbol
 *     - Field +4: specificSymbol
 *     - Field +5: originatorsReferenceInformation
 *     - Field +6: mandateId
 *     - Field +7: creditorId
 *     - Field +8: contractId
 *     - Field +9: maxAmount
 *     - Field +10: validTillDate
 *
 * Beneficiary block (repeated per payment)
 * - Field +0: beneficiaryName
 * - Field +1: beneficiaryStreet
 * - Field +2: beneficiaryCity
 *
 * @see Table 15
 */
export declare function serialize(data: DataModel): string;
export declare function removeDiacritics(model: DataModel): void;
export type EncodeOptions = {
    /**
     * Many banking apps do not support diacritics, which results in errors when
     * serializing data from QR codes.
     *
     * @default true
     */
    deburr?: boolean;
    /**
     * If true, validates the data model before encoding it.
     *
     * @default true
     */
    validate?: boolean;
    /**
     * Version of the BySquare format to use.
     *
     * Note: Version 1.2.0 requires beneficiary name. Earlier versions (1.0.0, 1.1.0)
     * do not require it but may have limited banking app support for beneficiary fields.
     *
     * @default Version["1.2.0"]
     */
    version?: Version;
};
/**
 * Generate QR string ready for encoding into text QR code.
 *
 * Complete BySquare QR binary structure:
 * ```
 * +------------------+------------------+-----------------------------+
 * |     2 bytes      |     2 bytes      |          Variable           |
 * +------------------+------------------+-----------------------------+
 * | Bysquare Header  | Payload Length   |         LZMA Body           |
 * | (4 nibbles)      | (little-endian)  |  (compressed CRC+payload)   |
 * +------------------+------------------+-----------------------------+
 *         |                  |                       |
 *         v                  v                       v
 * +-----+-----+-----+-----+  +-----+-----+  +---------+-----------+
 * | 4b  | 4b  | 4b  | 4b  |  | LSB | MSB |  | Header  | Body      |
 * +-----+-----+-----+-----+  +-----+-----+  | (13B)   | (var)     |
 * | Type| Ver | Doc |Resv |  |   Length  |  | omitted |           |
 * +-----+-----+-----+-----+  +-----------+  +---------+-----------+
 *                                                       |
 *                                                       v
 *                                           +--------+-------------+
 *                                           | CRC32  | Tab-sep     |
 *                                           | (4B)   | payload     |
 *                                           +--------+-------------+
 * ```
 *
 * @param model - Data model to encode
 * @param options - Options for encoding
 *
 * @default options.deburr - true
 * @default options.validate - true
 *
 * @see 3.16.
 */
export declare function encode(model: DataModel, options?: EncodeOptions): string;
