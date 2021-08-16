import { BaseModel, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Token extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
