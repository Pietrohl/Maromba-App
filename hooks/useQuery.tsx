import { useSystem } from "@/hooks/useSystem";
import { CompilableQuery } from "@powersync/react-native";
import { CompiledQuery } from "kysely";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";

type AdditionalOptions = {
  queryOnce?: boolean;
  executeImmediate?: boolean;
  throttleMs?: number;
};

const defautOptions: AdditionalOptions = {
  queryOnce: false,
  executeImmediate: true,
};

export function useQuery<T = any>(
  query: CompilableQuery<T>,
  { queryOnce, executeImmediate }: AdditionalOptions = defautOptions
): {
  isLoading: boolean;
  isFetching: boolean;
  refresh: () => Promise<void>;
  data: T[];
  error?: Error;
} {
  const { database } = useSystem();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setisFetching] = useState(true);
  const [compiledQuery, setQuery] = useState(query.compile());
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error>();

  const fetchData = useCallback(async () => {
    setisFetching(true);
    const results = (
      await database.executeQuery<T>(compiledQuery as CompiledQuery)
    ).rows;
    setisFetching(false);
    setIsLoading(false);
    // console.log(`Querying `, queryOnce, "RESULTS ", results);
    return results;
  }, [compiledQuery]);

  async function refresh() {
    return fetchData().then(setData).catch(setError);
  }

  useLayoutEffect(() => {
    executeImmediate && refresh();
    !queryOnce &&
      database.watch<T>(query, {
        // onResult: (results) => {
        //   console.log(`Results from Watch : `, results);
        //   setData(results);
        // },
        // onError: (error) => {
        //   console.log("Error:", error);
        //   setError(error);
        // },
        onResult: setData,
        onError: setError
      });
    setQuery(query.compile());
  }, [query]);

  return { isLoading, isFetching, refresh, data, error };
}
