import Hash from "@ioc:Adonis/Core/Hash";
import { column, beforeSave, BaseModel, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Token from "App/Models/Token";
import Service from "App/Models/Service";
import Workspace from "App/Models/Workspace";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email?: string;

  @column({ serializeAs: null })
  public password: string;

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   */
  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>;

  @hasMany(() => Service)
  public services: HasMany<typeof Service>;

  @hasMany(() => Workspace)
  public workspaces: HasMany<typeof Workspace>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      // eslint-disable-next-line no-param-reassign
      user.password = await Hash.make(user.password);
    }
  }
}
