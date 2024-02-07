import * as nodeMailer from "nodemailer";

export const sendMail = async (options: nodeMailer.SendMailOptions) => {
  //create a transport
  const emailTransport = nodeMailer.createTransport({
    //@ts-ignore
    host: process.env.EMAIL_HOST!,
    port: process.env.EMAIL_PORT!,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // options
  const mailOptions: nodeMailer.SendMailOptions = {
    ...options,
  };

  // send mail
  await emailTransport.sendMail(mailOptions);
};
