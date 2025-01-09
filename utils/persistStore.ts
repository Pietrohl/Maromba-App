import { createStore } from "tinybase/store";
import { createPowerSyncPersister } from "tinybase/persisters/persister-powersync";
import { createRelationships } from "tinybase/relationships";
import { setupPowerSync } from "./database";

const powerSync = setupPowerSync();
export const store = createStore();

export const relationships = createRelationships(store);
relationships.setRelationshipDefinition(
  "ListsListItems",
  "listItems",
  "lists",
  "list_id"
);

console.log("Creating Powersync Persister");
export const persister = createPowerSyncPersister(store, powerSync, {
  mode: "tabular",
  tables: {
    load: {
      users: {
        tableId: "users",
        rowIdColumnName: "id",
      },
      lists: {
        tableId: "lists",
        rowIdColumnName: "id",
      },
      items: {
        tableId: "listItems",
        rowIdColumnName: "id",
      },
    },
    save: {
      users: {
        tableName: "users",
        rowIdColumnName: "id",
      },
      lists: {
        tableName: "lists",
        rowIdColumnName: "id",
      },
      items: {
        tableName: "listItems",
        rowIdColumnName: "id",
      },
    },
  },
});


persister.startAutoLoad();
persister.startAutoSave();
