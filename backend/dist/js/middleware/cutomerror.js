"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
function CustomError(message, status = 500, additionalInfo = {}) {
    return { message, status, additionalInfo };
}
exports.CustomError = CustomError;
