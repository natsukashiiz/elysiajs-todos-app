export default class InvariantError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
