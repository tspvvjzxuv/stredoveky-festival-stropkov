/**
 * This error will be thrown in case of a validation issue. It provides message
 * with error description and specific path to issue in dataModel object.
 */
export declare class ValidationError extends Error {
    path: string;
    /**
     * @param message - explains, what is wrong on the specific field
     * @param path - navigates to the specific field in DataModel, where error occurred
     */
    constructor(message: string, path: string);
}
