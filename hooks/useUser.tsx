import { useEffect, useState } from "react";
import { useSystem } from "./useSystem";
import { Database } from "@/utils/appSchema";
import { powerSyncDb } from "@/utils/database";

type User = Exclude<Partial<Database["users"]>, "name" | "id"> & {
  name?: string | null;
  email?: string;
  email_confirmed_at?: string;
};

export const useUser = () => {
  const { session, database } = useSystem();
  const [user, setUser] = useState<User | null>(null);

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

        // console.log(`Profile`, profile);
        // console.log(`id`, id);

        database.watch(query, {
          onResult(results) {
            setUser(results[0]);
          },
        });

        powerSyncDb.watch("SELECT * FROM users", [], {
          onResult(results) {
            // console.log("PowerSync Wathc Results", results.rows?._array);
          },
        });

        const { email, email_confirmed_at } = session.user;

        setUser({ ...profile, id, email, email_confirmed_at });
      }
    };

    fetchUserData();
  }, [session]);

  return user;
};
