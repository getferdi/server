import Schema from "@ioc:Adonis/Lucid/Schema";

export default class TokensSchema extends Schema {
  public up() {
    this.schema.createTable("tokens", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("token", 255).notNullable().unique().index();
      table.string("type", 80).notNullable();
      table.boolean("is_revoked").defaultTo(false);
      table.timestamps();
    });
  }

  public down() {
    this.schema.dropTable("tokens");
  }
}
