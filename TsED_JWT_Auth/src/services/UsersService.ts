import { Injectable, Inject } from "@tsed/di";
import { User } from "../models/UserModel";
import { MongooseModel } from "@tsed/mongoose";

@Injectable()
export class UsersService {
  @Inject(User) private model: MongooseModel<User>

  async create(body: any): Promise<User> {
    return this.model.create(body)
  }

  async findOne(query: any): Promise<any | undefined> {
    return await this.model.findOne(query);
  }

  async verifyPassword(password: string, email: string) {
    const user = await this.findOne({ email })
    return user?.password === password
  }

  attachToken(user: User, token: string) {
    user.token = token;
  }
}
