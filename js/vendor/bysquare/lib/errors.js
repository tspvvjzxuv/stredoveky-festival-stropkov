/**
 * This error will be thrown in case of a validation issue. It provides message
 * with error description and specific path to issue in dataModel object.
 */
export class ValidationError extends Error {
    path;
    /**
     * @param message - explains, what is wrong on the specific field
     * @param path - navigates to the specific field in DataModel, where error occurred
     */
    constructor(message, path) {
        super(message);
        this.name = this.constructor.name;
        this.path = path;
    }
}
