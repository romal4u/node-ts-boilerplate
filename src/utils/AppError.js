"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ConflictError = exports.DataNotFoundError = exports.NotFoundError = exports.AuthenticateError = exports.AuthorizationError = exports.ValidationError = exports.APIError = void 0;
var STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    UN_AUTHENTICATE: 401,
    CONFLICT: 409
};
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(name, statusCode, description) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, description) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = name;
        _this['statusCode'] = statusCode;
        _this['description'] = description;
        Error.captureStackTrace(_this);
        return _this;
    }
    return AppError;
}(Error));
// 500 Internal Error
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(description) {
        if (description === void 0) { description = 'api Error'; }
        return _super.call(this, 'api internal server error', STATUS_CODES.INTERNAL_ERROR, description) || this;
    }
    return APIError;
}(AppError));
exports.APIError = APIError;
// 400 Validation Error
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(description) {
        if (description === void 0) { description = 'bad request'; }
        return _super.call(this, 'bad request', STATUS_CODES.BAD_REQUEST, description) || this;
    }
    return ValidationError;
}(AppError));
exports.ValidationError = ValidationError;
// 403 Authorization Error
var AuthorizationError = /** @class */ (function (_super) {
    __extends(AuthorizationError, _super);
    function AuthorizationError(description) {
        if (description === void 0) { description = 'access denied'; }
        return _super.call(this, 'access denied', STATUS_CODES.UN_AUTHORISED, description) || this;
    }
    return AuthorizationError;
}(AppError));
exports.AuthorizationError = AuthorizationError;
var AuthenticateError = /** @class */ (function (_super) {
    __extends(AuthenticateError, _super);
    function AuthenticateError(description) {
        if (description === void 0) { description = 'access denied'; }
        return _super.call(this, 'access denied', STATUS_CODES.UN_AUTHENTICATE, description) || this;
    }
    return AuthenticateError;
}(AppError));
exports.AuthenticateError = AuthenticateError;
//404 Not Found Error
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(description) {
        if (description === void 0) { description = 'not found'; }
        return _super.call(this, 'not found', STATUS_CODES.NOT_FOUND, description) || this;
    }
    return NotFoundError;
}(AppError));
exports.NotFoundError = NotFoundError;
//200 status code
var DataNotFoundError = /** @class */ (function (_super) {
    __extends(DataNotFoundError, _super);
    function DataNotFoundError(description) {
        if (description === void 0) { description = 'data not found'; }
        return _super.call(this, 'data not found', STATUS_CODES.OK, description) || this;
    }
    return DataNotFoundError;
}(AppError));
exports.DataNotFoundError = DataNotFoundError;
//409 status code
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(description) {
        if (description === void 0) { description = 'The request cannot be completed due to a conflict with the current state of the resource. Please resolve the conflict and try again.'; }
        return _super.call(this, 'CONFLICT', STATUS_CODES.CONFLICT, description) || this;
    }
    return ConflictError;
}(AppError));
exports.ConflictError = ConflictError;
