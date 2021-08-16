import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HandleDoubleSlash {
  public async handle({ request, response }: HttpContextContract, next) {
    // Redirect requests that contain duplicate slashes to the right path
    if (request.url().includes("//")) {
      return response.redirect(request.url().replace(/\/{2,}/g, "/"));
    }

    return await next();
  }
}
