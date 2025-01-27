import { useAuth } from "@/hooks/useAuth";
import React, { PropsWithChildren, useEffect } from "react";
import {
  Aggregate,
  createQueries,
  createRelationships,
  createStore,
} from "tinybase/with-schemas";
import { createPowerSyncPersister } from "tinybase/persisters/persister-powersync/with-schemas";
import {
  tablesSchema,
  tinyBaseConfig,
  valuesSchema,
} from "@/utils/tinyBaseSchema";
import UiReactWithSchemas from "@/utils/UiReactWithSchemas";

export const TinyBaseProvider = ({ children }: PropsWithChildren<any>) => {
  const store = createStore().setSchema(tablesSchema, valuesSchema);

  const { database: powerSync, initDB, session } = useAuth();

  useEffect(() => {
    initDB();
  }, []);

  const relationships = createRelationships(store);
  const queries = createQueries(store);
  const persister = createPowerSyncPersister(store, powerSync, tinyBaseConfig);

  relationships.setRelationshipDefinition(
    "userTrainingPlans",
    "training_plan",
    "users",
    "user_id"
  );

  relationships.setRelationshipDefinition(
    "trainingPlanRoutines",
    "training_plan_routines",
    "training_plan",
    "training_plan_id"
  );

  relationships.setRelationshipDefinition(
    "trainingPlanRoutinesDetails",
    "training_plan_routines",
    "user_training_routines",
    "routine_id"
  );

  relationships.setRelationshipDefinition(
    "routineExercises",
    "routine_exercises",
    "user_training_routines",
    "routine_id"
  );

  persister.startAutoLoad();
  persister.startAutoSave();

  return (
    <UiReactWithSchemas.Provider
      store={store}
      relationships={relationships}
      queries={queries}
    >
      {children}
    </UiReactWithSchemas.Provider>
  );
};
