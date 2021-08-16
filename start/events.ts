import Env from "@ioc:Adonis/Core/Env";
import Mail from "@ioc:Adonis/Addons/Mail";
import Event from "@ioc:Adonis/Core/Event";

Event.on("forgot::password", async ({ user, token }) => {
  const body = `
Hello ${user.username},
we just recieved a request to reset your password of your Ferdi account.
Use the link below to reset your password. If you havn't requested this, please ignore this message.

${Env.get("APP_URL")}/user/reset?token=${encodeURIComponent(token)}

This message was sent automatically. Please do not reply.
`;
  console.log("Sending message", body);
  try {
    await Mail.send((message) => {
      message.text(body);
      message.subject("[Ferdi] Reset your password");
      message.from(Env.get("MAIL_SENDER"));
      message.to(user.email);
    });
  } catch (e) {
    console.log(`Couldn't send mail: ${e}`);
  }
});
