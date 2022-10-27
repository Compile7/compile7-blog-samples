import { BodyParams, Constant, Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { User } from "../models/UserModel";
import { UsersService } from "../services/UsersService";

@Protocol<IStrategyOptions>({
  name: "local",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LocalProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: any) {
    const { email, password } = credentials;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new Unauthorized("Wrong credentials");
    }

    if (! await this.usersService.verifyPassword(password, user.email)) {
      throw new Unauthorized("Wrong credentials");
    }

    const token = this.createJwtToken(user);

    user.token = token;
    return user
  }

  createJwtToken(user: User) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user._id,
        exp: now + maxAge * 1000,
        iat: now
      },
      secretOrKey
    );
  }
}
