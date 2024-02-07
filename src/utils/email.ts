import * as nodeMailer from "nodemailer";

const host = process.env.EMAIL_HOST!;
const port = process.env.EMAIL_PORT!;
const user = process.env.EMAIL_USER!;
const pass = process.env.EMAIL_PASS!;

export const sendMail = async (options: nodeMailer.SendMailOptions) => {
  //create a transport
  const emailTransport = nodeMailer.createTransport({
    //@ts-ignore

    host,
    port,
    auth: {
      user,
      pass,
      type: "LOGIN",
    },
  });
  // options
  const mailOptions: nodeMailer.SendMailOptions = {
    from: "Jonas Ecom <jonas@ecom.com>",
    ...options,
  };

  // send mail
  await emailTransport.sendMail(mailOptions);
};
