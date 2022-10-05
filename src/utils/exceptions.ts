export class NotFoundException extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'Not Found Exception'
  }
}

export class UnauthenticatedException extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'Unauthenticated Exception'
  }
}
