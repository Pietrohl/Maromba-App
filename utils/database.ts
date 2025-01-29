import "@azure/core-asynciterator-polyfill";
import { PowerSyncDatabase } from "@powersync/react-native";
import { AbstractPowerSyncDatabase } from "@powersync/web";
import { Connector } from "./powerSyncConnector";
import { AppSchema, Database } from "./appSchema";
import { wrapPowerSyncWithKysely } from "@powersync/kysely-driver";
import { ParseJSONResultsPlugin } from "kysely";

/**
 * Instantiate the local PowerSync database
 * This uses react-native-quick-sqlite to open a SQLite database file
 */
export const powerSyncDb = new PowerSyncDatabase({
  // The schema you defined in the previous step
  schema: AppSchema,
  database: {
    // Filename for the SQLite database — it's important to only instantiate one instance per file.
    dbFilename: "powersync.db",
    // Optional. Directory where the database file is located.'
    // dbLocation: 'path/to/directory'
  },
});

export const db = wrapPowerSyncWithKysely<Database>(
  powerSyncDb as unknown as AbstractPowerSyncDatabase,
  {
    plugins: [new ParseJSONResultsPlugin()],
  }
);

powerSyncDb.init();