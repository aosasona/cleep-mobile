export default class CustomException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomException";
  }
}

export function handleException(err: unknown) {
  if (err instanceof CustomException) {
    return err?.message;
  }
  return "An error occurred!";
}
