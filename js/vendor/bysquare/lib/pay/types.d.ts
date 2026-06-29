/**
 * Months represented as bitwise flags, enabling multiple months to be combined
 * (via bitwise OR) into a single numeric value. Each month is a power of two,
 * so any combination of months produces a unique sum when you bitwise-OR
 * their values.
 *
 * @see Appendix A, Table 10
 * @see 3.7.
 * @dprint-ignore
 */
export declare const Month: {
    readonly January: 1;
    readonly February: 2;
    readonly March: 4;
    readonly April: 8;
    readonly May: 16;
    readonly June: 32;
    readonly July: 64;
    readonly August: 128;
    readonly September: 256;
    readonly October: 512;
    readonly November: 1024;
    readonly December: 2048;
};
export type Month = typeof Month[keyof typeof Month];
/**
 * Payment day derived from the periodicity. Day of the month is a number
 * between 1 and 31. Day of the week is a number between 1 and 7 (1 = Monday,
 * 2 = Tuesday, …, 7 = Sunday).
 *
 * @see Appendix A, Table 9
 * @dprint-ignore
 */
export declare const Periodicity: {
    readonly Daily: "d";
    readonly Weekly: "w";
    readonly Biweekly: "b";
    readonly Monthly: "m";
    readonly Bimonthly: "B";
    readonly Quarterly: "q";
    readonly Semiannually: "s";
    readonly Annually: "a";
};
export type Periodicity = typeof Periodicity[keyof typeof Periodicity];
/**
 * This is the payment day. It's meaning depends on the periodicity, meaning
 * either day of the month (number between 1 and 31) or day of the week
 * (1=Monday, 2=Tuesday, …, 7=Sunday).
 *
 * @see Table 15 field #16
 * @see 2.5.
 * @minimum 1
 * @maximum 31
 * @maxLength 2
 */
export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
/**
 * Payment options classifier. Can be combined by summing values. At least
 * one option must be specified:
 *
 * - `PaymentOrder`: Single payment order
 * - `StandingOrder`: Standing order (recurring payment), details in StandingOrderExt
 * - `DirectDebit`: Direct debit, details in DirectDebitExt
 *
 * @see Appendix A, Table 11
 * @see Table 15 field #3
 * @see 2.1.
 */
export declare const PaymentOptions: {
    /**
     * Single payment order
     */
    readonly PaymentOrder: 1;
    /**
     * Standing order (recurring payment), details filled in StandingOrderExt
     */
    readonly StandingOrder: 2;
    /**
     * Direct debit, details filled in DirectDebitExt
     */
    readonly DirectDebit: 4;
};
export type PaymentOptions = typeof PaymentOptions[keyof typeof PaymentOptions];
/**
 * Bank account data of the payment recipient.
 *
 * @see Table 15 fields #13-14
 */
export type BankAccount = {
    /**
     * International Bank Account Number in IBAN format.
     *
     * @see Table 15 field #13
     * @see Table 8
     * @example "SK8209000000000011424060"
     * @pattern [A-Z]{2}[0-9]{2}[A-Z0-9]{0,30}
     * @minLength 15
     * @maxLength 34
     */
    iban: string;
    /**
     * Bank Identification Code (BIC) in ISO 9362 format (SWIFT).
     *
     * @see Table 15 field #14
     * @see Table 8
     * @example "TATRSKBX"
     * @pattern [A-Z]{4}[A-Z]{2}[A-Z\d]{2}([A-Z\d]{3})?
     * @minLength 8
     * @maxLength 11
     */
    bic?: string;
};
/**
 * Direct debit scheme. One of the following options:
 *
 * - SEPA - Direct debit follows the SEPA scheme
 * - Other - Other scheme
 *
 * @see Appendix A, Table 13
 * @see Table 15 field #21
 */
export declare const DirectDebitScheme: {
    /**
     * Other scheme
     */
    readonly Other: 0;
    /**
     * SEPA - Direct debit follows the SEPA scheme
     */
    readonly Sepa: 1;
};
export type DirectDebitScheme = typeof DirectDebitScheme[keyof typeof DirectDebitScheme];
/**
 * Direct debit type. One of the following options:
 *
 * - one-off: One-time direct debit
 * - recurrent: Recurring direct debit
 *
 * @see Appendix A, Table 12
 * @see Table 15 field #22
 * @minimum 0
 * @maximum 1
 */
