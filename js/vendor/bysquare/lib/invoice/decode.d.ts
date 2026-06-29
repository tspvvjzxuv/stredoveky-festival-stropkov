import type { DataModel, InvoiceDocumentType } from "./types.js";
/**
 * Parse a tab-separated intermediate format into DataModel.
 *
 * Field order follows the specification (40 + N×5 fields).
 */
export declare function deserialize(tabString: string, documentType: InvoiceDocumentType): DataModel;
/**
 * Decode QR string into DataModel.
 *
 * Expects bysquareType=1 in the header. The documentType nibble determines the
 * specific invoice subtype (Invoice, ProformaInvoice, CreditNote, DebitNote,
 * AdvanceInvoice).
 *
 * @see 3.16.
 * @param qr base32hex encoded bysquare binary data
 */
export declare function decode(qr: string): DataModel;
