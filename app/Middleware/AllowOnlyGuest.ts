import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AuthenticationException } from "@adonisjs/auth/build/standalone";

/**
 * Auth middleware is meant to restrict authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class GuestOnlyMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = "/";

  /**
   * Handle request
   */
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: string[],
  ) {
    /**
     * Uses the user defined guards or the default guard mentioned in
     * the config file
     */
    const guards = customGuards.length ? customGuards : [auth.name];
    await this.checkGuest(auth, guards);
    await next();
  }

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async checkGuest(auth: HttpContextContract["auth"], guards: any[]) {
    for (const guard of guards) {
      if (await auth.use(guard).check()) {
        /**
         * Unable to authenticate using any guard
         */
        throw new AuthenticationException(
          "Already logged in",
          "E_ALREADY_LOGGED_IN",
          guard,
          this.redirectTo,
        );
      }
    }

    return true;
  }
}
