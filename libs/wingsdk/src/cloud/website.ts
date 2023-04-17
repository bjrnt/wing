import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";

/**
 * Global identifier for `Website`.
 */
export const WEBSITE_FQN = fqnForType("cloud.Website");

/**
 * Represents a cloud object store.
 *
 * @inflight `@winglang/sdk.cloud.IWebsiteClient`
 */
export abstract class Website extends Resource {
  /**
   * Create a new website.
   * @internal
   */
  public static _newWebsite(
    scope: Construct,
    id: string,
    props: WebsiteProps
  ): Website {
    return App.of(scope).newAbstract(WEBSITE_FQN, scope, id, props);
  }

  //   private url?: string;
  public readonly stateful = false;
  private readonly _path: string;
  /**@internal */
  protected _url!: string;
  protected domain?: string;
  /** @internal */

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    this.display.title = "Website";
    this.display.description = "A static website";

    this._path = props.path;
    this.domain = props.domain;
  }

  /**
   * Local path to the website's static files, relative to the Wing source file.
   * @example "./dist"
   */
  get path(): string {
    return this._path;
  }

  /**
   * The website's url.
   */
  get url(): string {
    return this._url;
  }
}
/**
 * website props
 */
export interface WebsiteProps {
  /**
   * Local path to the website's static files, relative to the Wing source file.
   * @example "./dist"
   */
  readonly path: string;

  /**
   * The website's custom domain name.
   * @example "example.com"
   * @default - a domain is generated by the cloud provider
   */
  readonly domain?: string;
}

/**
/**
 * Inflight methods and members of `cloud.Website`.
 */
export interface IWebsiteClient {}
