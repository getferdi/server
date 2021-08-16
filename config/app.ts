/**
 * Config source: https://git.io/JfefZ
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import proxyAddr from "proxy-addr";
import Env from "@ioc:Adonis/Core/Env";
import { ServerConfig } from "@ioc:Adonis/Core/Server";
import { LoggerConfig } from "@ioc:Adonis/Core/Logger";

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| This value is the name of your application and can used when you
| need to place the application's name in a email, view or
| other location.
|
*/

export const name = Env.get("APP_NAME", "Ferdi");

/*
|--------------------------------------------------------------------------
| App Key
|--------------------------------------------------------------------------
|
| App key is a randomly generated 16 or 32 characters long string required
| to encrypt cookies, sessions and other sensitive data.
|
*/
export const appKey = Env.get("APP_KEY");

export const http: ServerConfig = {
  /*
  |--------------------------------------------------------------------------
  | Allow Method Spoofing
  |--------------------------------------------------------------------------
  |
  | Method spoofing allows to make requests by spoofing the http verb.
  | Which means you can make a GET request but instruct the server to
  | treat as a POST or PUT request. If you want this feature, set the
  | below value to true.
  |
  */
  allowMethodSpoofing: true,

  /*
  |--------------------------------------------------------------------------
  | Trust Proxy
  |--------------------------------------------------------------------------
  |
  | Trust proxy defines whether X-Forwarded-* headers should be trusted or not.
  | When your application is behind a proxy server like nginx, these values
  | are set automatically and should be trusted. Apart from setting it
  | to true or false Adonis supports handful or ways to allow proxy
  | values. Read documentation for that.
  |
  */
  trustProxy: proxyAddr.compile("loopback"),

  /*
  |--------------------------------------------------------------------------
  | Subdomains
  |--------------------------------------------------------------------------
  |
  | Offset to be used for returning subdomains for a given request.For
  | majority of applications it will be 2, until you have nested
  | sudomains.
  | cheatsheet.adonisjs.com      - offset - 2
  | virk.cheatsheet.adonisjs.com - offset - 3
  |
  */
  subdomainOffset: 2,

  /*
  |--------------------------------------------------------------------------
  | Request Ids
  |--------------------------------------------------------------------------
  |
  | Setting this value to `true` will generate a unique request id for each
  | HTTP request and set it as `x-request-id` header.
  |
  */
  generateRequestId: false,

  /*
  |--------------------------------------------------------------------------
  | JSONP Callback
  |--------------------------------------------------------------------------
  |
  | Default jsonp callback to be used when callback query string is missing
  | in request url.
  |
  */
  jsonpCallbackName: "callback",

  /*
  |--------------------------------------------------------------------------
  | Etag
  |--------------------------------------------------------------------------
  |
  | Set etag on all HTTP response. In order to disable for selected routes,
  | you can call the `response.send` with an options object as follows.
  |
  | response.send('Hello', { ignoreEtag: true })
  |
  */
  etag: false,

  /*
  |--------------------------------------------------------------------------
  | Generic Cookie Options
  |--------------------------------------------------------------------------
  |
  | The following cookie options are generic settings used by AdonisJs to create
  | cookies. However, some parts of the application like `sessions` can have
  | separate settings for cookies inside `config/session.js`.
  |
  */
  cookie: {
    httpOnly: true,
    sameSite: false,
    path: "/",
    maxAge: 7200,
  },
};

export const views = {
  /*
  |--------------------------------------------------------------------------
  | Cache Views
  |--------------------------------------------------------------------------
  |
  | Define whether or not to cache the compiled view. Set it to true in
  | production to optimize view loading time.
  |
  */
  cache: Env.get("CACHE_VIEWS", true),
};

export const locales = {
  /*
  |--------------------------------------------------------------------------
  | Loader
  |--------------------------------------------------------------------------
  |
  | The loader to be used for fetching and updating locales. Below is the
  | list of available options.
  |
  | file, database
  |
  */
  loader: "file",

  /*
  |--------------------------------------------------------------------------
  | Default Locale
  |--------------------------------------------------------------------------
  |
  | Default locale to be used by Antl provider. You can always switch drivers
  | in runtime or use the official Antl middleware to detect the driver
  | based on HTTP headers/query string.
  |
  */
  locale: "en",
};

export const logger: LoggerConfig = {
  /*
  |--------------------------------------------------------------------------
  | Application name
  |--------------------------------------------------------------------------
  |
  | The name of the application you want to add to the log. It is recommended
  | to always have app name in every log line.
  |
  | The `APP_NAME` environment variable is automatically set by AdonisJS by
  | reading the `name` property from the `package.json` file.
  |
  */
  name: Env.get("APP_NAME"),

  /*
  |--------------------------------------------------------------------------
  | Toggle logger
  |--------------------------------------------------------------------------
  |
  | Enable or disable logger application wide
  |
  */
  enabled: true,

  /*
  |--------------------------------------------------------------------------
  | Logging level
  |--------------------------------------------------------------------------
  |
  | The level from which you want the logger to flush logs. It is recommended
  | to make use of the environment variable, so that you can define log levels
  | at deployment level and not code level.
  |
  */
  level: Env.get("LOG_LEVEL", "info"),

  /*
  |--------------------------------------------------------------------------
  | Pretty print
  |--------------------------------------------------------------------------
  |
  | It is highly advised NOT to use `prettyPrint` in production, since it
  | can have huge impact on performance.
  |
  */
  prettyPrint: Env.get("NODE_ENV") === "development",
};
