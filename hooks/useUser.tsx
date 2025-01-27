import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { Database, drizzleSchema ,DatabaseTest} from "@/utils/appSchema";
import { eq } from "drizzle-orm";

type User = Exclude<DatabaseTest["users"], "name" |"id"> & {
  name: string | null | undefined;
  email?: string;
  email_confirmed_at?: string;
};

export const useUser = () => {
  const { session, database } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  

  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user  ) return;
      
      const id = session?.user.id
      if(id){
      const profile =  await database.query.users.findMany()

      console.log(`Profile`, profile);
      console.log(`id`, id);



      const {email,email_confirmed_at} = session.user

      setUser({ ...profile, id, email, email_confirmed_at });
}    };

    fetchUserData();
  }, [session]);

  return user;
};
