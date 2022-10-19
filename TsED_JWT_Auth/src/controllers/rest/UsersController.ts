import { Controller, Get, Post, Req, Inject, BodyParams } from "@tsed/common";
import { User } from "../../models/UserModel";
import { UsersService } from "src/services/UsersService";
import { Authenticate } from "@tsed/passport";
import { Security } from "@tsed/schema";

@Controller("/users")
export class AuthController {
  @Inject()
  usersService: UsersService;
  
  @Authenticate("jwt")
  @Security("jwt")
  @Get()
  getUser(@Req("user") user: User): User {
    return user;
  }
  @Post("/signup")
  create(@BodyParams("email") email: string, @BodyParams("password") password: string): Promise<User> {
    return this.usersService.create({
      email, password,
    })
  }

  @Post("/login")
  @Authenticate("local")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req("user") user: User, @BodyParams() email: string, @BodyParams() password: string): User {
    user.password = ''
    return user;
  }
}
