export declare const EncodeErrorMessage: {
    /**
     * @description - find invalid value in extensions
     */
    readonly BySquareType: "Invalid BySquareType value in header, valid range <0,15>";
    /**
     * @description - find invalid value in extensions
     * @see {@link ./types#Version} for valid ranges
     */
    readonly Version: "Invalid Version value in header";
    /**
     * @description - find invalid value in extensions
     */
    readonly DocumentType: "Invalid DocumentType value in header, valid range <0,15>";
    /**
     * @description - find invalid value in extensions
     */
    readonly Reserved: "Invalid Reserved value in header, valid range <0,15>";
    /**
     * @description - find actual size of header in extensions
     * @see MAX_COMPRESSED_SIZE
     */
    readonly HeaderDataSize: "Allowed header data size exceeded";
};
export declare class EncodeError extends Error {
    extensions?: {
        [name: string]: any;
    };
    constructor(message: string, extensions?: {
        [name: string]: any;
    });
}
export declare const DecodeErrorMessage: {
    readonly MissingIBAN: "IBAN is missing";
    /**
     * @description - find original LZMA error in extensions
     */
    readonly LZMADecompressionFailed: "LZMA decompression failed";
    /**
     * @description - find found version in extensions
     * @see {@link ./types#Version} for valid ranges
     */
    readonly UnsupportedVersion: "Unsupported version";
};
export declare class DecodeError extends Error {
    extensions?: {
        [name: string]: any;
    };
    constructor(message: string, extensions?: {
        [name: string]: any;
    });
}
export interface Header {
    bysquareType: number;
    version: number;
    documentType: number;
    reserved: number;
}
export declare const MAX_COMPRESSED_SIZE = 131072;
/**
 * Returns a 2 byte buffer that represents the header of the bysquare
 * specification
 *
 * ```
 * Byte 0                  Byte 1
 * +----------+----------+----------+----------+
 * |   4 bit  |   4 bit  |   4 bit  |   4 bit  |
 * +----------+----------+----------+----------+
 * | BySqType | Version  | DocType  | Reserved |
 * | (0-15)   | (0-15)   | (0-15)   | (0-15)   |
 * +----------+----------+----------+----------+
 * ```
 *
 * @see 3.5.
 */
export declare function buildBysquareHeader(
/** dprint-ignore */
header?: [
    bySquareType: number,
    version: number,
    documentType: number,
    reserved: number
]): number[];
/**
 * Extracts the 4 nibbles from a 2-byte bysquare header using bit-shifting and
 * masking.
 *
 * ```
 * Byte 0                  Byte 1
 * +----------+----------+----------+----------+
 * |   4 bit  |   4 bit  |   4 bit  |   4 bit  |
 * +----------+----------+----------+----------+
 * | BySqType | Version  | DocType  | Reserved |
 * | (0-15)   | (0-15)   | (0-15)   | (0-15)   |
 * +----------+----------+----------+----------+
 * ```
 *
 * @param header 2-bytes size
 * @see 3.5.
 */
export declare function decodeHeader(header: Uint8Array): Header;
/**
 * Creates a 2-byte array that represents the length of compressed data in
 * combination with CRC32 in bytes.
 *
 * ```
 * +---------------+---------------+
 * |    Byte 0     |    Byte 1     |
 * +---------------+---------------+
 * |      LSB      |      MSB      |
 * +---------------+---------------+
 * | Little-endian 16-bit unsigned |
 * | max 2^17 = 131072             |
 * +-------------------------------+
 * ```
 *
 * @see 3.6.
 */
export declare function buildPayloadLength(length: number): Uint8Array;
/**
 * Prepends a 4-byte CRC32 checksum to the tab-separated payload.
 *
 * ```
 * +------------------+---------------------------+
 * |      4 bytes     |        Variable           |
 * +------------------+---------------------------+
 * | CRC32 Checksum   | Tab-separated payload     |
 * | (little-endian)  | (UTF-8 encoded)           |
 * +------------------+---------------------------+
 * ```
 *
 * @see 3.10.
 */
export declare function addChecksum(tabbedPayload: string): Uint8Array;
