import { useContext } from "react";
import { SystemContext } from "../providers/System";

export const useAuth = () => {
  const context = useContext(SystemContext);

  // It's a good idea to throw an error if the context is null, as it means the hook is being used outside of the provider
  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
