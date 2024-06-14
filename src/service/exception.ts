export class UnauthorizedException extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}

export class NotFoundException extends Error {
  constructor(message: string = 'Not Found') {
    super(message);
  }
}