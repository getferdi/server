# Upgrading

If you are using sqlite, you either need to modify the path name or move your database:

Old scheme: `<app root>/database/${DB_DATABASE}.sqlite`

New Scheme: `${DATA_DIR}/${DB_DATABASE}.sqlite`

The data dir can either be an absolute path or relative to the app root, it defaults to the relative path `data`.
