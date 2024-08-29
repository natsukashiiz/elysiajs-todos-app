export default class AuthenticationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