export declare const DirectDebitType: {
    /**
     * One-time direct debit
     */
    readonly OneOff: 0;
    /**
     * Recurring direct debit
     */
    readonly Recurrent: 1;
};
export type DirectDebitType = typeof DirectDebitType[keyof typeof DirectDebitType];
export type Beneficiary = {
    /**
     * Beneficiary name. Added in v1.1.0, required since v1.2.0.
     *
     * @see Table 15 field #31
     * @maxLength 70
     */
    name: string;
    /**
     * Beneficiary street address.
     *
     * @see Table 15 field #32
     * @maxLength 70
     */
    street?: string;
    /**
     * Beneficiary city.
     *
     * @see Table 15 field #33
     * @maxLength 70
     */
    city?: string;
};
export type SimplePayment = {
    /**
     * Payment amount. Only positive values are allowed. The decimal part is
     * separated by a dot. Can be left empty, e.g., for voluntary donations.
     *
     * @see Table 15 field #4
     * @see Table 8
     * @example 1000
     * @example 1.99
     * @example 10.5
     * @example 0.08
     * @minimum 0
     * @maximum 999_999_999_999_999
     * @maxLength 15
     */
    amount?: number;
    /**
     * Currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format (3 letters).
     *
     * @see Table 15 field #5
     * @see Table 8
     * @example "EUR"
     * @pattern [A-Z]{3}
     * @minLength 3
     * @maxLength 3
     */
    currencyCode: string | keyof typeof CurrencyCode;
    /**
     * Payment due date in YYYYMMDD format. For standing orders, this indicates
     * the first payment date.
     *
     * @see Table 15 field #6
     * @see 3.7.
     * @format date
     * @example "20241231"
     * @pattern \d{8}
     * @maxLength 8
     */
    paymentDueDate?: string;
    /**
     * Variable symbol, up to 10 digits.
     *
     * @see Table 15 field #7
     * @pattern [0-9]{0,10}
     * @maxLength 10
     */
    variableSymbol?: string;
    /**
     * Constant symbol, a 4-digit payment identifier defined by NBS
     * (National Bank of Slovakia).
     *
     * @see Table 15 field #8
     * @pattern [0-9]{0,4}
     * @maxLength 4
     */
    constantSymbol?: string;
    /**
     * Specific symbol, up to 10 digits.
     *
     * @see Table 15 field #9
     * @pattern [0-9]{0,10}
     * @maxLength 10
     */
    specificSymbol?: string;
    /**
     * Originator's reference information according to SEPA.
     *
     * @see Table 15 field #10
     * @maxLength 35
     */
    originatorsReferenceInformation?: string;
    /**
     * Payment note for the recipient. Contains payment details that help the
     * recipient identify the payment.
     *
     * @see Table 15 field #11
     * @see Table 14
     * @maxLength 140
     */
    paymentNote?: string;
    /**
     * List of bank accounts of the payment recipient.
     *
     * @see Table 15 fields #12-14
     * @see 2.2.
     * @minItems 1
     */
    bankAccounts: BankAccount[];
    /**
     * Beneficiary information. Added in v1.1.0, name required since v1.2.0.
     *
     * @see Table 15 fields #31-33
     * @see Appendix E
     */
    beneficiary: Beneficiary;
};
export type PaymentOrder = SimplePayment & {
    /**
     * @see Table 15 field #3
     */
    type: typeof PaymentOptions.PaymentOrder;
};
/**
 * Extension of payment data with standing order (recurring payment) settings.
 *
 * @see Table 15 fields #15-19
 * @see 2.5.
 */
export type StandingOrder = SimplePayment & {
    /**
     * @see Table 15 field #3
     */
    type: typeof PaymentOptions.StandingOrder;
    /**
     * Specifies the day on which the standing order will be processed in the
     * specified months.
     *
     * @see Table 15 field #16
     * @minimum 1
     * @maximum 31
     * @maxLength 2
     */
    day?: number | Day;
    /**
     * Specifies the months in which the standing order payment should be
     * executed. Multiple months are combined by summing their classifier values.
     *
     * @see Table 15 field #17
     * @see Appendix A, Table 10
     * @example Month.January
     * @example Month.January | Month.July | Month.October
     * @example 577
     * @maxLength 4
     */
    month?: keyof typeof Month | number;
    /**
     * Periodicity (frequency) of the standing order.
     *
     * @see Table 15 field #18
     * @see Appendix A, Table 9
     * @maxLength 1
     */
    periodicity: keyof typeof Periodicity | string;
    /**
     * Last payment date within the standing order. After this date, the
     * standing order is cancelled.
     *
     * @see Table 15 field #19
     * @format date
     * @pattern \d{8}
     * @maxLength 8
     * @example "20241231"
     */
    lastDate?: string;
};
/**
 * Extension of payment data with direct debit settings and identification.
 *
 * @see Table 15 fields #20-30
 * @see 2.6.
 */
