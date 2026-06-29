import { Version } from "../types.js";
import type { DataModel } from "./types.js";
/**
 * Transform DataModel to a tab-separated intermediate format.
 *
 * Field order follows the specification (40 + N×5 fields):
 *
 * - Field 0: invoiceId
 * - Field 1: issueDate (YYYYMMDD)
 * - Field 2: taxPointDate (YYYYMMDD)
 * - Field 3: orderId
 * - Field 4: deliveryNoteId
 * - Field 5: localCurrencyCode
 * - Field 6: foreignCurrencyCode
 * - Field 7: currRate
 * - Field 8: referenceCurrRate
 *
 * Supplier party (13 fields):
 * - Fields 9-12: partyName, companyTaxId, companyVatId, companyRegisterId
 * - Fields 13-18: postalAddress (streetName, buildingNumber, cityName, postalZone, state, country)
 * - Fields 19-21: contact (name, telephone, email)
 *
 * Customer party (5 fields):
 * - Fields 22-25: partyName, companyTaxId, companyVatId, companyRegisterId
 * - Field 26: partyIdentification
 *
 * - Field 27: numberOfInvoiceLines
 * - Field 28: invoiceDescription
 *
 * Single invoice line (7 fields):
 * - Fields 29-35: orderLineId, deliveryNoteLineId, itemName, itemEanCode,
 *                 periodFromDate, periodToDate, invoicedQuantity
 *
 * Tax category summaries:
 * - Field 36: count
 * - Fields 37..36+N×5: per summary (classifiedTaxCategory, taxExclusiveAmount,
 *                      taxAmount, alreadyClaimedTaxExclusiveAmount, alreadyClaimedTaxAmount)
 *
 * Monetary summary (2 fields):
 * - payableRoundingAmount, paidDepositsAmount
 *
 * - Last field: paymentMeans (bitmask)
 */
export declare function serialize(data: DataModel): string;
export type EncodeOptions = {
    /**
     * Validate the data model before encoding.
     *
     * @default true
     */
    validate?: boolean;
    /**
     * Version of the BySquare format to use.
     *
     * The official app only recognizes headers with version=0 and performs
     * strict equality matching, so version 1.0.0 is the only compatible
     * value.
     *
     * @default Version["1.0.0"]
     */
    version?: Version;
};
/**
 * Encode an invoice data model into a QR string.
 *
 * Uses bysquareType=1 and the documentType from DataModel to build
 * the header. The binary pipeline is shared with PAY by square:
 * serialize → CRC32 → LZMA → header + length → base32hex.
 *
 * @see 3.16.
 */
export declare function encode(model: DataModel, options?: EncodeOptions): string;
