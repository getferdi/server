import Schema from "@ioc:Adonis/Lucid/Schema";

export default class RecipeSchema extends Schema {
  public up() {
    this.schema.createTable("recipes", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("recipeId", 254).notNullable().unique();
      table.json("data");
      table.timestamps();
    });
  }

  public down() {
    this.schema.dropTable("recipes");
  }
}
