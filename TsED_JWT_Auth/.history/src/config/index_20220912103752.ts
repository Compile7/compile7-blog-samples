import {readFileSync} from "fs";
import {envs} from "./envs";
import loggerConfig from "./logger";
import mongooseConfig from "./mongoose";
import {User} from "../models/UserModel";
const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig,
  passport: {
		disableSession: true,
		userInfoModel: User
	 }
  // additional shared configuration
};
