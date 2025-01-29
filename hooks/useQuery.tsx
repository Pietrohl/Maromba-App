import { useSystem } from "@/hooks/useSystem";
import { CompilableQuery } from "@powersync/react-native";
import { CompiledQuery } from "kysely";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";

export function useQuery<T = any>(
  query: CompilableQuery<T>): {
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
    const results = (await database.executeQuery<T>(compiledQuery as CompiledQuery)).rows;
    setisFetching(false);
    setIsLoading(false);
    return results;
  }, [compiledQuery])

  async function refresh() {
    return fetchData().then(setData).catch(setError);
  }

  useLayoutEffect(() => {
    database.watch<T>(query, {
      onResult: setData,
      onError: setError
    });
    setQuery(query.compile());
  }, [query]);

  return { isLoading, isFetching, refresh, data, error };
}
