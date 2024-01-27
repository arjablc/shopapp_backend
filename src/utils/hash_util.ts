import * as bcrypt from "bcrypt";

export const hash = async (normalText: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(normalText, salt);
  return hashedPassword;
};

export const compare = async (normal: string, hash: string) => {
  return await bcrypt.compare(normal, hash);
};
