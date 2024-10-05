/* eslint-disable no-console */

export class Logger {
  static info(message?: unknown, ...optionalParams: unknown[]) {
    console.info(message, optionalParams);
  }

  static log(message?: unknown, ...optionalParams: unknown[]) {
    console.log(message, optionalParams);
  }

  static warn(message?: unknown, ...optionalParams: unknown[]) {
    console.warn(message, optionalParams);
  }

  static error(message?: unknown, ...optionalParams: unknown[]) {
    console.error(message, optionalParams);
  }

  static dir(data: unknown) {
    console.dir(data, { depth: 10 });
  }
}
