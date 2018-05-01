type LogArg = string | object | Error | number;

export interface ILogger {
  info(...args: LogArg[]): void;
  verbose(...args: LogArg[]): void;
  debug(...args: LogArg[]): void;
  warn(...args: LogArg[]): void;
  error(...args: LogArg[]): void;
}

export class ConsoleLogger implements ILogger {
  info(...args: (string | object | Error)[]): void {
    // tslint:disable-next-line
    console.log(...args);
  }
  verbose(...args: (string | object | Error)[]): void {
    // tslint:disable-next-line
    console.log(...args);
  }
  debug(...args: (string | object | Error)[]): void {
    // tslint:disable-next-line
    console.log(...args);
  }
  warn(...args: (string | object | Error)[]): void {
    // tslint:disable-next-line
    console.warn(...args);
  }
  error(...args: (string | object | Error)[]): void {
    // tslint:disable-next-line
    console.error(...args);
  }
}
