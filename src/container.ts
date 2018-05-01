import * as fs from "fs";

import { shaCalc } from "./shaCalc";
import { getConfig, TAppConfig } from "./config";
import { getFileFullInfo, IFileFullInfo } from "./fileFullInfo";
import { mapValues } from "lodash";
import { ApiClient } from "./networking/ApiClient";
import { Api } from "./networking/Api";
import { ILogger, ConsoleLogger } from "./Logger";

export interface IAppContainer {
  fs: typeof fs;
  config: TAppConfig;
  logger: ILogger;
  shaCalc: (binaryString: Buffer) => string;
  getFileFullInfo: (path: string) => IFileFullInfo;
  apiClient: ApiClient;
  api: Api;
}

export function getContainer(): IAppContainer {
  const config = getConfig(process.env, process.argv);

  return resolve({
    fs: () => fs,
    config: () => config,
    logger: new Clazz(ConsoleLogger),
    shaCalc,
    getFileFullInfo,
    apiClient: new Clazz(ApiClient),
    api: new Clazz(Api),
  });
}

/**
 * This assumes that object iteration happens in the same order as object insertion.
 * Could be problematic sometimes.
 */
export function resolve<T>(containerConfig: T): ResolveContainer<T> {
  let tmpContainer: any = {};

  mapValues(containerConfig, (value, k) => {
    if (value instanceof Clazz) {
      tmpContainer[k] = new value.clazz(tmpContainer);
    } else {
      tmpContainer[k] = value(tmpContainer);
    }
  });

  return tmpContainer;
}
type ResolveContainer<T> = { [K in keyof T]: T extends (deps: IAppContainer) => infer D ? D : never };

class Clazz<T extends new (...args: any[]) => any> {
  constructor(public readonly clazz: T) {}
}
