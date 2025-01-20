import { useAuth } from "@/hooks/useAuth";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createRelationships, createStore } from "tinybase/with-schemas";
import { createPowerSyncPersister } from "tinybase/persisters/persister-powersync/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";

const tablesSchema = {
  users: {},
  equipament: {
    name: { type: "string" },
  },
} as const;
const valuesSchema = {} as const;

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof tablesSchema, typeof valuesSchema]
>;

export const TinyBaseProvider = ({ children }: PropsWithChildren<any>) => {
  const store = createStore().setSchema(tablesSchema, valuesSchema);

  const { powerSync, initDB } = useAuth();

  useEffect(() => {
    initDB();
  }, []);

  const relationships = createRelationships(store);





  const persister = createPowerSyncPersister(store, powerSync, {
    mode: "tabular",
    tables: {
      load: {
        users: {
          tableId: "users",
          rowIdColumnName: "id",
        },
        equipament: {
          tableId: "equipament",
          rowIdColumnName: "id",
        },
      },
      save: {
        users: {
          tableName: "users",
          rowIdColumnName: "id",
        },
        equipament: {
          tableName: "equipament",
          rowIdColumnName: "id",
        },
      },
    },
  });

  persister.startAutoLoad();
  persister.startAutoSave();

  return (
    <UiReactWithSchemas.Provider store={store}>
      {children}
    </UiReactWithSchemas.Provider>
  );
};
