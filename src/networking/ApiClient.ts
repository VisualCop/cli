import * as rp from "request-promise";
import { IAppContainer } from "../container";
import { TAppConfig } from "../config";
import { GraphQLClient } from "graphql-request";

export class ApiClient {
  private readonly config: TAppConfig;
  public readonly graphqlClient: GraphQLClient;
  constructor(container: IAppContainer) {
    this.config = container.config;
    this.graphqlClient = new GraphQLClient(this.config.apiUrl + "/graphql");
  }

  public restRequest<T = any>(request: rp.OptionsWithUri): Promise<T> {
    return rp({
      baseUrl: this.config.apiUrl,
      ...request,
      qs: {
        ...request.qs,
        secret: this.config.projectSecret,
      },
    }) as any;
  }
}
