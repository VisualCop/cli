import { getRequiredEnv, getOptionalEnv } from "../configUtils";

export const getRunnerEnvironment = (env: NodeJS.ProcessEnv) => {
  if (!env.TRAVIS) {
    throw new Error("Only travis CI is supported");
  }

  return {
    commitSha: getRequiredEnv(env, "TRAVIS_COMMIT"),
    baseBranchName: getRequiredEnv(env, "TRAVIS_PULL_REQUEST_BRANCH"),
    eventType: getRequiredEnv(env, "TRAVIS_EVENT_TYPE"),
    CI: getOptionalEnv(env, "CI"),
  };
};

export type IRunnerConfig = ReturnType<typeof getRunnerEnvironment>;
