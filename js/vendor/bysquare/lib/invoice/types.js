/**
 * Invoice document types within bysquareType=1.
 *
 * @dprint-ignore
 */
export const InvoiceDocumentType = {
    Invoice: 0x00,
    ProformaInvoice: 0x01,
    CreditNote: 0x02,
    DebitNote: 0x03,
    AdvanceInvoice: 0x04,
};
/**
 * Payment means as bitmask values. Multiple values can be combined with
 * bitwise OR.
 *
 * Each value corresponds to `1 << position` where position is the
 * zero-based declaration order defined in the specification.
 *
 * @dprint-ignore
 */
export const PaymentMean = {
    MoneyTransfer: 0b0000001,
    Cash: 0b0000010,
    CashOnDelivery: 0b0000100,
    CreditCard: 0b0001000,
    Advance: 0b0010000,
    MutualOffset: 0b0100000,
    Other: 0b1000000,
};
