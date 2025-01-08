import {  usePowerSync } from "@powersync/react-native";
import { createStore } from "tinybase/store";
import { createPowerSyncPersister } from "tinybase/persisters/persister-powersync";

const powerSync = usePowerSync();
const store = createStore();

const persister = createPowerSyncPersister(store, powerSync, {
  mode: "tabular",
  tables: {
    load: {
      lists: {
        tableId: "user_lists",
        rowIdColumnName: "id",
      },
      
    },
    save: {
        lists: {
            tableName: "user_lists",
            rowIdColumnName: "id",
          },
    },
  },
});

