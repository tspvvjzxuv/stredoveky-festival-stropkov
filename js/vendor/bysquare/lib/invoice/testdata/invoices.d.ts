import { type DataModel, type SupplierParty, type TaxCategorySummary } from "../types.js";
export declare function buildSupplierParty(overrides?: Partial<SupplierParty>): SupplierParty;
export declare function buildTaxCategorySummary(overrides?: Partial<TaxCategorySummary>): TaxCategorySummary;
export declare function buildInvoiceDataModel(overrides?: Partial<DataModel>): DataModel;
export declare const INVOICE_FIXTURE: DataModel;
export declare const INVOICE_WITH_SINGLE_LINE: DataModel;
export declare const INVOICE_WITH_FOREIGN_CURRENCY: DataModel;
export declare const INVOICE_WITH_ALL_FIELDS: DataModel;
export declare const PROFORMA_INVOICE_FIXTURE: DataModel;
export declare const CREDIT_NOTE_FIXTURE: DataModel;
export declare const DEBIT_NOTE_FIXTURE: DataModel;
export declare const ADVANCE_INVOICE_FIXTURE: DataModel;
/**
 * Expected tab-separated serialization of INVOICE_FIXTURE.
 *
 * Field order (40 + 1×5 = 45 fields):
 * invoiceId, issueDate, taxPointDate, orderId, deliveryNoteId,
 * localCurrencyCode, foreignCurrencyCode, currRate, referenceCurrRate,
 * supplier(4+6+3=13), customer(5), numberOfInvoiceLines, invoiceDescription,
 * singleInvoiceLine(7), taxCount, taxSummary(5), monetarySummary(2), paymentMeans
 */
export declare const INVOICE_SERIALIZED: string;
/**
 * Real-world sample invoice from the by square specification.
 * Known encoded form used for round-trip validation.
 */
export declare const FORSYS_INVOICE_FIXTURE: DataModel;
export declare const FORSYS_INVOICE_ENCODED = "200180806I611JMHJL33BT4VB565SUTB108DFEOVDB5GL3VU6C1ALGC208QS9BJA8GRIAOK44IH6JGNH40V0NDM7AGKEUO6BCLOTVQJ8NBGRFAGD1M7BH5LO6TORMBCP1EIE7LD22UAKUCM207GT21MG2V09JTGHOIGLN62OABJV5PI6B72V69ION5SCQ38BCFNEQFTDMSLHF62IPOE8LJB9SU4ITV2U07FKCDH30RDN18UPAS69SRU95OF4SC7E14NGEUD7KKUH15VM4P6E1GQH25I1GDSRF5C8DGHQIGB340N6SN2UJUJ7R2D9IJBI4V50IKPT";
export declare const ROUND_TRIP_INVOICE_TEST_CASES: DataModel[];
