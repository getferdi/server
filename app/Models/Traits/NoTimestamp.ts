export default class NoTimestamp {
  public register(Model) {
    Object.defineProperties(Model, {
      createdAtColumn: {
        get: () => null,
      },
      updatedAtColumn: {
        get: () => null,
      },
    });
  }
}