export type DirectDebit = SimplePayment & {
    /**
     * @see Table 15 field #3
     */
    type: typeof PaymentOptions.DirectDebit;
    /**
     * Direct debit scheme.
     *
     * @see Table 15 field #21
     * @see Appendix A, Table 13
     * @example DirectDebitScheme.Sepa
     * @minimum 0
     * @maximum 1
     */
    directDebitScheme?: keyof typeof DirectDebitScheme | number;
    /**
     * Direct debit type.
     *
     * @see Table 15 field #22
     * @see Appendix A, Table 12
     * @example DirectDebitType.Recurrent
     * @minimum 0
     * @maximum 1
     */
    directDebitType?: keyof typeof DirectDebitType | number;
    /**
     * Variable symbol for direct debit extension (separate from base payment).
     *
     * @see Table 15 field #23
     * @pattern [0-9]{0,10}
     * @maxLength 10
     */
    ddVariableSymbol?: string;
    /**
     * Specific symbol for direct debit extension (separate from base payment).
     *
     * @see Table 15 field #24
     * @pattern [0-9]{0,10}
     * @maxLength 10
     */
    ddSpecificSymbol?: string;
    /**
     * Originator's reference information for direct debit extension (separate from base payment).
     *
     * @see Table 15 field #25
     * @maxLength 35
     */
    ddOriginatorsReferenceInformation?: string;
    /**
     * Mandate identification between creditor and debtor according to SEPA.
     *
     * @see Table 15 field #26
     * @maxLength 35
     */
    mandateId?: string;
    /**
     * Creditor identification according to SEPA.
     *
     * @see Table 15 field #27
     * @maxLength 35
     */
    creditorId?: string;
    /**
     * Contract identification between creditor and debtor according to SEPA.
     *
     * @see Table 15 field #28
     * @maxLength 35
     */
    contractId?: string;
    /**
     * Maximum direct debit amount.
     *
     * @see Table 15 field #29
     * @minimum 0
     * @maximum 999_999_999_999_999
     * @maxLength 15
     */
    maxAmount?: number;
    /**
     * Direct debit validity date. The direct debit expires on this date.
     *
     * @see Table 15 field #30
     * @format date
     * @pattern \d{8}
     * @maxLength 8
     * @example "20241231"
     */
    validTillDate?: string;
};
/**
 * Data for a single payment order.
 *
 * @see 4.
 */
export type Payment = PaymentOrder | StandingOrder | DirectDebit;
/**
 * PAY by square data model.
 *
 * @see 4.
 * @see Table 15
 */
export type DataModel = {
    /**
     * Invoice number if the data is part of an invoice, or an identifier for
     * the issuer's internal purposes.
     *
     * @see Table 15 field #1
     * @maxLength 10
     */
    invoiceId?: string;
    /**
     * List of one or more payments for batch payment orders.
     * The main (preferred) payment should be listed first.
     *
     * @see Table 15 field #2
     * @minItems 1
     */
    payments: Payment[];
};
/**
 * [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217)
 *
 * @see Table 8
 * @see Table 15 field #5
 */
