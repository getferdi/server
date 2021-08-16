import { rules, schema } from "@ioc:Adonis/Core/Validator";

import Service from "App/Models/Service";
import Workspace from "App/Models/Workspace";

// TODO: const Persona = use('Persona');
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { ValidationException } from "@adonisjs/validator/build/src/ValidationException";

class DashboardController {
  public async login({ request, response, auth, session }: HttpContextContract) {
    const loginSchema = schema.create({
      mail: schema.string({}, [rules.email()]),
      password: schema.string(),
    });
    let body: typeof loginSchema.props;
    try {
      body = await request.validate({
        schema: loginSchema,
      });
    } catch (e: unknown) {
      if (e instanceof ValidationException) {
        session.flash("error", "Invalid mail format");
        return response.redirect("back");
      }
      throw e;
    }

    const { mail, password } = body;

    const hashedPassword = crypto.createHash("sha256").update(password).digest("base64");

    try {
      await auth.use("web").attempt(mail, hashedPassword);
    } catch (error) {
      session.flash("error", "Invalid mail or password");
      return response.redirect("back");
    }
    return response.redirect("/user/account");
  }

  public async forgotPassword({ request, view }: HttpContextContract) {
    const forgotSchema = schema.create({
      mail: schema.string({}, [rules.email()]),
    });
    const validation = await request.validate({
      schema: forgotSchema,
    });
    if (validation) {
      return view.render("others.message", {
        heading: "Cannot reset your password",
        text: "If your provided E-Mail address is linked to an account, we have just sent an E-Mail to that address.",
      });
    }
    try {
      // TODO: await Persona.forgotPassword(request.input('mail'));
      return view.render("others.message", {
        heading: "Reset password",
        text: "Function not implemented",
      });
    } catch (err) {
      console.error(err);
    }

    return view.render("others.message", {
      heading: "Reset password",
      text: "If your provided E-Mail address is linked to an account, we have just sent an E-Mail to that address.",
    });
  }

  public async resetPassword({ request, response, view, session }: HttpContextContract) {
    const resetSchema = schema.create({
      password: schema.string(),
      password_confirmation: schema.string(),
      token: schema.string(),
    });
    let body: typeof resetSchema.props;
    try {
      body = await request.validate({
        schema: resetSchema,
      });
    } catch (e) {
      if (e instanceof ValidationException) {
        session.flash("error", "Passwords do not match");
        return response.redirect("back");
      }
      throw e;
    }
    // eslint-disable-next-line
    const { password, password_confirmation, token } = body;

    // eslint-disable-next-line no-unused-vars
    const payload = {
      password: crypto.createHash("sha256").update(password).digest("base64"),
      password_confirmation: crypto
        .createHash("sha256")
        .update(password_confirmation)
        .digest("base64"),
    };

    try {
      // TODO: await Persona.updatePasswordByToken(token), payload);
      return view.render("others.message", {
        heading: "Reset password",
        text: "Function not implemented",
      });
    } catch (e) {
      return view.render("others.message", {
        heading: "Cannot reset your password",
        text: "Please make sure you are using a valid and recent link to reset your password and that your passwords entered match.",
      });
    }

    // eslint-disable-next-line no-unreachable
    return view.render("others.message", {
      heading: "Reset password",
      text: "Successfully reset your password. You can now login to your account using your new password.",
    });
  }

  public async account({ auth, view, response }) {
    try {
      await auth.check();
    } catch (error) {
      return response.redirect("/user/login");
    }

    return view.render("dashboard.account", {
      username: auth.user.username,
      email: auth.user.email,
      lastname: auth.user.lastname,
    });
  }

