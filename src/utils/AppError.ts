const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  UN_AUTHENTICATE: 401,
  CONFLICT: 409,
}

class AppError extends Error {
  constructor(name, statusCode, description) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this['statusCode'] = statusCode
    this['description'] = description
    Error.captureStackTrace(this)
  }
}

// 500 Internal Error
export class APIError extends AppError {
  constructor(description = 'api Error') {
    super('api internal server error', STATUS_CODES.INTERNAL_ERROR, description)
  }
}

// 400 Validation Error
export class ValidationError extends AppError {
  constructor(description = 'bad request') {
    super('bad request', STATUS_CODES.BAD_REQUEST, description)
  }
}

// 403 Authorization Error
export class AuthorizationError extends AppError {
  constructor(description = 'access denied') {
    super('access denied', STATUS_CODES.UN_AUTHORISED, description)
  }
}

export class AuthenticateError extends AppError {
  constructor(description = 'access denied') {
    super('access denied', STATUS_CODES.UN_AUTHENTICATE, description)
  }
}

//404 Not Found Error
export class NotFoundError extends AppError {
  constructor(description = 'not found') {
    super('not found', STATUS_CODES.NOT_FOUND, description)
  }
}

//200 status code
export class DataNotFoundError extends AppError {
  constructor(description = 'data not found') {
    super('data not found', STATUS_CODES.OK, description)
  }
}

//409 status code
export class ConflictError extends AppError {
  constructor(
    description = 'The request cannot be completed due to a conflict with the current state of the resource. Please resolve the conflict and try again.',
  ) {
    super('CONFLICT', STATUS_CODES.CONFLICT, description)
  }
}