export declare const CurrencyCode: {
    readonly AED: "AED";
    readonly AFN: "AFN";
    readonly ALL: "ALL";
    readonly AMD: "AMD";
    readonly ANG: "ANG";
    readonly AOA: "AOA";
    readonly ARS: "ARS";
    readonly AUD: "AUD";
    readonly AWG: "AWG";
    readonly AZN: "AZN";
    readonly BAM: "BAM";
    readonly BBD: "BBD";
    readonly BDT: "BDT";
    readonly BGN: "BGN";
    readonly BHD: "BHD";
    readonly BIF: "BIF";
    readonly BMD: "BMD";
    readonly BND: "BND";
    readonly BOB: "BOB";
    readonly BRL: "BRL";
    readonly BSD: "BSD";
    readonly BTN: "BTN";
    readonly BWP: "BWP";
    readonly BYN: "BYN";
    readonly BZD: "BZD";
    readonly CAD: "CAD";
    readonly CDF: "CDF";
    readonly CHF: "CHF";
    readonly CLP: "CLP";
    readonly CNY: "CNY";
    readonly COP: "COP";
    readonly CRC: "CRC";
    readonly CUC: "CUC";
    readonly CUP: "CUP";
    readonly CVE: "CVE";
    readonly CZK: "CZK";
    readonly DJF: "DJF";
    readonly DKK: "DKK";
    readonly DOP: "DOP";
    readonly DZD: "DZD";
    readonly EGP: "EGP";
    readonly ERN: "ERN";
    readonly ETB: "ETB";
    readonly EUR: "EUR";
    readonly FJD: "FJD";
    readonly FKP: "FKP";
    readonly GBP: "GBP";
    readonly GEL: "GEL";
    readonly GHS: "GHS";
    readonly GIP: "GIP";
    readonly GMD: "GMD";
    readonly GNF: "GNF";
    readonly GTQ: "GTQ";
    readonly GYD: "GYD";
    readonly HKD: "HKD";
    readonly HNL: "HNL";
    readonly HRK: "HRK";
    readonly HTG: "HTG";
    readonly HUF: "HUF";
    readonly IDR: "IDR";
    readonly ILS: "ILS";
    readonly INR: "INR";
    readonly IQD: "IQD";
    readonly IRR: "IRR";
    readonly ISK: "ISK";
    readonly JMD: "JMD";
    readonly JOD: "JOD";
    readonly JPY: "JPY";
    readonly KES: "KES";
    readonly KGS: "KGS";
    readonly KHR: "KHR";
    readonly KMF: "KMF";
    readonly KPW: "KPW";
    readonly KRW: "KRW";
    readonly KWD: "KWD";
    readonly KYD: "KYD";
    readonly KZT: "KZT";
    readonly LAK: "LAK";
    readonly LBP: "LBP";
    readonly LKR: "LKR";
    readonly LRD: "LRD";
    readonly LSL: "LSL";
    readonly LYD: "LYD";
    readonly MAD: "MAD";
    readonly MDL: "MDL";
    readonly MGA: "MGA";
    readonly MKD: "MKD";
    readonly MMK: "MMK";
    readonly MNT: "MNT";
    readonly MOP: "MOP";
    readonly MRU: "MRU";
    readonly MUR: "MUR";
    readonly MVR: "MVR";
    readonly MWK: "MWK";
    readonly MXN: "MXN";
    readonly MYR: "MYR";
    readonly MZN: "MZN";
    readonly NAD: "NAD";
    readonly NGN: "NGN";
    readonly NIO: "NIO";
    readonly NOK: "NOK";
    readonly NPR: "NPR";
    readonly NZD: "NZD";
    readonly OMR: "OMR";
    readonly PAB: "PAB";
    readonly PEN: "PEN";
    readonly PGK: "PGK";
    readonly PHP: "PHP";
    readonly PKR: "PKR";
    readonly PLN: "PLN";
    readonly PYG: "PYG";
    readonly QAR: "QAR";
    readonly RON: "RON";
    readonly RSD: "RSD";
    readonly RUB: "RUB";
    readonly RWF: "RWF";
    readonly SAR: "SAR";
    readonly SBD: "SBD";
    readonly SCR: "SCR";
    readonly SDG: "SDG";
    readonly SEK: "SEK";
    readonly SGD: "SGD";
    readonly SHP: "SHP";
    readonly SLL: "SLL";
    readonly SOS: "SOS";
    readonly SRD: "SRD";
    readonly SSP: "SSP";
    readonly STN: "STN";
    readonly SVC: "SVC";
    readonly SYP: "SYP";
    readonly SZL: "SZL";
    readonly THB: "THB";
    readonly TJS: "TJS";
    readonly TMT: "TMT";
    readonly TND: "TND";
    readonly TOP: "TOP";
    readonly TRY: "TRY";
    readonly TTD: "TTD";
    readonly TWD: "TWD";
    readonly TZS: "TZS";
    readonly UAH: "UAH";
    readonly UGX: "UGX";
    readonly USD: "USD";
    readonly UYU: "UYU";
    readonly UZS: "UZS";
    readonly VES: "VES";
    readonly VND: "VND";
    readonly VUV: "VUV";
    readonly WST: "WST";
    readonly XAF: "XAF";
    readonly XCD: "XCD";
    readonly XOF: "XOF";
    readonly XPF: "XPF";
    readonly YER: "YER";
    readonly ZAR: "ZAR";
    readonly ZMW: "ZMW";
    readonly ZWL: "ZWL";
};
export type CurrencyCode = typeof CurrencyCode[keyof typeof CurrencyCode];
