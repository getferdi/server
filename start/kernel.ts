import Server from "@ioc:Adonis/Core/Server";

/*
|--------------------------------------------------------------------------
| Server Middleware
|--------------------------------------------------------------------------
|
| Server level middleware are executed even when route for a given URL is
| not registered. Features like `static assets` and `cors` needs better
| control over request lifecycle.
|
*/
Server.middleware.register([
  () => import("@ioc:Adonis/Core/BodyParser"),
  () => import("App/Middleware/ConvertEmptyStringsToNull"),
  () => import("App/Middleware/HandleDoubleSlash"),
]);

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: 'App/Auth/Middleware' }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  auth: () => import("App/Middleware/Auth"),
  guest: () => import("App/Middleware/AllowOnlyGuest"),
  shield: () => import("@ioc:Adonis/Addons/Shield"),
});
