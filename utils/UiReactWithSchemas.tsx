import { tablesSchema, valuesSchema } from "@/utils/tinyBaseSchema";
import * as UiReact from "tinybase/ui-react/with-schemas";

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof tablesSchema, typeof valuesSchema]
>;

export default UiReactWithSchemas;
