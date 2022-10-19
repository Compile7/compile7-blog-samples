import { Property, Required } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class User {
  @ObjectID('id')
  _id: string

  @Property()
  email: string

  @Property()
  password: string

  @Property()
  @Required(false)
  token?: string
  
  // verifyPassword(password: string) {
  //   return this.password === password;
  // }
}

export type UserType = {
  id: string,
  email: string,
  password: string,
  token : string
}
