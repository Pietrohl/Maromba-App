import { column, Schema, Table } from '@powersync/react-native';

const lists = new Table({
  created_at: column.text,
  name: column.text,
  owner_id: column.text
});



export const AppSchema = new Schema({
  lists
});

// For types
export type Database = (typeof AppSchema)['types'];
export type ListRecord = Database['lists'];