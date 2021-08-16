import Schema from "@ioc:Adonis/Lucid/Schema";

export default class WorkspaceSchema extends Schema {
  public up() {
    this.schema.createTable("workspaces", (table) => {
      table.increments();
      table.string("workspaceId", 80).notNullable().unique();
      table.string("userId", 80).notNullable();
      table.string("name", 80).notNullable();
      table.integer("order");
      table.json("services");
      table.json("data");
      table.timestamps();
    });
  }

  public down() {
    this.schema.dropTable("workspaces");
  }
}
