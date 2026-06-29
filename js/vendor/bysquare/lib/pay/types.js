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
export const Month = {
    January: 0b00000000000001,
    February: 0b00000000000010,
    March: 0b00000000000100,
    April: 0b00000000001000,
    May: 0b00000000010000,
    June: 0b00000000100000,
    July: 0b00000001000000,
    August: 0b00000010000000,
    September: 0b00000100000000,
    October: 0b00001000000000,
    November: 0b00010000000000,
    December: 0b00100000000000,
};
/**
 * Payment day derived from the periodicity. Day of the month is a number
 * between 1 and 31. Day of the week is a number between 1 and 7 (1 = Monday,
 * 2 = Tuesday, …, 7 = Sunday).
 *
 * @see Appendix A, Table 9
 * @dprint-ignore
 */
export const Periodicity = {
    Daily: "d",
    Weekly: "w",
    Biweekly: "b",
    Monthly: "m",
    Bimonthly: "B",
    Quarterly: "q",
    Semiannually: "s",
    Annually: "a",
};
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
export const PaymentOptions = {
    /**
     * Single payment order
     */
    PaymentOrder: 0b00000001,
    /**
     * Standing order (recurring payment), details filled in StandingOrderExt
     */
    StandingOrder: 0b00000010,
    /**
     * Direct debit, details filled in DirectDebitExt
     */
    DirectDebit: 0b00000100,
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
export const DirectDebitScheme = {
    /**
     * Other scheme
     */
    Other: 0x00,
    /**
     * SEPA - Direct debit follows the SEPA scheme
     */
    Sepa: 0x01,
};
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
export const DirectDebitType = {
    /**
     * One-time direct debit
     */
    OneOff: 0x00,
    /**
     * Recurring direct debit
     */
    Recurrent: 0x01,
};
/**
 * [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217)
 *
 * @see Table 8
 * @see Table 15 field #5
 */
export const CurrencyCode = {
    AED: "AED",
    AFN: "AFN",
    ALL: "ALL",
    AMD: "AMD",
    ANG: "ANG",
    AOA: "AOA",
    ARS: "ARS",
    AUD: "AUD",
    AWG: "AWG",
    AZN: "AZN",
    BAM: "BAM",
    BBD: "BBD",
    BDT: "BDT",
    BGN: "BGN",
    BHD: "BHD",
    BIF: "BIF",
    BMD: "BMD",
    BND: "BND",
    BOB: "BOB",
    BRL: "BRL",
    BSD: "BSD",
    BTN: "BTN",
    BWP: "BWP",
    BYN: "BYN",
    BZD: "BZD",
    CAD: "CAD",
    CDF: "CDF",
    CHF: "CHF",
    CLP: "CLP",
    CNY: "CNY",
    COP: "COP",
    CRC: "CRC",
    CUC: "CUC",
    CUP: "CUP",
    CVE: "CVE",
    CZK: "CZK",
    DJF: "DJF",
    DKK: "DKK",
    DOP: "DOP",
    DZD: "DZD",
    EGP: "EGP",
    ERN: "ERN",
    ETB: "ETB",
    EUR: "EUR",
    FJD: "FJD",
    FKP: "FKP",
    GBP: "GBP",
    GEL: "GEL",
    GHS: "GHS",
    GIP: "GIP",
    GMD: "GMD",
    GNF: "GNF",
    GTQ: "GTQ",
    GYD: "GYD",
    HKD: "HKD",
    HNL: "HNL",
    HRK: "HRK",
    HTG: "HTG",
    HUF: "HUF",
    IDR: "IDR",
    ILS: "ILS",
    INR: "INR",
    IQD: "IQD",
    IRR: "IRR",
    ISK: "ISK",
    JMD: "JMD",
    JOD: "JOD",
    JPY: "JPY",
    KES: "KES",
    KGS: "KGS",
    KHR: "KHR",
    KMF: "KMF",
    KPW: "KPW",
    KRW: "KRW",
    KWD: "KWD",
    KYD: "KYD",
    KZT: "KZT",
    LAK: "LAK",
    LBP: "LBP",
    LKR: "LKR",
    LRD: "LRD",
    LSL: "LSL",
    LYD: "LYD",
    MAD: "MAD",
    MDL: "MDL",
    MGA: "MGA",
    MKD: "MKD",
    MMK: "MMK",
    MNT: "MNT",
    MOP: "MOP",
    MRU: "MRU",
    MUR: "MUR",
    MVR: "MVR",
    MWK: "MWK",
    MXN: "MXN",
    MYR: "MYR",
    MZN: "MZN",
    NAD: "NAD",
    NGN: "NGN",
    NIO: "NIO",
    NOK: "NOK",
    NPR: "NPR",
    NZD: "NZD",
    OMR: "OMR",
    PAB: "PAB",
    PEN: "PEN",
    PGK: "PGK",
    PHP: "PHP",
    PKR: "PKR",
    PLN: "PLN",
    PYG: "PYG",
    QAR: "QAR",
    RON: "RON",
    RSD: "RSD",
    RUB: "RUB",
    RWF: "RWF",
    SAR: "SAR",
    SBD: "SBD",
    SCR: "SCR",
    SDG: "SDG",
    SEK: "SEK",
    SGD: "SGD",
    SHP: "SHP",
    SLL: "SLL",
    SOS: "SOS",
    SRD: "SRD",
    SSP: "SSP",
    STN: "STN",
    SVC: "SVC",
    SYP: "SYP",
    SZL: "SZL",
    THB: "THB",
    TJS: "TJS",
    TMT: "TMT",
    TND: "TND",
    TOP: "TOP",
    TRY: "TRY",
    TTD: "TTD",
    TWD: "TWD",
    TZS: "TZS",
    UAH: "UAH",
    UGX: "UGX",
    USD: "USD",
    UYU: "UYU",
    UZS: "UZS",
    VES: "VES",
    VND: "VND",
    VUV: "VUV",
    WST: "WST",
    XAF: "XAF",
    XCD: "XCD",
    XOF: "XOF",
    XPF: "XPF",
    YER: "YER",
    ZAR: "ZAR",
    ZMW: "ZMW",
    ZWL: "ZWL",
};
