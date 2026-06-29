/**
 * Invoice document types within bysquareType=1.
 *
 * @dprint-ignore
 */
export declare const InvoiceDocumentType: {
    readonly Invoice: 0;
    readonly ProformaInvoice: 1;
    readonly CreditNote: 2;
    readonly DebitNote: 3;
    readonly AdvanceInvoice: 4;
};
export type InvoiceDocumentType = typeof InvoiceDocumentType[keyof typeof InvoiceDocumentType];
/**
 * Payment means as bitmask values. Multiple values can be combined with
 * bitwise OR.
 *
 * Each value corresponds to `1 << position` where position is the
 * zero-based declaration order defined in the specification.
 *
 * @dprint-ignore
 */
export declare const PaymentMean: {
    readonly MoneyTransfer: 1;
    readonly Cash: 2;
    readonly CashOnDelivery: 4;
    readonly CreditCard: 8;
    readonly Advance: 16;
    readonly MutualOffset: 32;
    readonly Other: 64;
};
export type PaymentMean = typeof PaymentMean[keyof typeof PaymentMean];
export type Contact = {
    name?: string;
    telephone?: string;
    email?: string;
};
export type PostalAddress = {
    streetName?: string;
    buildingNumber?: string;
    cityName?: string;
    postalZone?: string;
    state?: string;
    country?: string;
};
export type Party = {
    partyName: string;
    companyTaxId?: string;
    companyVatId?: string;
    companyRegisterId?: string;
};
export type SupplierParty = Party & {
    postalAddress: PostalAddress;
    contact?: Contact;
};
export type CustomerParty = Party & {
    partyIdentification?: string;
};
export type SingleInvoiceLine = {
    orderLineId?: string;
    deliveryNoteLineId?: string;
    itemName?: string;
    itemEanCode?: string;
    /** YYYYMMDD */
    periodFromDate?: string;
    /** YYYYMMDD */
    periodToDate?: string;
    invoicedQuantity?: number;
};
export type TaxCategorySummary = {
    /** Decimal in range [0, 1] representing the tax rate */
    classifiedTaxCategory: number;
    taxExclusiveAmount: number;
    taxAmount: number;
    alreadyClaimedTaxExclusiveAmount?: number;
    alreadyClaimedTaxAmount?: number;
};
export type MonetarySummary = {
    payableRoundingAmount?: number;
    paidDepositsAmount?: number;
};
export type DataModel = {
    documentType: InvoiceDocumentType;
    /** Required invoice identifier */
    invoiceId: string;
    /** Required issue date in YYYYMMDD format */
    issueDate: string;
    /** YYYYMMDD */
    taxPointDate?: string;
    orderId?: string;
    deliveryNoteId?: string;
    /** ISO 4217 currency code */
    localCurrencyCode: string;
    /** ISO 4217 currency code, required if currRate is set */
    foreignCurrencyCode?: string;
    currRate?: number;
    referenceCurrRate?: number;
    supplierParty: SupplierParty;
    customerParty: CustomerParty;
    /**
     * Mutually exclusive with singleInvoiceLine. Exactly one of
     * numberOfInvoiceLines or singleInvoiceLine must be provided.
     */
    numberOfInvoiceLines?: number;
    invoiceDescription?: string;
    /**
     * Mutually exclusive with numberOfInvoiceLines. Exactly one of
     * numberOfInvoiceLines or singleInvoiceLine must be provided.
     */
    singleInvoiceLine?: SingleInvoiceLine;
    taxCategorySummaries: TaxCategorySummary[];
    monetarySummary: MonetarySummary;
    /** Bitmask of PaymentMean values */
    paymentMeans?: number;
};
