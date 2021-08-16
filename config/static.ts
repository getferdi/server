/**
 * Config source: https://git.io/Jfefl
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AssetsConfig } from "@ioc:Adonis/Core/Static";

const staticConfig: AssetsConfig = {
  /*
  |--------------------------------------------------------------------------
  | Enabled
  |--------------------------------------------------------------------------
  |
  | A boolean to enable or disable serving static files. The static files
  | are served from the `public` directory inside the application root.
  | However, you can override the default path inside `.adonisrc.json`
  | file.
  |
  |
  */
  enabled: true,
  /*
  |--------------------------------------------------------------------------
  | Dot Files
  |--------------------------------------------------------------------------
  |
  | Define how to treat dot files when trying to server static resources.
  | By default it is set to ignore, which will pretend that dotfiles
  | does not exists.
  |
  | Can be one of the following
  | ignore, deny, allow
  |
  */
  dotFiles: "ignore",

  /*
  |--------------------------------------------------------------------------
  | ETag
  |--------------------------------------------------------------------------
  |
  | Enable or disable etag generation
  |
  */
  etag: true,

  /*
  |--------------------------------------------------------------------------
  | Set Last Modified
  |--------------------------------------------------------------------------
  |
  | Whether or not to set the `Last-Modified` header in the response. Uses
  | the file system's last modified value.
  |
  */
  lastModified: true,
};

export default staticConfig;
