/**
 * Mapping semantic version to encoded version number, header 4-bit.
 * @see 3.3.
 * @see Table 1
 */
export declare const Version: {
    /**
     * Created this document from original by square specifications.
     *
     * **Released Date:** 2013-02-22
     */
    readonly "1.0.0": 0;
    /**
     * Added fields for beneficiary name and address
     *
     * **Released Date:** 2015-06-24
     */
    readonly "1.1.0": 1;
    /**
     * Beneficiary name is now a required field
     *
     * **Released Date:** 2025-04-01
     */
    readonly "1.2.0": 2;
};
export type Version = typeof Version[keyof typeof Version];
