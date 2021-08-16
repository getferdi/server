import Schema from "@ioc:Adonis/Lucid/Schema";

export default class UserSchema extends Schema {
  public up() {
    this.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.json("settings");
      table.timestamps();
    });
  }

  public down() {
    this.schema.dropTable("users");
  }
}
