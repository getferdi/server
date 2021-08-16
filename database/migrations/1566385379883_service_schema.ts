import Schema from "@ioc:Adonis/Lucid/Schema";

export default class ServiceSchema extends Schema {
  public up() {
    this.schema.createTable("services", (table) => {
      table.increments();
      table.string("userId", 80).notNullable();
      table.string("serviceId", 80).notNullable();
      table.string("name", 80).notNullable();
      table.string("recipeId", 254).notNullable();
      table.json("settings");
      table.timestamps();
    });
  }

  public down() {
    this.schema.dropTable("services");
  }
}
