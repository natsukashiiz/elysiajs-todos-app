export type Result<T> = {
  success: boolean;
  result?: T;
  message?: string;
  total?: number;
};

export default class ResultUtils {
  static success<T>(result: T): Result<T> {
    return {
      success: true,
      result,
    };
  }

  static successWithMessage<T>(result: T, message: string): Result<T> {
    return {
      success: true,
      result,
      message,
    };
  }

  static successEmptyWithMessage(message: string): Result<undefined> {
    return {
      success: true,
      message,
    };
  }

  static successList<T>(result: T[], total: number): Result<T[]> {
    return {
      success: true,
      result,
      total,
    };
  }

  static successListWithMessage<T>(
    result: T[],
    total: number,
    message: string
  ): Result<T[]> {
    return {
      success: true,
      result,
      total,
      message,
    };
  }

  static successListEmpty<T>(): Result<T[]> {
    return {
      success: true,
      result: [],
      total: 0,
    };
  }

  static successListEmptyWithMessage<T>(message: string): Result<T[]> {
    return {
      success: true,
      result: [],
      total: 0,
      message,
    };
  }

  static fail(message: string): Result<undefined> {
    return {
      success: false,
      message,
    };
  }
}
