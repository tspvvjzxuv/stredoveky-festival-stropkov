/**
 * Encodes bytes to base32hex by converting 8-bit bytes to 5-bit groups.
 *
 * ```
 * Bit packing process (40 bits = 5 bytes → 8 base32hex chars):
 *
 * Input bytes:     [   B0   ][   B1   ][   B2   ][   B3   ][   B4   ]
 * Bit positions:   76543210  76543210  76543210  76543210  76543210
 *
 * Output groups:   [C0 ][C1 ][C2 ][C3 ][C4 ][C5 ][C6 ][C7 ]
 * Bit positions:   43210 43210 43210 43210 43210 43210 43210 43210
 *
 * C0 = B0[7:3]   (top 5 bits of B0)
 * C1 = B0[2:0] + B1[7:6]   (bottom 3 bits of B0 + top 2 bits of B1)
 * C2 = B1[5:1]   (middle 5 bits of B1)
 * C3 = B1[0] + B2[7:4]   (bottom 1 bit of B1 + top 4 bits of B2)
 * ... and so on
 * ```
 */
export declare function encode(input: ArrayLike<number>, addPadding?: boolean): string;
/**
 * Decodes base32hex string back to bytes by converting 5-bit groups to 8-bit bytes.
 *
 * ```
 * Bit unpacking process (8 base32hex chars → 5 bytes):
 *
 * Input groups:    [C0 ][C1 ][C2 ][C3 ][C4 ][C5 ][C6 ][C7 ]
 * Bit positions:   43210 43210 43210 43210 43210 43210 43210 43210
 *
 * Output bytes:    [   B0   ][   B1   ][   B2   ][   B3   ][   B4   ]
 * Bit positions:   76543210  76543210  76543210  76543210  76543210
 *
 * B0 = C0[4:0] + C1[4:3]   (all of C0 + top 2 bits of C1)
 * B1 = C1[2:0] + C2[4:0]   (bottom 3 bits of C1 + all of C2)
 * B2 = C3[4:0] + C4[4:2]   (all of C3 + top 3 bits of C4)
 * ... and so on
 * ```
 */
export declare function decode(input: string, isLoose?: boolean): Uint8Array;
