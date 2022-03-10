import { MongoConfig } from "./persistence/mongo/MongoConfig";

interface GlobalConfig {
  mongo: MongoConfig;
}
export const globalConfig: GlobalConfig = {
  mongo: {
    url: "mongodb://localhost:27017/finder",
    connectionTimeoutMs: 1000,
  },
};