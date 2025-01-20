import { createStore } from "tinybase/store";
import { createPowerSyncPersister } from "tinybase/persisters/persister-powersync";
import { createRelationships } from "tinybase/relationships";
import { setupPowerSync } from "./database";

const powerSync = setupPowerSync();
export const store = createStore();

export const relationships = createRelationships(store);

console.log("Creating Powersync Persister");
export const persister = createPowerSyncPersister(store, powerSync, {
  mode: "tabular",
  tables: {
    load: {
      users: {
        tableId: "users",
        rowIdColumnName: "id",
      },
    },
    save: {
      users: {
        tableName: "users",
        rowIdColumnName: "id",
      },
    },
  },
});

persister.startAutoLoad();
persister.startAutoSave();
