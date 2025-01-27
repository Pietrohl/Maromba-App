import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { Database } from "@/utils/appSchema";
import UiReactWithSchemas from "@/utils/UiReactWithSchemas";

type User = Exclude<Database["users"], "id"> & {
  name: string;
  email: string;
  email_confirmed_at: string;
};

export const useUser = () => {
  const { session } = useAuth();
  const profile = UiReactWithSchemas.useRow("users", session?.user.id || "");

  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session || !profile) return;
      const { email, email_confirmed_at, id } = session.user;
      setUser({ ...profile, id, email, email_confirmed_at });
    };

    fetchUserData();
  }, [session, profile]);

  return user;
};
