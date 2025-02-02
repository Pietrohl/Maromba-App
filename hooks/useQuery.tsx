import { useSystem } from "@/hooks/useSystem";
import { CompilableQuery } from "@powersync/react-native";
import { CompiledQuery } from "kysely";
import { useReducer, useLayoutEffect, useCallback } from "react";

type AdditionalOptions = {
  watch?: boolean;
  executeImmediate?: boolean;
  throttleMs?: number;
};

const defaultOptions: AdditionalOptions = {
  watch: true,
  executeImmediate: true,
  throttleMs: 100,
};

type State<T> = {
  isLoading: boolean;
  isFetching: boolean;
  data: T[];
  error?: Error;
  compiledQuery: CompiledQuery;
};

type Action<T> =
  | { type: "SET_FETCHING" }
  | { type: "SET_DATA"; payload: T[] }
  | { type: "SET_ERROR"; payload?: Error }
  | { type: "SET_COMPILED_QUERY"; payload: CompiledQuery };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "SET_FETCHING":
      return { ...state, isFetching: true };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isLoading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isLoading: false,
      };
    case "SET_COMPILED_QUERY":
      return { ...state, compiledQuery: action.payload };
    default:
      return state;
  }
}

export function useQuery<T = any>(
  query: CompilableQuery<T>,
  params: AdditionalOptions = defaultOptions
): {
  isLoading: boolean;
  isFetching: boolean;
  refresh: () => Promise<void>;
  data: T[];
  error?: Error;
} {
  const { database } = useSystem();

  const {
    executeImmediate = defaultOptions.executeImmediate,
    watch = defaultOptions.watch,
    throttleMs = defaultOptions.throttleMs,
  } = params;

  const [state, dispatch] = useReducer<
    (state: State<T>, actions: Action<T>) => State<T>
  >(reducer, {
    isLoading: true,
    isFetching: false,
    data: [],
    error: undefined,
    compiledQuery: query.compile() as CompiledQuery<T>,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: "SET_FETCHING" });
    try {
      const results = (
        await database.executeQuery<T>(state.compiledQuery as CompiledQuery)
      ).rows;
      dispatch({ type: "SET_DATA", payload: results });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error as Error });
    }
  }, [state.compiledQuery, database]);

  const watchQuery = useCallback(
    (abortController: AbortController) => {
      database.watch(
        query,
        {
          onResult: (results) =>
            dispatch({ type: "SET_DATA", payload: results }),
          onError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
        },
        { signal: abortController.signal, throttleMs }
      );
    },
    [database, query]
  );

  const refresh = () => {
    return fetchData();
  };

  useLayoutEffect(() => {
    const abortController = new AbortController();

    if (executeImmediate && !watch) {
      fetchData();
    }
    if (watch) watchQuery(abortController);
    dispatch({
      type: "SET_COMPILED_QUERY",
      payload: query.compile() as CompiledQuery<T>,
    });

    return () => abortController.abort();
  }, [query, executeImmediate, watch, database]);

  return {
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    refresh,
    data: state.data,
    error: state.error,
  };
}
