import { db, powerSyncDb } from "@/utils/database";
import { GoogleOIDClient } from "@/utils/googleOIDClient";
import { Connector } from "@/utils/powerSyncConnector";
import {
  PowerSyncDatabase,
  SyncStreamConnectionMethod,
} from "@powersync/react-native";
import { Session } from "@supabase/supabase-js";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PowerSyncSQLiteDatabase } from "@powersync/drizzle-driver";
export type SystemContextType = {
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signUp: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  initDB: () => Promise<void>;
  signedIn: boolean;
  loading: boolean;
  error: string;
  session: Session | null;
  database: typeof db;
};

// We initialize the context with null to ensure that it is not used outside of the provider
export const SystemContext = createContext<SystemContextType | null>(null);

/**
 * AuthProvider manages the authentication state and provides the necessary methods to sign in, sign up and sign out.
 */
export const SystemProvider = ({ children }: PropsWithChildren<any>) => {
  const [connector] = useState(new Connector());
  const [googleOIDClient] = useState(new GoogleOIDClient());
  const [powerSync] = useState(powerSyncDb);
  const [database] = useState(db);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    connector.client.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  const initDB = useCallback(
    async function init() {
      await powerSync.init();
      await powerSync.connect(connector, {
        connectionMethod: SyncStreamConnectionMethod.WEB_SOCKET,
      });
    },
    [connector]
  );

  // Sign in with provided email and password
  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError("");
      setSession(null);

      try {
        // get the session and user from supabase
        const {
          data: { session, user },
          error,
        } = await connector.client.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        // if we have a session and user, sign them in
        if (session && user) {
          setSignedIn(true);
          setSession(session);
          // otherwise sign them out and set an error
        } else {
          setSignedIn(false);
          setSession(null);
        }
      } catch (error: any) {
        setError(error?.message ?? "Unknown error");
        setSignedIn(false);
        setSession(null);
      } finally {
        setLoading(false);
      }
    },
    [setSignedIn, setLoading, setError, setSession, connector.client]
  );

  // Create a new account with provided email and password
  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError("");
      setSession(null);
      try {
        const { data, error } = await connector.client.auth.signUp({
          email,
          password,
        });
        if (error) {
          setSignedIn(false);
          setError(error.message);
        } else if (data.session) {
          await connector.client.auth.setSession(data.session);
          setSignedIn(true);
          setSession(data.session);
        }
      } catch (error: any) {
        setSession(null);
        setSignedIn(false);
        setError(error?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [setSignedIn, setLoading, setError, setSession, connector.client]
  );

  // Sign out the current user
  const signOut = useCallback(async () => {
    setLoading(true);
    await connector.client.auth.signOut();
    setError("");
    setSignedIn(false);
    setLoading(false);
    setSession(null);
  }, [setSignedIn, setLoading, setError, setSession, connector.client]);

  // Sign in with google
  const signInWithGoogle = useCallback(async () => {
    try {
      const userInfo = await googleOIDClient.signIn();
      if (userInfo?.data?.idToken) {
        const { data, error } = await connector.client.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (error) {
          setError(error.message);
        } else {
          setSession(data.session);
          setSignedIn(true);
        }
      }
    } catch (error: any) {
      setError(error?.message ?? "Unknown error");
    }
  }, [setSignedIn, setSession, setError, connector.client]);

  // Always memoize context values as they can cause unnecessary re-renders if they aren't stable!
  const value = useMemo(
    () => ({
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      signedIn,
      loading,
      error,
      session,
      database,
      initDB,
    }),
    [
      signIn,
      signInWithGoogle,
      signOut,
      signUp,
      signedIn,
      loading,
      error,
      session,
      database,
      initDB,
    ]
  );
  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
};
