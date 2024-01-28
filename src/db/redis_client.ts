import { createClient } from "redis";

const redisClient = createClient();

const redisConnect = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
};
redisConnect();

export { redisClient };
