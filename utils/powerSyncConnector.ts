import {
  AbstractPowerSyncDatabase,
  CrudEntry,
  PowerSyncBackendConnector,
  UpdateType,
} from "@powersync/react-native";

/// Postgres Response codes that we cannot recover from by retrying.
const FATAL_RESPONSE_CODES = [
  // Class 22 — Data Exception
  // Examples include data type mismatch.
  new RegExp("^22...$"),
  // Class 23 — Integrity Constraint Violation.
  // Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
  new RegExp("^23...$"),
  // INSUFFICIENT PRIVILEGE - typically a row-level security violation
  new RegExp("^42501$"),
];

export class Connector{
  constructor() {}

 
}
