import * as Sentry from "@sentry/node";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
export default class ExceptionHandler extends HttpExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   */
  public async handle(error, { response }) {
    if (error.name === "ValidationException") {
      return response.status(400).send("Invalid arguments");
    }
    if (error.name === "InvalidSessionException") {
      return response.status(401).redirect("/user/login");
    }

    return response.status(error.status).send(error.message);
  }

  /**
   * Report exception for logging or debugging.
   */
  public async report(error) {
    Sentry.captureException(error);
    return true;
  }
}
