import { getRequiredEnv, getOptionalEnv } from "./configUtils";
import { getRunnerEnvironment } from "./ci/runner-environment";

const DEFAULT_API_PATH = "https://api.visualcop.io";

export const getConfig = (env: NodeJS.ProcessEnv, processArgs: string[]) => {
  const fileGlob = processArgs[2];

  if (!fileGlob) {
    throw new Error("Missing file glob!");
  }

  return {
    fileGlob,
    projectSecret: getRequiredEnv(env, "VISUAL_COP_PROJECT_SECRET"),
    apiUrl: getOptionalEnv(env, "VISUAL_COP_URL") || DEFAULT_API_PATH,
    runner: getRunnerEnvironment(env),
  };
};

export type TAppConfig = ReturnType<typeof getConfig>;