  public async edit({ auth, request, session, view, response }: HttpContextContract) {
    const editSession = schema.create({
      username: schema.string(),
      email: schema.string(),
      lastname: schema.string(),
    });
    let body: typeof editSession.props;
    try {
      body = await request.validate({ schema: editSession });
    } catch (e) {
      if (e instanceof ValidationException) {
        session.flash("errors", e.messages());
        return response.redirect("back");
      }
      throw e;
    }

    const { username, email } = body;

    // Check new username
    if (username !== auth.user!!.username) {
      const editUsernameSchema = schema.create({
        username: schema.string({}, [rules.unique({ table: "users", column: "username" })]),
        email: schema.string({}, [rules.email()]),
      });
      try {
        await request.validate({ schema: editUsernameSchema });
      } catch (e) {
        if (e instanceof ValidationException) {
          session.flash("errors", e.messages());
          return response.redirect("back");
        }
        throw e;
      }
    }

    // Check new email
    if (email !== auth.user!!.email) {
      const editEmailSchema = schema.create({
        username: schema.string(),
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: "users", column: "email" }),
        ]),
      });
      try {
        await request.validate({ schema: editEmailSchema });
      } catch (e) {
        if (e instanceof ValidationException) {
          session.flash("errors", e.messages());
          return response.redirect("back");
        }
        throw e;
      }
    }

    // Update user account
    const { user } = auth;
    user!!.username = username;
    user!!.email = email;
    if (request.input("password")) {
      user!!.password = crypto
        .createHash("sha256")
        .update(request.input("password"))
        .digest("base64");
    }
    await user!!.save();

    return view.render("dashboard.account", {
      username: user!!.username,
      email: user!!.email,
      success: true,
    });
  }

  public async data({ auth, view }: HttpContextContract) {
    const general = auth.user;
    const services = (await auth.user!!.services.builder.select("*")).map((s) => s.toJSON());
    const workspaces = (await auth.user!!.workspaces.builder.select("*")).map((s) => s.toJSON());

    return view.render("dashboard.data", {
      username: general!!.username,
      mail: general!!.email,
      stringify: JSON.stringify,
      services,
      workspaces,
    });
  }

  public async export({ auth, response }: HttpContextContract) {
    const general = auth.user;
    const services = (await auth.user!!.services.builder.select("*")).map((s) => s.toJSON());
    const workspaces = (await auth.user!!.workspaces.builder.select("*")).map((s) => s.toJSON());

    const exportData = {
      username: general!!.username,
      mail: general!!.email,
      services,
      workspaces,
    };

    return response
      .header("Content-Type", "application/force-download")
      .header("Content-disposition", "attachment; filename=export.ferdi-data")
      .send(exportData);
  }

  public async import({ auth, request, session, response, view }: HttpContextContract) {
    const importSchema = schema.create({
      file: schema.file(),
    });
    let body: typeof importSchema.props;
    try {
      body = await request.validate({ schema: importSchema });
    } catch (e) {
      if (e instanceof ValidationException) {
        session.flash("errors", e.messages);
        return response.redirect("back");
      }
      throw e;
    }

    const { file } = body;

    let imported;
    try {
      imported = file.toJSON();
    } catch (e) {
      session.flash("error", "Invalid Ferdi account file");
      return response.redirect("back");
    }

    if (!imported || !imported.services || !imported.workspaces) {
      session.flash("error", "Invalid Ferdi account file (2)");
      return response.redirect("back");
    }

    const serviceIdTranslation = {};

    // Import services
    try {
      for (const service of imported.services) {
        // Get new, unused uuid
        let serviceId;
        do {
          serviceId = uuid();
        } while (
          parseInt(
            (
              await Service.query().where("serviceId", serviceId).count("*", "total").select()
            )[0].$getAttribute("total"),
            10,
          ) > 0
        );

        await Service.create({
          userId: auth.user!!.id,
          serviceId,
          name: service.name,
          recipeId: service.recipeId,
          settings: JSON.stringify(service.settings),
        });

        serviceIdTranslation[service.id] = serviceId;
      }
    } catch (e) {
      const errorMessage = `Could not import your services into our system.\nError: ${e}`;
      return view.render("others.message", {
        heading: "Error while importing",
        text: errorMessage,
      });
    }

    // Import workspaces
    try {
      for (const workspace of imported.workspaces) {
        let workspaceId;
        do {
          workspaceId = uuid();
        } while (
          parseInt(
            (
              await Workspace.query().where("workspaceId", workspaceId).count("*", "total")
            )[0].$getAttribute("total"),
            10,
          ) > 0
        );

        const services = workspace.services.map((service) => serviceIdTranslation[service]);

        await Workspace.create({
          userId: auth.user!!.id,
          workspaceId,
          name: workspace.name,
          order: workspace.order,
          services: JSON.stringify(services),
          data: JSON.stringify(workspace.data),
        });
      }
    } catch (e) {
      const errorMessage = `Could not import your workspaces into our system.\nError: ${e}`;
      return view.render("others.message", {
        heading: "Error while importing",
        text: errorMessage,
      });
    }

    return view.render("others.message", {
      heading: "Successfully imported",
      text: "Your account has been imported, you can now login as usual!",
    });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("web").logout();
    return response.redirect("/user/login");
  }

  public async delete({ auth, response }: HttpContextContract) {
    await auth.user!!.delete();
    await auth.use("web").logout();
    return response.redirect("/user/login");
  }
}

module.exports = DashboardController;
