import "@azure/core-asynciterator-polyfill";
import {
  PowerSyncDatabase,
} from "@powersync/react-native";
import { Connector } from "./powerSyncConnector";
import { AppSchema } from "./appSchema";

/**
 * Instantiate the local PowerSync database
 * This uses react-native-quick-sqlite to open a SQLite database file
 */
export const db = new PowerSyncDatabase({
  // The schema you defined in the previous step
  schema: AppSchema,
  database: {
    // Filename for the SQLite database — it's important to only instantiate one instance per file.
    dbFilename: "powersync.db",
    // Optional. Directory where the database file is located.'
    // dbLocation: 'path/to/directory'
  },
});

export const setupPowerSync = () => {
  // Uses the backend connector that will be created in the next section
  const connector = new Connector(); 
  db.connect(connector);
  return db;
};

db.init()