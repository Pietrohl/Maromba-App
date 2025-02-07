import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Database } from "@/utils/appSchema";
import { powerSyncDb } from "@/utils/database";
import { useSystem } from "@/hooks/useSystem";
import { SplashScreen } from "expo-router";

type User = Exclude<Partial<Database["users"]>, "name" | "id"> & {
  name?: string | null;
  email?: string;
  email_confirmed_at?: string;
};

export type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, database } = useSystem();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) return;

      const id = session?.user.id;
      if (id) {
        const query = database
          .selectFrom(`users`)
          .where(`id`, "=", id)
          .selectAll();
        const profile = await query.executeTakeFirst();

        database.watch(query, {
          onResult(results) {
            setUser(results[0]);
          },
        });
        const { email, email_confirmed_at } = session.user;

        setUser({ ...profile, id, email, email_confirmed_at });
      }
    };

    fetchUserData();
  }, [session]);

  if (user) SplashScreen.hideAsync();

  return user ? (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  ) : (
    <></>
  );
};

// type User = Exclude<Partial<Database["users"]>, "name" | "id"> & {
//   name?: string | null;
//   email?: string;
//   email_confirmed_at?: string;
// };

// export type AuthContextType = {
//   user: User | null;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { session, database } = useSystem();

//   const id = session?.user.id;
//   const query = database
//     .selectFrom(`users`)
//     .where(`id`, "=", id || "")
//     .selectAll();

//   const { data } = useQuery(query);

//   const user = useMemo(() => {
//     if (session && data.length) {
//       const profile = data[0];
//       const { email, email_confirmed_at } = session.user;
//       return { ...profile, id, email, email_confirmed_at };
//     }
//     return null;
//   }, [session]);

//   console.log(`Render AuthContext`);
//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };
