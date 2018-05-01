import { IAppContainer } from "../container";
import { ApiClient } from "./ApiClient";
import { TAppConfig } from "../config";

interface IScreenshot {
  imageSha: string;
  name: string;
}

export class Api {
  private readonly config: TAppConfig;
  private readonly apiClient: ApiClient;
  constructor(container: IAppContainer) {
    this.config = container.config;
    this.apiClient = container.apiClient;
  }

  public async uploadImage(buffer: Buffer): Promise<void> {
    await this.apiClient.restRequest({
      uri: "images/upload",
      method: "POST",
      formData: {
        image: buffer,
      },
    });
  }

  public async createCommit(screenshots: IScreenshot[]): Promise<void> {
    await this.apiClient.graphqlClient.request(
      `
      mutation createCommit($secret: String!, $SHA: String!, $screenshots: [ScreenshotInput]!) {
        createCommit(commit: { sha: $SHA, projectSecret:$secret , screenshots: $screenshots})
      }
    `,
      {
        secret: this.config.projectSecret,
        SHA: this.config.runner.commitSha,
        screenshots,
      },
    );
  }

  public async createDiff(): Promise<void> {
    await this.apiClient.graphqlClient.request(
      `
      mutation createCommit($secret: String!, $SHA: String!, $baseBranchName: String!) {
        diffCommits(diffCommitsInput: { projectSecret: $secret, targetSha: $SHA, baseBranchName: $baseBranchName  }) {
          baseCommitSha
          targetCommitSha
        }
      }
    `,
      {
        secret: this.config.projectSecret,
        SHA: this.config.runner.commitSha,
        baseBranchName: this.config.runner.baseBranchName,
      },
    );
  }
}
