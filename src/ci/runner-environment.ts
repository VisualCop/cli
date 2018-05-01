import { getRequiredEnv } from "../configUtils";

export interface IRunnerConfig {
  commitSha: string;
  baseBranchName: string;
}

export function getRunnerEnvironment(env: NodeJS.ProcessEnv): IRunnerConfig {
  if (!env.TRAVIS) {
    throw new Error("Only travis CI is supported");
  }

  return {
    commitSha: getRequiredEnv(env, "TRAVIS_COMMIT"),
    baseBranchName: getRequiredEnv(env, "TRAVIS_PULL_REQUEST_BRANCH"),
  };
}
